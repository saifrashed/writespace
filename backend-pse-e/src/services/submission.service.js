// Test service, services handle everything with requests in the BE

// ************************* This can be coppied for every new service *************************
// Import the router with express to do requests
const express = require('express');
const router = express.Router();
require('mongodb');
const multer = require('multer');
const { auth } = require('../middleware/auth');

// Require axios for communicating with the canvas api
const axios = require('axios');
// Canvas api URL
const { API_URL, CANVAS_REDIRECT_URI } = process.env;

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// ************************* This can be coppied for every new service *************************

// ************************* Copy and change this with the model you added *************************
// Import models for this service (../ goes up one directory)
const submissionModel = require("../models/submission.model.js");
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js

/* This request returns all submissions for an assignment
Input: assignmentId
Output: all submissions for the given assignmentId
*/
router.get("/get-submissions/:assignmentId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await submissionModel.find({ 'assignmentId': req.params.assignmentId });

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* This request returns the submission by a user for an assignment
Input: userId, assignmentId
Output: the submission for the given userId and assignmentId
*/
router.post("/get-submission/", auth, async (req, res) => {
    try {
        const { userId, assignmentId } = req.body;
        // Find the object using an attribute of the object

        const result = await submissionModel.find({
            'assignmentId': assignmentId,
            'userId': userId ? userId : res.locals.userId
        });

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* This request saves a submission for an assignment
Input: userId, assignmentId, courseId, PDF file
Output: The created submission
*/
router.post('/save', upload.single('file'), auth, async (req, res) => {
    try {
        const userId = res.locals.userId;
        const assignmentId = req.body.assignmentId;
        const courseId = req.body.courseId;

        // Add the submission to the assignment on canvas
        await axios.post(
            `${API_URL}/courses/${courseId}/assignments/${assignmentId}/submissions`,
            {},
        {
            headers: {
                // Authorization using the access token
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                "submission[submission_type]": "online_url",
                "submission[url]": CANVAS_REDIRECT_URI
            }
        });

        const alreadySubmitted = await submissionModel.find({ 'courseId': courseId, 'assignmentId': assignmentId, 'userId': userId });

        // If file is not yet submitted
        if (alreadySubmitted.length == 0) {

            // Create a new instance of the submission model
            const newSubmission = await new submissionModel({
                userId: userId,
                userName: res.locals.user.name,
                assignmentId: assignmentId,
                courseId: courseId,
                date: new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }),
                grade: null,
                status: "ungraded",
                filetype: req.file.mimetype,
                filename: req.file.originalname,
                fileData: req.file.buffer,
                fileNotes: []
            }).save();

            // Send the savedTest object back in json form
            res.status(200).json(newSubmission);
        }


        // If file is already submitted
        if (alreadySubmitted.length !== 0) {

            const updatedSubmission = await submissionModel.findOneAndUpdate(
                {
                    'assignmentId': req.body.assignmentId,
                    'userName': res.locals.user.name,
                    'userId': res.locals.userId
                },
                {
                    $set: {
                        'filetype': req.file.mimetype,
                        'filename': req.file.originalname,
                        'fileData': req.file.buffer,
                        'date': new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }),
                    }
                },
                { new: true }
            );

            res.status(200).json(updatedSubmission);
        }

    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to the database' });
    }
});

/* This request is used to grade a submission
Input: userId, assignmentId, courseId, notes, grade
Output: Confirmation/error message
*/
router.put('/grade/', auth, async (req, res) => {
    try {
        const { userId, assignmentId, notes, grade, courseId } = req.body;

        // Add author field to the notes
        for (let i = 0; i < notes.length; i++) {
            notes[i].author = res.locals.user.name;
            notes[i].fresh = false;
        }

        const status = "graded"

        // Change the grade and add notes to the submission in the database
        const updatedSubmission = await submissionModel.findOneAndUpdate(
            {
                'courseId': courseId,
                'assignmentId': assignmentId,
                'userId': userId
            },
            {
                $set: {
                    fileNotes: notes,
                    grade: grade,
                    status: status
                }
            },
            { new: true }
        );

        if (!updatedSubmission) {
            return res.status(200).json({ error: 'Submission not found' });
        }

        // Add the grade to the submission on canvas
        await axios.put(
            `${API_URL}/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`,
            {},
        {
            headers: {
                // Authorization using the access token
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                // Grade is already the points in the FE
                "submission[posted_grade]": grade
            }
        });

        res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

/* This request adds replies to a note/comment on a submission
Input: assignmentId, noteId, message, studentId, date
Output: confirmation/error message
*/
router.put('/add-reply/', auth, async (req, res) => {
    try {
        const { assignmentId, noteId, message, studentId, date } = req.body;

        userId = studentId == "" ?  res.locals.userId : studentId;

        const submissionToUpdate = await submissionModel.findOne(
            {
                'assignmentId': assignmentId,
                'userId': userId
            }
        );

        const updateId = submissionToUpdate._id;

        const replyObject = {
            note_id: noteId,
            message: message,
            user_id: res.locals.userId,
            user_name: res.locals.user.name,
            date: date
        }

        if (!submissionToUpdate) {
            return res.status(200).json({ error: 'Submission not found' });
        }

        submissionToUpdate.fileNotes[noteId - 1].replies.push(replyObject);

        await submissionModel.findByIdAndUpdate( updateId, submissionToUpdate, { new: true });

        res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

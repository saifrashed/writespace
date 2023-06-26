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

// Get request (gets something from the db)
// router.get("/get-all", auth, async (req, res) => {
//     try {
//         // Find all tests
//         const submissions = await submissionModel.find();
//         // Return them in json form
//         res.status(200).json(submissions);
//     } catch (error) {
//         console.error('Error from MongoDB:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Find submissions by userId
// router.get("/user/:userId", auth, async (req, res) => {
//     try {
//         // Find the object using an attribute of the object
//         const result = await submissionModel.find({ 'userId': req.params.userId });

//         // Handle success case here
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Error from MongoDB:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Get all submissions for an assignment
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

// Get submission by a user for an assignment
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

// Post request (creates something in the db)
router.post('/save', upload.single('file'), auth, async (req, res) => {
    try {
        const userId = res.locals.userId;
        const assignmentId = req.body.assignmentId;
        const courseId = req.body.courseId;

        // Add the submission to the assignment on canvas
        const responseCanvas = await axios.post(
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

// Voegt notes to the submission
router.put('/grade/', auth, async (req, res) => {
    try {
        const { userId, assignmentId, notes, grade, courseId } = req.body;

        const status = "graded"

        const updatedSubmission = await submissionModel.findOneAndUpdate(
            {
                'courseId': courseId,
                'assignmentId': assignmentId,
                'userId': userId
            },
            {
                $push: {
                    fileNotes: { $each: notes }
                },
                $set: {
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
        const responseCanvas = await axios.put(
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


// // Updates the submission Grade
// router.put('/grade/', auth, async (req, res) => {
//     try {
//         const { userId, assignmentId, grade } = req.body;
//         const status = "graded";

//         const updatedSubmission = await submissionModel.findOneAndUpdate(
//             {
//                 'assignmentId': assignmentId,
//                 'userId': userId
//             },
//             {
//                 $set: {
//                     'grade': grade,
//                     'status': status,
//                 }
//             },
//             { new: true }
//         );

//         if (!updatedSubmission) {
//             return res.status(200).json({ message: 'Submission not found' });
//         }

//         res.status(200).json({ message: 'Submission updated successfully' });
//     } catch (error) {
//         console.error('Error updating data in MongoDB:', error);
//         res.status(500).json({ error: 'Failed to update data in the database' });
//     }
// });

// // Updates the submitted file, along with the new date of submission.
// router.put('/file/', upload.single('file'), auth, async (req, res) => {
//     try {
//         const userId = res.locals.userId;
//         const assignmentId = req.body.assignmentId
//         const newFileType = req.file.mimetype
//         const newFileName = req.file.originalname;
//         const newFileData = req.file.buffer;
//         const newDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });

//         const updatedSubmission = await submissionModel.findOneAndUpdate(
//             {
//                 'assignmentId': assignmentId,
//                 'userId': userId
//             },
//             {
//                 $set: {
//                     'filetype': newFileType,
//                     'filename': newFileName,
//                     'fileData': newFileData,
//                     'date': newDate,
//                 }
//             },
//             { new: true }
//         );

//         if (!updatedSubmission) {
//             return res.status(200).json({ message: 'Submission not found' });
//         }

//         res.status(200).json({ message: 'Submission updated successfully' });
//     } catch (error) {
//         console.error('Error updating data in MongoDB:', error);
//         res.status(500).json({ error: 'Failed to update data in the database' });
//     }
// });

// PUT request (updates something in the db)
// router.put('/update/', upload.single('file'), auth, async (req, res) => {
//     try {
//         const userId = res.locals.userId;
//         const assignmentId = req.body.assignmentId
//         const updatedSubmission = {
//             userId: res.locals.userId,
//             assignmentId: req.body.assignmentId,
//             date: new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }),
//             filetype: req.file.mimetype,
//             filename: req.file.originalname,
//             fileData: req.file.buffer
//         };

//         // Find the existing test by testId and update it
//         const result = await submissionModel.updateOne(
//             {
//                 'assignmentId': assignmentId,
//                 'userId': userId
//             },
//             { $set: updatedSubmission }
//         );

//         // Check if the test was found and updated successfully
//         if (result.nModified === 0) {
//             return res.status(200).json({ message: 'Object not found' });
//         }

//         res.status(200).json({ message: 'Submission updated successfully' });
//     } catch (error) {
//         console.error('Error updating data in MongoDB:', error);
//         res.status(500).json({ error: 'Failed to update data in the database' });
//     }
// });


// router.delete('/delete-all/:assignmentId', auth, async (req, res) => {
//     try {
//         const assignmentId = req.params.assignmentId;

//         // Find the document by submissionId and remove it
//         const result = await submissionModel.deleteMany({ 'assignmentId': assignmentId });

//         // Check if the document was found and deleted successfully
//         if (result.deletedCount === 0) {
//             return res.status(200).json({ message: 'Object not found' });
//         }

//         // Delete successful
//         res.status(200).json({ message: 'Submission deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting data from MongoDB:', error);
//         res.status(500).json({ error: 'Failed to delete data from the database' });
//     }
// });

// DELETE request (deletes something from the db)
// router.delete('/delete-one/', auth, async (req, res) => {
//     try {
//         const userId = res.locals.userId;
//         const assignmentId = req.body.assignmentId;

//         // Find the document by submissionId and remove it
//         const result = await submissionModel.deleteOne({
//             'userId': userId,
//             'assignmentId': assignmentId
//         });

//         // Check if the document was found and deleted successfully
//         if (result.deletedCount === 0) {
//             return res.status(200).json({ message: 'Object not found' });
//         }

//         // Delete successful
//         res.status(200).json({ message: 'Submission deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting data from MongoDB:', error);
//         res.status(500).json({ error: 'Failed to delete data from the database' });
//     }
// });

// Get an user its submission data for a specific assignment.
// router.post('/get-user-submission', auth, async (req, res) => {
//     try {
//         const { courseId, assignmentId, userId } = req.body;

//         // Canvas API url
//         const response = await axios.get(`${API_URL}/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`, {
//             headers: {
//                 Authorization: `Bearer ${req.headers["bearer"]}`
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error from Canvas API:', error);
//         res.status(500).json({ error: 'An error occurred in /courses/:courseId/:assignmentId/:userId.' });
//     }
// });

// Get all submission data for a specific assignment (teacher).
// router.post('/get-assignment-submissions', auth, async (req, res) => {
//     try {
//         const { courseId, assignmentId } = req.body;
//         // Canvas API url
//         const response = await axios.get(`${API_URL}/courses/${courseId}/assignments/${assignmentId}/submissions`, {
//             headers: {
//                 Authorization: `Bearer ${req.headers["bearer"]}`
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error from Canvas API:', error);
//         res.status(500).json({ error: 'An error occurred in /courses/:courseId/assignments/:assignmentId/submissions.' });
//     }
// });

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

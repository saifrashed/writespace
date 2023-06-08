// Test service, services handle everything with requests in the BE

// ************************* This can be coppied for every new service *************************
// Import the router with express to do requests
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const multer = require('multer');

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
router.get("/getAll", async (req, res) => {
    try {
        // Find all tests
        const submissions = await submissionModel.find();
        // Return them in json form
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find submissions by assignmentId
router.get("/findByAssignmentId/:assignmentId", async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await submissionModel.find({ 'assignmentId': req.params.assignmentId });
        // If the object is not fount give an error
        if (result.length === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find submissions by userId
router.get("/findByUserId/:userId", async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await submissionModel.find({ 'userId': req.params.userId });
        // If the object is not fount give an error
        if (result.length === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Find submissions by id.
router.get("/findSpecificSubmission/", async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const userId = req.query.userId;
        const assignmentId = req.query.assignmentId;

        const result = await submissionModel.find({
            'assignmentId': assignmentId,
            'userId': userId
        });
        // If the object is not fount give an error
        if (result.length === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Post request (creates something in the db)
router.post('/save', upload.single('file'), async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        // Variables for the model
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId;

        const alreadySubmitted = await submissionModel.find({ 'assignmentId': assignmentId, 'userId': userId });

        if (alreadySubmitted.length !== 0) {
            return res.status(409).json({ error: 'You cant submit twice, update the existing assignment using /update/file.' })
        }

        const submissionDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }); // Off by two hours
        const submissionGrade = null;
        const submissionStatus = "ungraded";
        const filetype = req.file.mimetype;
        const filename = req.file.originalname;
        const fileData = req.file.buffer;

        // Create a new instance of the submission model
        const newSubmission = new submissionModel({
            userId: userId,
            assignmentId: assignmentId,
            submissionDate: submissionDate,
            submissionGrade: submissionGrade,
            submissionStatus: submissionStatus,
            filetype: filetype,
            filename: filename,
            fileData: fileData
        });

        // Save the newTest instance to the database
        const savedSubmission = await newSubmission.save();

        // Send the savedTest object back in json form
        res.status(200).json(savedSubmission);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to the database' });
    }
});

// Updates the submission Grade
router.put('/update/grade/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId
        const newGrade = req.body.submissionGrade;
        const status = "graded";

        const updatedSubmission = await submissionModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
                'userId': userId
            },
            {
                $set: {
                    'submissionGrade': newGrade,
                    'submissionStatus': status
                }
            },
            { new: true }
        );

        if (updatedSubmission === null) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Updates the submitted file, along with the new date of submission.
router.put('/update/file/', upload.single('file'), async (req, res) => {
    try {
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId
        const newFileType = req.file.mimetype
        const newFileName = req.file.originalname;
        const newFileData = req.file.buffer;
        const newDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });

        const updatedSubmission = await submissionModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
                'userId': userId
            },
            {
                $set: {
                    'filetype': newFileType,
                    'filename': newFileName,
                    'fileData': newFileData,
                    'submissionDate': newDate
                }
            },
            { new: true }
        );

        if (updatedSubmission === null) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// PUT request (updates something in the db)
router.put('/update/', upload.single('file'), async (req, res) => {
    try {
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId
        const updatedSubmission = {
            userId: req.body.userId,
            assignmentId: req.body.assignmentId,
            submissionDate: new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }),
            filetype: req.file.mimetype,
            filename: req.file.originalname,
            fileData: req.file.buffer
        };

        // Find the existing test by testId and update it
        const result = await submissionModel.updateOne(
            {
                'assignmentId': assignmentId,
                'userId': userId
            },
            { $set: updatedSubmission }
        );

        // Check if the test was found and updated successfully
        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});


router.delete('/deleteAll/:assignmentId', async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;

        // Find the document by submissionId and remove it
        const result = await submissionModel.deleteMany({ 'assignmentId': assignmentId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// DELETE request (deletes something from the db)
router.delete('/deleteOne/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId;

        // Find the document by submissionId and remove it
        const result = await submissionModel.deleteOne({
            'userId': userId,
            'assignmentId': assignmentId
        });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

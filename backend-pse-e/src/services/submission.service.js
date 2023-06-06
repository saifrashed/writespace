// Test service, services handle everything with requests in the BE

// ************************* This can be coppied for every new service *************************
// Import the router with express to do requests
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
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
// This gets one test with an ObjectId from MongoDB
router.get("/findBySubmissionId/:submissionId", async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await submissionModel.find({ 'submissionId': req.params.submissionId });
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
router.post('/save', async (req, res) => {
    try {
        console.log(req.body);
        // Variables for the model
        const submissionId = req.body.submissionId;
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId;
        const submissionDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }); // Off by two hours
        const submissionGrade = null;
        const submissionStatus = "ungraded";
        const filetype = req.body.filetype;
        const filename = req.body.filename;
        const fileData = req.body.fileData;

        // Create a new instance of the submission model
        const newSubmission = new submissionModel({
            submissionId: submissionId,
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
router.put('/update/grade/:submissionId', async (req, res) => {
    try {
        const submissionId = req.body.submissionId;
        const newGrade = req.body.submissionGrade;
        const status = "graded";

        const updatedSubmission = await submissionModel.findOneAndUpdate(
            { 'submissionId': submissionId },
            { $set: {
                'submissionGrade': newGrade,
                'submissionStatus': status
            } },
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
router.put('/update/file/:submissionId', async (req, res) => {
  try {
      const submissionId = req.body.submissionId;
      const newFileType = req.body.filetype;
      const newFileName = req.body.filename;
      const newFileData = req.body.fileData;
      const newDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" });

      const updatedSubmission = await submissionModel.findOneAndUpdate(
          { 'submissionId': submissionId },
          { $set: { 'filetype': newFileType,
                    'filename': newFileName,
                    'fileData': newFileData,
                    'submissionDate': newDate} },
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
router.put('/update/:submissionId', async (req, res) => {
    try {
        const submissionId = req.params.submissionId;
        const updatedSubmission = {
            submissionId: req.body.submissionId,
            userId: req.body.userId,
            assignmentId: req.body.assignmentId,
            submissionDate: req.body.submissionDate,
            submissionGrade: req.body.submissionGrade,
            submissionStatus: req.body.submissionStatus,
            filetype: req.body.filetype,
            filename: req.body.filename,
            fileData: req.body.fileData
        };

        // Find the existing test by testId and update it
        const result = await submissionModel.updateOne(
            { 'submissionId': submissionId },
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

// DELETE request (deletes something from the db)
router.delete('/delete/:submissionId', async (req, res) => {
    try {
        const submissionId = req.params.submissionId;

        // Find the document by submissionId and remove it
        const result = await TestModel.deleteOne({ 'submissionId': submissionId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

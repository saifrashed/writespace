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
const quizScoreModel = require('../models/quizScore.model.js');
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js

// Get request (gets something from the db)
router.get("/getAll", async (req, res) => {
    try {
        // Find all tests
        const quizScores = await quizScoreModel.find();
        // Return them in json form
        res.status(200).json(quizScores);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/findByUserId/:userId", async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await quizScoreModel.find({ 'userId': req.params.userId });
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

router.get("/findByQuizId/:quizId", async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await quizScoreModel.find({ 'quizId': req.params.quizId });
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

router.post('/save/', async (req, res) => {
   try {
        const quizId = req.body.quizId;
        const userId = req.body.userId;
        const score = req.body.latestScore;

        const alreadySubmitted = await quizScoreModel.find({ 'quizId': quizId, 'userId': userId });
        if (alreadySubmitted.length !== 0) {
            return res.status(409).json({ error: 'update the existing quizScore using /update/' })
        }

        newScore = new quizScoreModel({
            quizId: quizId,
            userId: userId,
            latestScore: score,
            highScore: score
        });
        await newScore.save();
        res.status(200).json({ message: 'Score saved' });
   } catch (error) {

   }
});

router.put('/update/grade/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const quizId = req.body.quizId;
        const newScore = req.body.latestScore;

        const submissionToUpdate = await quizScoreModel.findOne({ 'userId': userId, 'quizId': quizId });

        if (submissionToUpdate === null) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        documentId = submissionToUpdate._id;

        if (newScore > submissionToUpdate.highScore) {
            updatedSubmission = await quizScoreModel.findByIdAndUpdate(documentId, { 'latestScore': newScore, 'highScore': newScore });
        }
        else {
            updatedSubmission = await quizScoreModel.findByIdAndUpdate(documentId, { 'latestScore': newScore });
        }


        res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Delete quiz score by quizId
router.delete('/deleteAllByQuiz/:quizId', async (req, res) => {
    try {
        const quizId = req.params.quizId;

        // Find the document by submissionId and remove it
        const result = await quizScoreModel.deleteMany({ 'quizId': quizId });

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

// Delete quiz score by userId
router.delete('/deleteAllByUser/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the document by submissionId and remove it
        const result = await quizScoreModel.deleteMany({ 'userId': userId });

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

// Delete quiz score for specific user and quiz
router.delete('/deleteOne/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const quizId = req.body.quizId;

        // Find the document by submissionId and remove it
        const result = await quizScoreModel.deleteOne({
            'userId': userId,
            'quizId': quizId
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

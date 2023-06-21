// Test service, services handle everything with requests in the BE

// ************************* This can be coppied for every new service *************************
// Import the router with express to do requests
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const multer = require('multer');
const { auth } = require('../middleware/auth');

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// ************************* This can be coppied for every new service *************************

// ************************* Copy and change this with the model you added *************************
// Import models for this service (../ goes up one directory)
const quizScoreModel = require('../models/quiz-score.model.js');
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js

// Get request (gets something from the db)
// Get all quiz scores
router.get("/get-all", auth, async (req, res) => {
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

// Find all scores for a specific user
router.get("/user/", auth, async (req, res) => {
    try {
        const userId = res.locals.userId;
        // Find the object using an attribute of the object
        const result = await quizScoreModel.find({ 'userId': userId });
        // If the object is not fount give an error
        if (result.length === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find all scores for a specific quiz
router.get("/quiz/:quizId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await quizScoreModel.find({ 'quizId': req.params.quizId });
        // If the object is not fount give an error
        if (result.length === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/get-score/", auth, async (req, res) => {
    try {
        const quizId = req.body.quizId;
        const userId = res.locals.userId;
        // Find the object using an attribute of the object
        const result = await quizScoreModel.find({ 'userId': userId, 'quizId': quizId });
        // If the object is not fount give an error
        if (result.length === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Save or update new quiz score
router.post('/save/', auth, async (req, res) => {
    try {
        const quizId = req.body.quizId;
        const userId = res.locals.userId;
        const newScore = req.body.latestScore;

        let quizScore = await quizScoreModel.findOne({ 'quizId': quizId, 'userId': userId });

        if (!quizScore) {
            // Create a new quiz score if it doesn't exist
            quizScore = new quizScoreModel({
                quizId: quizId,
                userId: userId,
                latestScore: newScore,
                highScore: newScore
            });
        } else {
            // Update the existing quiz score if it exists
            if (newScore > quizScore.highScore) {
                quizScore.highScore = newScore;
            }
            quizScore.latestScore = newScore;
        }

        await quizScore.save();

        res.status(200).json({ message: 'Quiz score saved/updated' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data' });
    }
});

// Delete quiz score by quizId
router.delete('/delete/quiz/:quizId', auth, async (req, res) => {
    try {
        const quizId = req.params.quizId;

        // Find the document by submissionId and remove it
        const result = await quizScoreModel.deleteMany({ 'quizId': quizId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// Delete quiz score by userId
router.delete('/delete/user/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the document by submissionId and remove it
        const result = await quizScoreModel.deleteMany({ 'userId': userId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// Delete quiz score for specific user and quiz
router.delete('/delete-one/', auth, async (req, res) => {
    try {
        const userId = res.locals.userId;
        const quizId = req.body.quizId;

        // Find the document by submissionId and remove it
        const result = await quizScoreModel.deleteOne({
            'userId': userId,
            'quizId': quizId
        });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(200).json({ message: 'Object not found' });
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

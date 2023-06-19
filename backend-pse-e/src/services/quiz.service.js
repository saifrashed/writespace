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
const quizModel = require('../models/quiz.model.js');
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js

// Get request (gets something from the db)
// Get all quiz scores
router.get("/get-all", auth, async (req, res) => {
    try {
        // Find all tests
        const quizzes = await quizModel.find();
        // Return them in json form
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find all scores for a specific user
router.get("/get-quiz/:quizId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await quizModel.find({ 'quizId': req.params.quizId });
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

// Save new quiz
router.post('/save/', auth, async (req, res) => {
   try {
        const quizId = req.body.quizId;
        const topic = req.body.topic;
        const experiencePoints = req.body.experiencePoints;
        const questions = req.body.questions;

        const alreadySubmitted = await quizModel.find({ 'quizId': quizId });
        if (alreadySubmitted.length !== 0) {
            return res.status(409).json({ error: 'A quiz with this Id already exists' })
        }

        newQuiz = new quizModel({
            quizId: quizId,
            topic: topic,
            experiencePoints: experiencePoints,
            questions: questions
        });
        await newQuiz.save();
        res.status(200).json({ message: 'Quiz saved' });
   } catch (error) {

   }
});

// Generic quiz update
router.put('/update/', auth, async (req, res) => {
    try {
        const quizId = req.body.quizId;
        const updatedSubmission = {
            quizId: req.body.quizId,
            topic: req.body.topic,
            experiencePoints: req.body.experiencePoints,
            questions: req.body.questions
        };

        // Find the existing test by quizId and update it
        const result = await quizModel.updateOne(
            {
                'quizId': quizId
            },
            { $set: updatedSubmission }
        );

        // Check if the quiz was found and updated successfully
        if (result.nModified === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        res.status(200).json({ message: 'Quiz updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Delete quiz score by quizId
router.delete('/delete/:quizId', auth, async (req, res) => {
    try {
        const quizId = req.params.quizId;

        // Find the document by quizId and remove it
        const result = await quizModel.deleteOne({ 'quizId': quizId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

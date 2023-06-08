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
const quizScore = require("../models/quizScore.model.js");
const { error } = require('console');
const quizScoreModel = require('../models/quizScore.model.js');
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js

// Get request (gets something from the db)
router.get("/getAll", async (req, res) => {
    try {
        // Find all tests
        const quizScores = await quizScore.find();
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
        const result = await quizScoreModel.find({ 'userId': req.params.quizId });
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

router.post('/newScore', async (req, res) => {
   try {
        const quizId = req.body.quizId;
        const userId = req.body.userId;
        const score = req.body.score;
         
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
        const quizId = req.body.assignmentId;
        const newScore = req.body.score;



        const updatedSubmission = await quizModel.find(
            {
                'assignmentId': assignmentId,
                'userId': userId
            },
        );

        if (newScore >= updatedSubmission)

        if (updatedSubmission === null) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});
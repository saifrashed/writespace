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
const userModel = require("../models/user.model.js");
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js
// Post request (creates something in the db)

// Get request (gets something from the db)
router.get("/getAll", async (req, res) => {
    try {
        // Find all tests
        const users = await userModel.find();
        // Return them in json form
        res.status(200).json(users);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find submissions by assignmentId
router.get("/findByUserId/:userId", async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await userModel.find({ 'userId': req.params.userId });
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


router.post('/save', upload.single('file'), async (req, res) => {
    try {
        // Variables for the model
        const userId = req.body.userId;

        const alreadyExists = await userModel.find({ 'userId': userId });

        if (alreadyExists.length !== 0) {
            return res.status(409).json({ error: 'You cant have two users with the same Id' })
        }
        const experiencePoints = 0;
        const level = 1;

        // Create a new instance of the submission model
        const newUser = new userModel({
            userId: userId,
            experiencePoints: experiencePoints,
            level: level
        });

        // Save the newTest instance to the database
        const savedUser = await newUser.save();

        // Send the savedTest object back in json form
        res.status(200).json(savedUser);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to the database' });
    }
});


router.put('/update/experiencePoints/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const experiencePoints = req.body.experiencePoints

        const updatedUser = await userModel.findOneAndUpdate(
            {
                'userId': userId,
            },
            {
                $set: {
                    'experiencePoints': experiencePoints
                }
            },
            { new: true }
        );

        if (updatedUser === null) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Updates the submission Grade
router.put('/update/level/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const newLevel = req.body.level;

        const updatedUser = await userModel.findOneAndUpdate(
            {
                'userId': userId
            },
            {
                $set: {
                    'level': newLevel
                }
            },
            { new: true }
        );

        if (updatedUser === null) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// General update request
// PUT request (updates something in the db)
router.put('/update/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const updatedUser = {
            userId: req.body.userId,
            experiencePoints: req.body.experiencePoints,
            level: req.body.level
        };

        // Find the existing test by testId and update it
        const result = await userModel.updateOne(
            {
                'userId': userId
            },
            { $set: updatedUser }
        );

        // Check if the test was found and updated successfully
        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});


router.delete('/delete/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the document by submissionId and remove it
        const result = await userModel.deleteOne({ 'userId': userId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});


// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

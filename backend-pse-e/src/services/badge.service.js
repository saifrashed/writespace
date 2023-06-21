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
const badgeModel = require("../models/badge.model.js");
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js
// Post request (creates something in the db)

/* This get request returns all badges
Input: none
Output: all badges in the database
*/
router.get("/get-all", auth, async (req, res) => {
    try {
        // Find all tests
        const badges = await badgeModel.find();
        // Return them in json form
        res.status(200).json(badges);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* This get request returns one badge
Input: badgeId
Output: badge with the given badgeId
*/
router.get("/get-badge/:badgeId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await badgeModel.find({ 'badgeId': req.params.badgeId });
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

/* This post request saves a new badge
Input: badgeId, experiencePoints, name, category, description
Output: saved badge
*/
router.post('/save', auth, async (req, res) => {
    try {
        // Variables for the model
        const badgeId = req.body.badgeId;

        const alreadyExists = await badgeModel.find({ 'badgeId': badgeId });

        if (alreadyExists.length !== 0) {
            return res.status(409).json({ error: 'You cant have two users with the same Id' })
        }

        const experiencePoints = req.body.experiencePoints;
        const name = req.body.name;
        const category = req.body.category;
        const description = req.body.description;

        // Create a new instance of the badge model
        const newBadge = new badgeModel({
            badgeId: badgeId,
            experiencePoints: experiencePoints,
            name: name,
            category: category,
            description: description,
        });

        // Save the newTest instance to the database
        const savedBadge = await newBadge.save();

        // Send the savedTest object back in json form
        res.status(200).json(savedBadge);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to the database' });
    }
});

/* This put request updates the experience points of a badge
Input: badgeId, experiencePoints
Output: confirmation/error message
*/
router.put('/update/experience-points/', auth, async (req, res) => {
    try {
        const badgeId = req.body.badgeId;
        const experiencePoints = req.body.experiencePoints

        const updatedBadge = await badgeModel.findOneAndUpdate(
            {
                'badgeId': badgeId,
            },
            {
                $set: {
                    'experiencePoints': experiencePoints
                }
            },
            { new: true }
        );

        if (updatedBadge === null) {
            return res.status(200).json({ message: 'Badge not found' });
        }

        res.status(200).json({ message: 'Badge updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Update badge name and description
router.put('/update/details/', auth, async (req, res) => {
    try {
        const badgeId = req.body.badgeId;
        const name = req.body.name;
        const category = req.body.category;
        const description = req.body.description;

        const updatedBadge = await badgeModel.findOneAndUpdate(
            {
                'badgeId': badgeId,
            },
            {
                $set: {
                    'name': name,
                    'category': category,
                    'description': description
                }
            },
            { new: true }
        );

        if (updatedBadge === null) {
            return res.status(200).json({ message: 'Badge not found' });
        }

        res.status(200).json({ message: 'Badge updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});


// Delete badge
router.delete('/delete/:badgeId', auth, async (req, res) => {
    try {
        const badgeId = req.params.badgeId;

        // Find the document by badgeId and remove it
        const result = await badgeModel.deleteOne({ 'badgeId': badgeId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'Badge deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

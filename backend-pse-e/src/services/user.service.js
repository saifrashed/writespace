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
// Get all users
router.get("/get-all", async (req, res) => {
    try {
        // Find all users
        const users = await userModel.find();
        // Return them in json form
        res.status(200).json(users);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find users by userId
router.get("/find-by-user-id/:userId", async (req, res) => {
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

// Save new user
router.post('/save', async (req, res) => {
    try {
        // Variables for the model
        const userId = req.body.userId;

        const alreadyExists = await userModel.find({ 'userId': userId });

        if (alreadyExists.length !== 0) {
            return res.status(409).json({ error: 'You cant have two users with the same Id' })
        }
        const experiencePoints = 0;
        const level = 1;
        const badges = req.body.badges;

        // Create a new instance of the submission model
        const newUser = new userModel({
            userId: userId,
            experiencePoints: experiencePoints,
            level: level,
            badges: badges
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

// Updates user XP
router.put('/update/experience-points/', async (req, res) => {
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

// Updates user level
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

// Add badge to user. Handles adding of new badges and adding to existing badges
router.put('/update/add-badge/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const newBadge = req.body.badgeId;
        const courseId = req.body.courseId;
        const assignmentId = req.body.assignmentId;
        const graderId = req.body.graderId;
        const comment = req.body.comment;

        const userToUpdate = await userModel.findOne({ 'userId': userId });

        if (userToUpdate === null) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updateId = userToUpdate._id;
        const badges = userToUpdate.badges;

        if (badges.has(String(newBadge))) {
            badgeToUpdate = badges.get(String(newBadge))[0];
            badgeToUpdate.amount = badgeToUpdate.amount + 1;
            badgeToUpdate.badgelist.push({ courseId: courseId, assignmentId: assignmentId, graderId: graderId, comment: comment });
            badges.set(String(newBadge), badgeToUpdate);
        } else {
            badges.set(String(newBadge), { amount: 1, badgelist: [{ courseId: courseId, assignmentId: assignmentId, graderId: graderId, comment: comment }] });
        }

        updatedUser = await userModel.findByIdAndUpdate(updateId, { "badges": badges }, { new: true });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Delete a badge
router.put('/update/delete-badge/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId;
        const badgeId = req.body.badgeId

        const userToUpdate = await userModel.findOne({ 'userId': userId });

        if (userToUpdate === null) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updateId = userToUpdate._id;
        const badges = userToUpdate.badges;

        if (badges.has(String(badgeId))) {
            badgeToDelete = badges.get(String(badgeId))[0];
            if (badgeToDelete.amount > 1) {
                badgeToDelete.amount = badgeToDelete.amount - 1;
                for (var i = 0; i < badgeToDelete.badgelist.length; i++) {
                    if (badgeToDelete.badgelist[i].assignmentId === assignmentId) {
                        badgeToDelete.badgelist.pop(i);
                        badges.set(String(badgeId), badgeToDelete);
                        break;
                    }
                }
            }
            else {
                badges.delete(String(badgeId));
            }

        }

        else {
            return res.status(404).json({ error: 'Badge not found' });
        }

        await userModel.findByIdAndUpdate(updateId, { "badges": badges });

        res.status(200).json({ message: 'Badge removed successfully' });
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
            level: req.body.level,
            badges: req.body.badges
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

// Delete user
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


// Test service, services handle everything with requests in the BE

// ************************* This can be coppied for every new service *************************
// Import the router with express to do requests
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const multer = require('multer');
const { auth } = require('../middleware/auth');

// Require axios for communicating with the canvas api
const axios = require('axios');
// Canvas api URL
const { API_URL } = process.env;

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

// Function to get the level of a user based on their experience points
function getLevel(experiencePoints) {
    let level = 1;
    let levelThreshold = 0;
    while (experiencePoints >= levelThreshold) {
        level++;
        levelThreshold += (level - 1) * 100;
    }
    return {
        level: level - 1,
        threshold: levelThreshold
    };
}

// Get request (gets something from the db)
// Get all users
router.get("/get-all", auth, async (req, res) => {
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

router.post("/badges/assignment/", auth, async (req, res) => {
    try {
        const assignmentId = req.body.assignmentId;
        const userId = req.body.userId ? req.body.userId : res.locals.userId;

        const user = await userModel.findOne({ 'userId': userId });
        badges = user.badges;

        const assignmentBadges = badges.filter(badge => badge.assignmentId === assignmentId);

        res.status(200).json(assignmentBadges);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Save new user
router.post('/save', auth, async (req, res) => {
    try {
        // Use the userId from the authentication check (canvas userId)
        const userId = res.locals.userId;

        const alreadyExists = await userModel.find({ 'userId': userId });

        if (alreadyExists.length !== 0) {
            return res.status(409).json({ error: 'You cant have two users with the same Id' })
        }

        const pictureId = 0;
        const experiencePoints = 0;
        const badges = req.body.badges;

        // Create a new instance of the submission model
        const newUser = new userModel({
            userId: userId,
            pictureId: pictureId,
            experiencePoints: experiencePoints,
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

// Updates user picture
router.put('/update/picture/', auth, async (req, res) => {
    try {
        const userId = res.locals.userId;
        const pictureId = req.body.pictureId;

        const updatedUser = await userModel.findOneAndUpdate(
            {
                'userId': userId,
            },
            {
                $set: {
                    'pictureId': pictureId
                }
            },
            { new: true }
        );

        if (updatedUser === null) {
            return res.status(200).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Updates user XP
router.put('/update/experience-points/', auth, async (req, res) => {
    try {
        const userId = req.body.userId ? req.body.userId : res.locals.userId;
        const XPToAdd = req.body.experiencePoints

        const userToUpdate = await userModel.findOne({ 'userId': userId });

        if (userToUpdate === null) {
            return res.status(200).json({ message: 'User not found' });
        }

        const updateId = userToUpdate._id;
        let userXP = userToUpdate.experiencePoints;
        userXP = userXP + XPToAdd;

        const updatedUser = await userModel.findByIdAndUpdate(updateId,
            {
                $set: {
                    'experiencePoints': userXP,
                }
            },
            { new: true }
        );

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Add badge to user. Handles adding of new badges and adding to existing badges
router.put('/update/add-badges/', auth, async (req, res) => {
    try {
        const graderId = res.locals.userId;
        const { badges, courseId, assignmentId, userId, comment } = req.body;

        let preparedBadges = [];

        for (let i = 0; i < badges.length; i++) {
            const badgeId = badges[i];
            const badge = {
                badgeId: badgeId,
                courseId: courseId,
                assignmentId: assignmentId,
                graderId: graderId,
                comment: comment
            }
            preparedBadges.push(badge);
        }

        const updatedUser = await userModel.findOneAndUpdate(
            {
                'userId': userId,
            },
            {
                $push: {
                    'badges': preparedBadges
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(200).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Delete a badge
router.put('/update/delete-badge/', auth, async (req, res) => {
    try {
        const userId = req.body.userId ? req.body.userId : res.locals.userId;
        const assignmentId = req.body.assignmentId;
        const badgeId = req.body.badgeId

        const userToUpdate = await userModel.findOne({ 'userId': userId });

        if (userToUpdate === null) {
            return res.status(200).json({ message: 'User not found' });
        }

        const updateId = userToUpdate._id;
        const badges = userToUpdate.badges;
        let badgePresent = false;

        for (let i = 0; i < badges.length; i++) {
            const b = badges[i];
            if (
                b.badgeId === badgeId &&
                b.assignmentId === assignmentId
            ) {
                badges.splice(i, 1); // Remove the object at the found index
                badgePresent = true;
                break;
            }
        }

        if (!badgePresent) {
            return res.status(200).json({ message: 'Badge not found' });
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
// router.put('/update/', auth, async (req, res) => {
//     try {
//         const userId = res.locals.userId;
//         const updatedUser = {
//             userId: res.locals.userId,
//             pictureId: req.body.pictureId,
//             experiencePoints: req.body.experiencePoints,
//             badges: req.body.badges
//         };

//         // Find the existing test by testId and update it
//         const result = await userModel.updateOne(
//             {
//                 'userId': userId
//             },
//             { $set: updatedUser }
//         );

//         // Check if the test was found and updated successfully
//         if (result.nModified === 0) {
//             return res.status(200).json({ message: 'Object not found' });
//         }

//         res.status(200).json({ message: 'User updated successfully' });
//     } catch (error) {
//         console.error('Error updating data in MongoDB:', error);
//         res.status(500).json({ error: 'Failed to update data in the database' });
//     }
// });

// // Delete user
// router.delete('/delete/:userId', auth, async (req, res) => {
//     try {
//         const userId = req.params.userId;

//         // Find the document by submissionId and remove it
//         const result = await userModel.deleteOne({ 'userId': userId });

//         // Check if the document was found and deleted successfully
//         if (result.deletedCount === 0) {
//             return res.status(200).json({ message: 'Object not found' });
//         }

//         // Delete successful
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting data from MongoDB:', error);
//         res.status(500).json({ error: 'Failed to delete data from the database' });
//     }
// });

// Get user combined with canvas user object
router.get("/get-user", auth, async (req, res) => {
    try {
        // Canvas API url
        const responseCanvas = await axios.get(`${API_URL}/users/self`, {
            headers: {
                // Authorization using the access token
                Authorization: `Bearer ${req.headers["bearer"]}`
            }
        });

        // Find the user with the id from canvas
        const responseMongo = await userModel.find({ 'userId': responseCanvas.data.id });

        // If the object is not fount give an error
        if (responseMongo.length === 0) {
            return res.status(200).json({ message: 'User not found in mongodb' });
        }

        const level = getLevel(responseMongo[0].experiencePoints);

        // Combine json objects ... merges the objects
        const combinedUser = {
            ...responseCanvas.data,
            ...responseMongo[0]._doc,
            level: level.level,
            threshold: level.threshold
        };

        // Handle success case here
        res.status(200).json(combinedUser);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error in /get-user' });
    }
});

// // Get user from canvas only
// router.get('/get-user-canvas', auth, async (req, res) => {
//     try {
//         // Canvas API url
//         const response = await axios.get(`${API_URL}/users/self`, {
//             headers: {
//                 // Authorization using the access token
//                 Authorization: `Bearer ${req.headers["bearer"]}`
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error from Canvas API:', error);
//         res.status(500).json({ error: 'An error occurred in /get-user-canvas.' });
//     }
// });

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;


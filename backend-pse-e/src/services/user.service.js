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

// Find users by userId
router.get("/find-by-user-id/:userId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await userModel.find({ 'userId': req.params.userId });
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

// Save new user
router.post('/save', auth, async (req, res) => {
    try {
        // Variables for the model
        const userId = req.body.userId;

        const alreadyExists = await userModel.find({ 'userId': userId });

        if (alreadyExists.length !== 0) {
            return res.status(409).json({ error: 'You cant have two users with the same Id' })
        }

        const pictureId = 0;
        const experiencePoints = 0;
        const level = 1;
        const badges = req.body.badges;

        // Create a new instance of the submission model
        const newUser = new userModel({
            userId: userId,
            pictureId: pictureId,
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

// Updates user picture
router.put('/update/picture/', auth, async (req, res) => {
    try {
        const userId = req.body.userId;
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
        const userId = req.body.userId;
        const XPToAdd = req.body.experiencePoints

        const userToUpdate = await userModel.findOne({ 'userId': userId });

        if (userToUpdate === null) {
            return res.status(200).json({ message: 'User not found' });
        }

        const updateId = userToUpdate._id;
        let userXP = userToUpdate.experiencePoints;
        userXP = userXP + XPToAdd;
        let level = userToUpdate.level;
        while (userXP >= levelThresholds[level]) {
            level = level + 1;
        }
        const updatedUser = await userModel.findByIdAndUpdate(updateId,
            {
                $set: {
                    'experiencePoints': userXP,
                    'level': level
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

// Updates user level
router.put('/update/level/', auth, async (req, res) => {
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
            return res.status(200).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Add badge to user. Handles adding of new badges and adding to existing badges
router.put('/update/add-badge/', auth, async (req, res) => {
    try {
        const userId = req.body.userId;
        const newBadge = req.body.badgeId;
        const courseId = req.body.courseId;
        const assignmentId = req.body.assignmentId;
        const graderId = req.body.graderId;
        const comment = req.body.comment;

        const userToUpdate = await userModel.findOne({ 'userId': userId });

        if (userToUpdate === null) {
            return res.status(200).json({ message: 'User not found' });
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
router.put('/update/delete-badge/', auth, async (req, res) => {
    try {
        const userId = req.body.userId;
        const assignmentId = req.body.assignmentId;
        const badgeId = req.body.badgeId

        const userToUpdate = await userModel.findOne({ 'userId': userId });

        if (userToUpdate === null) {
            return res.status(200).json({ message: 'User not found' });
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
router.put('/update/', auth, async (req, res) => {
    try {
        const userId = req.body.userId;
        const updatedUser = {
            userId: req.body.userId,
            pictureId: req.body.pictureId,
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
            return res.status(200).json({ message: 'Object not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

// Delete user
router.delete('/delete/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the document by submissionId and remove it
        const result = await userModel.deleteOne({ 'userId': userId });

        // Check if the document was found and deleted successfully
        if (result.deletedCount === 0) {
            return res.status(200).json({ message: 'Object not found' });
        }

        // Delete successful
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to delete data from the database' });
    }
});

// Get general user information (is a post because a get cannot have a body)
router.get('/get-user-canvas', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/users/self`, {
            headers: {
                // Authorization using the access token
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                // Configure how many items are returned maximum
                per_page: 100
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /get-user-canvas.' });
    }
});

// Route to get assignments for a course with a user access token
router.get('/courses', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                // Configure how many items are returned maximum
                per_page: 100
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses.' });
    }
});

// Get all courses that are relevant (such as not closed)
router.get('/relevant-courses', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                // Configure how many items are returned maximum
                per_page: 100,
                // Include 'concluded' and 'term' for the courses
                include: ['concluded', 'term']
            }
        });
        // Filter out unrelevant courses. There is a property "concluded", if this
        // is true the course is done and the course is not relevant anymore.
        const relevantCourses = response.data.filter(course => !course.concluded);
        res.json(relevantCourses);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /relevant-courses.' });
    }
});

// Get all assignments of a course with a user access token
router.get('/assignments', auth, async (req, res) => {
    try {
        const { courseId } = req.body;
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${courseId}/assignments`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                // Configure how many items are returned maximum
                per_page: 100
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /assignments.' });
    }
});

// Get one course with a user access token
router.get('/courses/:courseId', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${req.params.courseId}`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId.' });
    }
});

// Get all file upload (written) assignments
router.post('/written-assignments', auth, async (req, res) => {
    try {
        const { courseId } = req.body;
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${courseId}/assignments`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                order_by: "due_at"
            }
        });
        // Filter assignments by submission_types
        res.json(response.data.filter(assignment => {
            return assignment.submission_types.includes("online_upload");
        }));
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /written-assignments.' });
    }
});

// Get all user enrolled in a course without non official users (TestPerson).
router.post('/courses/:courseId/users', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${req.params.courseId}/users`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/users.' });
    }
});

// Get all users enrolled in a course.
router.post('/courses/:courseId/enrollments', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${req.params.courseId}/enrollments`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/enrollments.' });
    }
});

const levelThresholds = [
    0,     // Level 1 threshold
    100,   // Level 2 threshold
    300,   // Level 3 threshold
    600,   // Level 4 threshold
    1000,  // Level 5 threshold
    1500,  // Level 6 threshold
    2100,  // Level 7 threshold
    2800,  // Level 8 threshold
    3600,  // Level 9 threshold
    4500,  // Level 10 threshold
    5500,  // Level 11 threshold
    6600,  // Level 12 threshold
    7800,  // Level 13 threshold
    9100,  // Level 14 threshold
    10500, // Level 15 threshold
    12000, // Level 16 threshold
    13600, // Level 17 threshold
    15300, // Level 18 threshold
    17100, // Level 19 threshold
    19000, // Level 20 threshold
    21000, // Level 21 threshold
    23100, // Level 22 threshold
    25300, // Level 23 threshold
    27600, // Level 24 threshold
    30000, // Level 25 threshold
    32500, // Level 26 threshold
    35100, // Level 27 threshold
    37800, // Level 28 threshold
    40600, // Level 29 threshold
    43500  // Level 30 threshold
];


// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;


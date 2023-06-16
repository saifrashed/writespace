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
const assignmentModel = require("../models/assignment.model.js");
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js

// Get request (gets something from the db)
router.get("/get-all", auth, async (req, res) => {
    try {
        // Find all tests
        const assignments = await assignmentModel.find();
        // Return them in json form
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find submissions by assignmentId
router.get("/find-by-creator-id/:creatorId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await assignmentModel.find({ 'creatorId': req.params.creatorId });
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

// Find submissions by courseId
router.get("/find-by-course-id/:courseId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await assignmentModel.find({ 'coursId': req.params.courseId });
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

// Post request (creates something in the db)
router.post('/save', auth, async (req, res) => {
    try {
        // Variables for the model
        const assignmentId = req.body.assignmentId;

        const alreadyExists = await assignmentModel.find({ 'assignmentId': assignmentId});

        if (alreadyExists.length !== 0) {
            return res.status(409).json({ error: 'An assignment with this Id already exists' })
        }

        const courseId = req.body.courseId;
        const creatorId = req.body.creatorId;
        const name = req.body.name;
        const description = req.body.description;
        const deadline = req.body.deadline;
        const availableAt = req.body.availableAt;
        const maxPoints = req.body.maxPoints;
        const rubric = req.body.rubric;


        // Create a new instance of the submission model
        const newAssignment = new assignmentModel({
            assignmentId: assignmentId,
            courseId: courseId,
            creatorId: creatorId,
            name: name,
            description: description,
            deadline: deadline,
            availableAt: availableAt,
            maxPoints: maxPoints,
            rubric: rubric
        });

        // Save the newTest instance to the database
        const savedAssignment = await newAssignment.save();

        // Send the savedTest object back in json form
        res.status(200).json(savedAssignment);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to the database' });
    }
});

router.put('/update/description/', auth, async (req, res) => {
    try {
        const assignmentId = req.body.assignmentId
        const description = req.body.description;

        const updatedDescription = await assignmentModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
            },
            {
                $set: {
                    'description': description
                }
            },
            { new: true }
        );

        if (updatedDescription === null) {
            return res.status(200).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

router.put('/update/name/', auth, async (req, res) => {
    try {
        const assignmentId = req.body.assignmentId
        const name = req.body.name;

        const updatedName = await assignmentModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
            },
            {
                $set: {
                    'name': name
                }
            },
            { new: true }
        );

        if (updatedName === null) {
            return res.status(200).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

router.put('/update/max-points/', auth, async (req, res) => {
    try {
        const assignmentId = req.body.assignmentId
        const maxPoints = req.body.maxPoints;

        const updatedMaxPoints = await assignmentModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
            },
            {
                $set: {
                    'maxPoints': maxPoints
                }
            },
            { new: true }
        );

        if (updatedMaxPoints === null) {
            return res.status(200).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

router.put('/update/deadline/', auth, async (req, res) => {
    try {
        const assignmentId = req.body.assignmentId
        const deadline = req.body.deadline;

        const updatedDeadline = await assignmentModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
            },
            {
                $set: {
                    'deadline': deadline
                }
            },
            { new: true }
        );

        if (updatedDeadline === null) {
            return res.status(200).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

router.put('/update/available-at/', auth, async (req, res) => {
    try {
        const assignmentId = req.body.assignmentId
        const availableAt = req.body.availableAt;

        const updatedAvailableAt = await assignmentModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
            },
            {
                $set: {
                    'availableAt': availableAt
                }
            },
            { new: true }
        );

        if (updatedAvailableAt === null) {
            return res.status(200).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});

router.put('/update/rubric/', auth, async (req, res) => {
    try {
        const assignmentId = req.body.assignmentId
        const rubric = req.body.rubric;

        const updatedRubric = await assignmentModel.findOneAndUpdate(
            {
                'assignmentId': assignmentId,
            },
            {
                $set: {
                    'rubric': rubric
                }
            },
            { new: true }
        );

        if (updatedRubric === null) {
            return res.status(200).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment updated successfully' });
    } catch (error) {
        console.error('Error updating data in MongoDB:', error);
        res.status(500).json({ error: 'Failed to update data in the database' });
    }
});


router.delete('/delete/:assignmentId', auth, async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;

        // Find the document by submissionId and remove it
        const result = await assignmentModel.deleteOne({ 'assignmentId': assignmentId });

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

// DELETE request (deletes something from the db)
router.delete('/delete/:courseId', auth, async (req, res) => {
    try {
        const courseId = req.params.courseId;

        // Find the document by submissionId and remove it
        const result = await assignmentModel.deleteMany({
            'courseId': courseId
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

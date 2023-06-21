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
const submissionModel = require("../models/submission.model.js");

// Create assignment (missing deadline attribute)
router.post('/create', auth, (req, res) => {
    const { assignment, courseId } = req.body;

    axios.post(`${API_URL}/courses/${courseId}/assignments`, assignment, {
        headers: {
            Authorization: `Bearer ${req.headers["bearer"]}`
        }, params: {
            "assignment[name]": assignment.name,
            "assignment[description]": assignment.description,
            "assignment[points_possible]": assignment.points_possible,
            "assignment[grading_type]": assignment.grading_type,
            "assignment[submission_types]": ['online_upload'], // written assignment standard
            "assignment[allowed_attempts]": assignment.allowed_attempts,
            "assignment[anonymous_grading]": assignment.anonymous_grading,
            "assignment[omit_from_final_grade]": assignment.omit_from_final_grade,
            "assignment[published]": true, // immediately publish assignment
            "assignment[due_at]": assignment.due_at
        }
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/assignments/:assignmentId.' });
    });
});

// Update assignment (missing deadline attribute)
router.put('/update', auth, (req, res) => {
    const { assignment, courseId, assignmentId } = req.body;

    axios.put(`${API_URL}/courses/${courseId}/assignments/${assignmentId}`, assignment, {
        headers: {
            Authorization: `Bearer ${req.headers["bearer"]}`
        }, params: {
            "assignment[name]": assignment.name,
            "assignment[description]": assignment.description,
            "assignment[points_possible]": assignment.points_possible,
            "assignment[grading_type]": assignment.grading_type,
            "assignment[submission_types]": ['online_upload'], // written assignment standard
            "assignment[allowed_attempts]": assignment.allowed_attempts,
            "assignment[anonymous_grading]": assignment.anonymous_grading,
            "assignment[omit_from_final_grade]": assignment.omit_from_final_grade,
            "assignment[published]": true, // immediately publish assignment
            "assignment[due_at]": assignment.due_at
        }
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/assignments/:assignmentId.' });
    });
});

// Delete assignment
// router.delete('/delete/:courseId/:assignmentId', auth, (req, res) => {
//     const { courseId, assignmentId } = req.params

//     axios.delete(`${API_URL}/courses/${courseId}/assignments/${assignmentId}`, {}, {
//         headers: {
//             Authorization: `Bearer ${req.headers["bearer"]}`
//         }
//     }).then(response => {
//         // Filter assignments by submission_types
//         res.json(response.data.filter(assignment => {
//             return assignment.submission_types.includes("online_upload");
//         }));
//     }).catch(error => {
//         console.error('Error from Canvas API:', error);
//         res.status(500).json({ error: 'An error occurred in /courses/:courseId/assignments/:assignmentId.' });
//     });
// });

// Get one assignment from a course with a user access token
router.post('/get-one', auth, async (req, res) => {
    try {
        const { courseId, assignmentId } = req.body;

        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${courseId}/assignments/${assignmentId}`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/:assignmentId.' });
    }
});

// Get all assignments of a course with a user access token
router.post('/get-all', auth, async (req, res) => {
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

// Get all submissions for an assignment
router.get("/get-submissions/:assignmentId", auth, async (req, res) => {
    try {
        // Find the object using an attribute of the object
        const result = await submissionModel.find({ 'assignmentId': req.params.assignmentId });

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get submission by a user for an assignment
router.post("/get-submission/", auth, async (req, res) => {
    try {
        const { userId, assignmentId } = req.body;
        // Find the object using an attribute of the object

        const result = await submissionModel.find({
            'assignmentId': assignmentId,
            'userId': userId ? userId : res.locals.userId
        });

        // Handle success case here
        res.status(200).json(result);
    } catch (error) {
        console.error('Error from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

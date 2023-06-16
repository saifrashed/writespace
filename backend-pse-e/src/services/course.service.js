// Import the router with express to do requests
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Require axios for communicating with the canvas api
const axios = require('axios');
// Canvas api URL
const { API_URL } = process.env;

// Get a list of students in the course
router.post('/:courseId/users/students', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${req.params.courseId}/users`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }, params: {
                // Configure how many items are returned maximum
                per_page: 100,
                // Select only students
                enrollment_type: ['student', 'student_view']
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/users/students.' });
    }
});

// Get a user's role for a specific course
// The path is /user/role because otherwise the request does a different one!
router.get('/:courseId/user/role', auth, async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${req.params.courseId}`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }
        });
        // Return enrollments information
        res.json(response.data.enrollments[0]);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/user/role.' });
    }
});

// Export requests with the router variable
module.exports = router;
// Import the router with express to do requests
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Require axios for communicating with the canvas api
const axios = require('axios');
// Canvas api URL
const { API_URL } = process.env;

// Get all courses that are relevant (such as not closed)
router.get('/get-all', auth, async (req, res) => {
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

// Get a list of students in the course
router.post('/students', auth, async (req, res) => {
    try {
        const { courseId } = req.body;
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${courseId}/users`, {
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
router.post('/enrollment', auth, async (req, res) => {
    const roles = ['teacher', 'designer', 'ta', 'student', 'observer'];
    try {
        const { courseId } = req.body;
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            }
        });
        const enrollments = response.data.enrollments;
        // Return enrollments information
        for (const role of roles) {
            const enrollment = enrollments.find(enrollment => enrollment.type === role);
            if (enrollment) {
                res.json(enrollment);
                break;
            }
        }
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/user/role.' });
    }
});

// Get all users enrolled in a course.
router.post('/enrollments', auth, async (req, res) => {
    try {
        const { courseId } = req.body;
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${courseId}/enrollments`, {
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

// Get one course with a user access token
router.get('/:courseId', auth, async (req, res) => {
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

// Export requests with the router variable
module.exports = router;
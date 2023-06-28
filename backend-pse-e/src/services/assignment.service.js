// Test service, services handle everything with requests in the BE

// ************************* This can be coppied for every new service *************************
// Import the router with express to do requests
const express = require('express');
const router = express.Router();
require('mongodb');
const multer = require('multer');
const { auth } = require('../middleware/auth');

// Require axios for communicating with the canvas api
const axios = require('axios');
// Canvas api URL
const { API_URL } = process.env;

// Configure multer storage
const storage = multer.memoryStorage();
multer({ storage: storage });
const submissionModel = require("../models/submission.model.js");

// Create assignment 
router.post('/create', auth, (req, res) => {
    const { assignment, courseId } = req.body;

    axios.post(`${API_URL}/courses/${courseId}/assignments`, assignment, {
        headers: {
            Authorization: `Bearer ${req.headers["bearer"]}`
        }, params: {
            "assignment[name]": `${assignment.name?.trim() || "Unknown"} (WriteSpace)`,
            "assignment[description]": assignment.description,
            "assignment[points_possible]": assignment.points_possible,
            "assignment[grading_type]": assignment.grading_type,
            "assignment[submission_types]": ['online_url'], // online url assignment standard
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

// Update assignment
router.put('/update', auth, (req, res) => {
    const { assignment, courseId, assignmentId } = req.body;

    axios.put(`${API_URL}/courses/${courseId}/assignments/${assignmentId}`, assignment, {
        headers: {
            Authorization: `Bearer ${req.headers["bearer"]}`
        }, params: {
            "assignment[name]": `${assignment.name?.trim()} (WriteSpace)`,
            "assignment[description]": assignment.description,
            "assignment[points_possible]": assignment.points_possible,
            "assignment[grading_type]": assignment.grading_type,
            "assignment[submission_types]": ['online_url'], // online url assignment standard
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
router.delete('/delete/:courseId/:assignmentId', auth, (req, res) => {
    const { courseId, assignmentId } = req.params

    axios.delete(`${API_URL}/courses/${courseId}/assignments/${assignmentId}`, {
        headers: {
            Authorization: `Bearer ${req.headers["bearer"]}`
        }
    }).then(response => {
        res.json(response.data)
    }).catch(error => {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/assignments/:assignmentId.' });
    });
});

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

        // Check if the assignment name contains " - WriteSpace"
        if (response.data && response.data.name && response.data.name.includes("(WriteSpace)")) {
            response.data.name = response.data.name.replace(" (WriteSpace)", "");
        }

        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /courses/:courseId/:assignmentId.' });
    }
});


router.post('/get-all', auth, async (req, res) => {
    try {
        const { isTeacher, courseId } = req.body;
        // Canvas API url
        const response = await axios.get(`${API_URL}/courses/${courseId}/assignments`, {
            headers: {
                Authorization: `Bearer ${req.headers["bearer"]}`
            },
            params: {
                per_page: 100
            }
        }); 

        // Only select (WriteSpace) assignments with assignment type "online_url", exclude the rest
        if (response.data && Array.isArray(response.data)) {
            // Filter assignments that contain " - WriteSpace" in their name and have "online_url" submission
            const filteredAssignments = response.data.filter(assignment =>
                assignment.name && assignment.name.includes("(WriteSpace)")
                && assignment.submission_types.includes("online_url")
            );

            // Remove " - WriteSpace" suffix from assignment names
            filteredAssignments.forEach(assignment => {
                assignment.name = assignment.name.replace(" (WriteSpace)", "");
            });

            response.data = filteredAssignments;
        }

        // Get the enrollments of the user in this course
        let userEnrollmentsRes = await axios.get(`${API_URL}/courses/${courseId}/enrollments`, {
            headers: {
              Authorization: `Bearer ${req.headers["bearer"]}`,
            },
            params: {
              user_id: res.locals.userId,
            },
        });
        // Map the response to only having the type of the enrollment
        userEnrollmentsRes = userEnrollmentsRes.data.map(enrollment => enrollment.type)
        // Retrieve all submissions of the user for this course if it is NOT a teacher or designer
        if (!userEnrollmentsRes.includes("TeacherEnrollment" || "DesignerEnrollment")) {
            const userSubmissionsRes = await axios.get(`${API_URL}/courses/${courseId}/students/submissions`, {
                headers: {
                    Authorization: `Bearer ${req.headers["bearer"]}`
                },
                params: {
                    // Only select the submissions for the current user 
                    // automatically selects submissions for the course with courseId only
                    "student_ids[]": [res.locals.userId],
                    per_page: 200
                }
            });
            // Map the submission objects to only the assignment ids that are submitted
            const submittedAssignmentIds = userSubmissionsRes.data
                .filter(submission => submission.workflow_state === 'submitted')
                .map(submission => submission.assignment_id);

            // Add the "has_submitted" attribute and set it to true or false
            response.data.forEach(assignment => {
                // If the user has submitted something for the assignment, set it to true
                if (submittedAssignmentIds.includes(assignment.id)) {
                    assignment.has_submitted = true;
                } else {
                    assignment.has_submitted = false;
                }
            });
        }

        // Send back the edited response data with "has_submitted" attribute
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /assignment/get-all.' });
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

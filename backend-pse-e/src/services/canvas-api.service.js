// This service communicates with the Canvas API
const express = require('express');
const router = express.Router();

// Require axios for communicating with the canvas api
const axios = require('axios');

// // Canvas api url (production environment, for now we can use this one because it works, but after the meeting with Gerrit it may change)
// const apiUrl = 'https://canvas.uva.nl/api/v1';
// Canvas api url (testing environment)
const apiUrl = 'https://uvadlo-dev.test.instructure.com/api/v1';

// Developer key setup
// const redirectUri = 'https://localhost:5000/signin-oidc';
// const clientId = '?';
// const clientSecret = '?';

// Get general user information (is a post because a get cannot have a body)
router.post('/get-user', (req, res) => {
  const token = req.body.token;
  // Canvas API url
  axios.get(`${apiUrl}/users/self`, {
    headers: {
      // Authorization using the access token
      Authorization: `Bearer ${token}`
    }, params: {
      // Configure how many items are returned maximum
      per_page: 100
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Route to get assignments for a course with a user access token
router.post('/courses', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params: {
      // Configure how many items are returned maximum
      per_page: 100
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Get all assignments of a course with a user access token
router.post('/assignments', (req, res) => {
  const { courseId, token } = req.body;
  axios.get(`${apiUrl}/courses/${courseId}/assignments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params: {
      // Configure how many items are returned maximum
      per_page: 100
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Get one course with a user access token
router.post('/courses/:courseId', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses/${req.params.courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Get one assignment from a course with a user access token
router.post('/courses/:courseId/:assignmentId', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// get user role for course
// TODO

// Get assignments for a course that are written
// TODO: see assignment returned, probably file uploads
/*
"submission_types": [
            "online_upload"
        ],
Then here something with file upload!
*/

// Get rubrics, see if the assignment contains a rubric id or something!
// Get one rubric for an assignment with a user access token
router.post('/courses/:courseId/rubrics/:rubricId', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses/${req.params.courseId}/rubrics/${req.params.rubricId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Upload submission for an assignment, this is a pdf file, contact Alessio for this!

// Create assignment on canvas

module.exports = router;
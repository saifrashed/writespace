// This service communicates with the Canvas API
const express = require('express');
const router = express.Router();

// Require axios for communicating with the canvas api
const axios = require('axios');

// Canvas api url
const apiUrl = 'https://canvas.uva.nl/api/v1';

// Change this access token every time for different users!
// See Canvas_API document in discord on how to get an access token
const accessToken = 'YOUR_ACCESS_TOKEN_HERE';

/* 
Get request to get all courses with the api.
router.x is used to specify the used route.
axios is used to communicate with the canvas api and authenticate
the user with the access token.
Postman request URL: localhost:5000/canvas-api/courses
*/
router.get('/courses', (req, res) => {
  // Canvas API url
  axios.get(`${apiUrl}/courses`, {
    headers: {
      // Authorization using the access token
      Authorization: `Bearer ${accessToken}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

router.post('/assignments', (req, res) => {
  const courseId = req.body.courseId;
  axios.get(`${apiUrl}/courses/${courseId}/assignments`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Get general user information
router.get('/user-information', (req, res) => {
  // Canvas API url
  axios.get(`${apiUrl}/users/self`, {
    headers: {
      // Authorization using the access token
      Authorization: `Bearer ${accessToken}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Route to get assignments for a course with a user access token
router.post('/coursesWithToken', (req, res) => {
  const accessTokenFE = req.body.accessTokenFE;
  axios.get(`${apiUrl}/courses`, {
    headers: {
      Authorization: `Bearer ${accessTokenFE}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Get all assignments of a course with a user access token
router.post('/assignmentsWithToken', (req, res) => {
  const { courseId, accessTokenFE } = req.body;
  axios.get(`${apiUrl}/courses/${courseId}/assignments`, {
    headers: {
      Authorization: `Bearer ${accessTokenFE}`
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
  const accessTokenFE = req.body.accessTokenFE;
  axios.get(`${apiUrl}/courses/${req.params.courseId}`, {
    headers: {
      Authorization: `Bearer ${accessTokenFE}`
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
  const accessTokenFE = req.body.accessTokenFE;
  axios.get(`${apiUrl}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}`, {
    headers: {
      Authorization: `Bearer ${accessTokenFE}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

module.exports = router;
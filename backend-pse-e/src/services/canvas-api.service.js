// This service communicates with the Canvas API
const express = require('express');
const router = express.Router();

// Require axios for communicating with the canvas api
const axios = require('axios');

// Import authentication functions
const { encryptToken, decryptToken, auth } = require('../middleware/auth');

// Canvas api url (testing environment, the environment we need for this project)
// const apiUrl = 'https://uvadlo-dev.test.instructure.com/api/v1';
// production
const apiUrl = 'https://canvas.uva.nl/api/v1';


// apiUrl for logging in with OAuth2 (without the "/api/v1" part)
const loginApiUrl = 'https://uvadlo-dev.test.instructure.com';

// Developer key variables
const redirectUri = 'https://localhost:5000/';
const { CLIENT_ID } = process.env;
const { CLIENT_SECRET } = process.env;

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

// Get all courses that are relevant (such as not closed)
router.post('/relevant-courses', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params: {
      // Configure how many items are returned maximum
      per_page: 100,
      // Include 'concluded' and 'term' for the courses
      include: ['concluded', 'term']
    }
  }).then(response => {
    // Filter out unrelevant courses. There is a property "concluded", if this
    // is true the course is done and the course is not relevant anymore.
    const relevantCourses = response.data.filter(course => !course.concluded);
    res.json(relevantCourses);
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

// Create assignment (missing deadline attribute)
router.post('/courses/:courseId/assignments', (req, res) => {
  const { courseId } = req.params
  const { assignment, token } = req.body;

  axios.post(`${apiUrl}/courses/${courseId}/assignments`, assignment, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params: {
      "assignment[name]": assignment.name,
      "assignment[description]": assignment.description,
      "assignment[points_possible]": assignment.points_possible,
      "assignment[grading_type]": assignment.grading_type,
      "assignment[submission_types]": ['online_upload'], // written assignment standard
      "assignment[allowed_attempts]": assignment.allowed_attempts,
      "assignment[anonymous_grading]": assignment.anonymous_grading,
      "assignment[omit_from_final_grade]": assignment.omit_from_final_grade,
      "assignment[peer_reviews]": assignment.peer_reviews,
      "assignment[published]": true // immediately publish assignment
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Update assignment (missing deadline attribute)
router.put('/courses/:courseId/assignments/:assignmentId', (req, res) => {
  console.log(req.params);
  const { courseId, assignmentId } = req.params
  const { assignment, token } = req.body;

  axios.put(`${apiUrl}/courses/${courseId}/assignments/${assignmentId}`, assignment, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params: {
      "assignment[name]": assignment.name,
      "assignment[description]": assignment.description,
      "assignment[points_possible]": assignment.points_possible,
      "assignment[grading_type]": assignment.grading_type,
      "assignment[submission_types]": ['online_upload'], // written assignment standard
      "assignment[allowed_attempts]": assignment.allowed_attempts,
      "assignment[anonymous_grading]": assignment.anonymous_grading,
      "assignment[omit_from_final_grade]": assignment.omit_from_final_grade,
      "assignment[peer_reviews]": assignment.peer_reviews,
      "assignment[published]": true // immediately publish assignment
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

// Get an user its submission data for a specific assignment.
router.post('/courses/:courseId/:assignmentId/:userId', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}/submissions/${req.params.userId}`, {
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


// Get one rubric for an assignment with a user access token
// NOTE: the rubricId must be used from the rubric_settings, NOT the rubric object!
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

// Get a user's role for a specific course
// The path is /user/role because otherwise the request does a different one!
router.post('/courses/:courseId/user/role', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses/${req.params.courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    // Return enrollments information
    res.json(response.data.enrollments[0]);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Get a list of students in the course
router.post('/courses/:courseId/users/students', (req, res) => {
  const token = req.body.token;
  axios.get(`${apiUrl}/courses/${req.params.courseId}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params: {
      // Configure how many items are returned maximum
      per_page: 100,
      // Select only students
      enrollment_type: ['student', 'student_view']
    }
  }).then(response => {
    // Return enrollments information
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Route for initiating the login redirect
// Test this by going to this URL in your browser for example: localhost:5000/canvas-api/login
router.get('/login', (req, res) => {
  const authUrl = `${loginApiUrl}/login/oauth2/auth?client_id=${CLIENT_ID}&response_type=code&state=1&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
});
// After the /login request, the FE extracted the code from the URL in the browser
// that can be used to make this request to actually get the user's access-key/token
// NOTE: the code from the /login request can only be used for ONE request, otherwise it will give an error!!
router.post('/get-user-token', (req, res) => {
  axios.post(`${loginApiUrl}/login/oauth2/token`, {}, {
    params: {
      grant_type: `authorization_code`,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: redirectUri,
      code: req.body.code
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});
// Get new user token with refresh token (the refresh token from /get-user-token can be used infinitely!)
router.post('/get-user-token/refresh', (req, res) => {
  axios.post(`${loginApiUrl}/login/oauth2/token`, {}, {
    params: {
      grant_type: `refresh_token`,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: redirectUri,
      refresh_token: req.body.token
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

module.exports = router;
// This service communicates with the Canvas API
const express = require('express');
const router = express.Router();

// Require axios for communicating with the canvas api
const axios = require('axios');

// Import authentication functions
const { encryptToken, decryptToken, auth } = require('../middleware/auth');

// Canvas api URL
const { API_URL } = process.env;
// Login api URL
const { LOGIN_API_URL } = process.env;
// Developer key variables
const { CANVAS_REDIRECT_URI } = process.env;
const { CLIENT_ID } = process.env;
const { CLIENT_SECRET } = process.env;

function errFunCanvas(error) {
  console.log(error);
  if (!error.response.status || !error.response.statusText) {
    return {
      error: 'An error occurred.'
    }
  } else {
    return {
      error: 'An error occurred.',
      status: error.response.status,
      statusText: error.response.statusText
    };
  }
}

// Get general user information (is a post because a get cannot have a body)
router.post('/get-user', auth, (req, res) => {
  const token = req.headers["bearer"];
  // Canvas API url
  axios.get(`${API_URL}/users/self`, {
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
    res.status(500).json(errFunCanvas(error));
  });
});

// Route to get assignments for a course with a user access token
router.post('/courses', auth, (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses`, {
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
    res.status(500).json(errFunCanvas(error));
  });
});

// Get all courses that are relevant (such as not closed)
router.post('/relevant-courses', auth, (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses`, {
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
    res.status(500).json(errFunCanvas(error));
  });
});

// Get all assignments of a course with a user access token
router.post('/assignments', auth, (req, res) => {
  const { courseId, token } = req.body;
  axios.get(`${API_URL}/courses/${courseId}/assignments`, {
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
    res.status(500).json(errFunCanvas(error));
  });
});

// Get all file upload (written) assignments
router.post('/written-assignments', auth, (req, res) => {
  const { courseId, token } = req.body;
  axios.get(`${API_URL}/courses/${courseId}/assignments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params: {
      order_by: "due_at"
    }
  }).then(response => {
    // Filter assignments by submission_types
    res.json(response.data.filter(assignment => {
      return assignment.submission_types.includes("online_upload");
    }));
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json(errFunCanvas(error));
  });
});

// Create assignment (missing deadline attribute)
router.post('/courses/:courseId/assignments', (req, res) => {
  const { courseId } = req.params
  const { assignment, token } = req.body;

  axios.post(`${API_URL}/courses/${courseId}/assignments`, assignment, {
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
      "assignment[published]": true, // immediately publish assignment
      "assignment[due_at]": assignment.due_at
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
  const { courseId, assignmentId } = req.params
  const { assignment, token } = req.body;

  axios.put(`${API_URL}/courses/${courseId}/assignments/${assignmentId}`, assignment, {
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
      "assignment[published]": true, // immediately publish assignment
      "assignment[due_at]": assignment.due_at
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Delete assignment
router.delete('/courses/:courseId/assignments/:assignmentId', (req, res) => {
  const { courseId, assignmentId } = req.params
  const token = req.headers.authorization.split(' ')[1];

  axios.delete(`${API_URL}/courses/${courseId}/assignments/${assignmentId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    // Filter assignments by submission_types
    res.json(response.data.filter(assignment => {
      return assignment.submission_types.includes("online_upload");
    }));
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});

// Get one course with a user access token
router.post('/courses/:courseId', auth, (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json(errFunCanvas(error));
  });
});


// Get all user enrolled in a course without non official users (TestPerson).
router.post('/courses/:courseId/users', (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}/users`, {
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

// Get all users enrolled in a course.
router.post('/courses/:courseId/enrollments', (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}/enrollments`, {
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
router.post('/courses/:courseId/:assignmentId', auth, (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json(errFunCanvas(error));
  });
});

// Get an user its submission data for a specific assignment.
router.post('/courses/:courseId/:assignmentId/:userId', (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}/submissions/${req.params.userId}`, {
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

// Get all submission data for a specific assignment (teacher).
router.post('/courses/:courseId/assignments/:assignmentId/submissions', (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}/assignments/${req.params.assignmentId}/submissions`, {
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
router.post('/courses/:courseId/rubrics/:rubricId', auth, (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}/rubrics/${req.params.rubricId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json(errFunCanvas(error));
  });
});

// Get a user's role for a specific course
// The path is /user/role because otherwise the request does a different one!
router.post('/courses/:courseId/user/role', auth, (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    // Return enrollments information
    res.json(response.data.enrollments[0]);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json(errFunCanvas(error));
  });
});

// Get a list of students in the course
router.post('/courses/:courseId/users/students', auth, (req, res) => {
  const token = req.headers["bearer"];
  axios.get(`${API_URL}/courses/${req.params.courseId}/users`, {
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
    res.status(500).json(errFunCanvas(error));
  });
});

// Route for initiating the login redirect
// Test this by going to this URL in your browser for example: localhost:5000/canvas-api/login
router.get('/login', (req, res) => {
  const authUrl = `${LOGIN_API_URL}/login/oauth2/auth?client_id=${CLIENT_ID}&response_type=code&state=1&redirect_uri=${CANVAS_REDIRECT_URI}`;
  res.redirect(authUrl);
});
// After the /login request, the FE extracted the code from the URL in the browser
// that can be used to make this request to actually get the user's access-key/token
// NOTE: the code from the /login request can only be used for ONE request, otherwise it will give an error!!
router.post('/get-user-token', (req, res) => {
  axios.post(`${LOGIN_API_URL}/login/oauth2/token`, {}, {
    params: {
      grant_type: `authorization_code`,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: CANVAS_REDIRECT_URI,
      code: req.body.code
    }
  }).then(response => {
    // Encrypt tokens
    response.data.access_token = encryptToken(response.data.access_token);
    response.data.refresh_token = encryptToken(response.data.refresh_token);
    // Send back the edited response
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred.' });
  });
});
// Get new user token with refresh token (the refresh token from can be used infinitely!)
router.post('/get-user-token/refresh', (req, res) => {
  axios.post(`${LOGIN_API_URL}/login/oauth2/token`, {}, {
    params: {
      grant_type: `refresh_token`,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: CANVAS_REDIRECT_URI,
      // Decrypt refresh token (no auth because refresh token does NOT retrieve a user)
      refresh_token: decryptToken(req.headers["bearer"])
    }
  }).then(response => {
    // Encrypt tokens
    response.data.access_token = encryptToken(response.data.access_token);
    // Send back the edited response
    res.json(response.data);
  }).catch(error => {
    console.error('Error from Canvas API:', error);
    res.status(500).json({ error: 'An error occurred, refresh token does not exist?' });
  });
});

module.exports = router;
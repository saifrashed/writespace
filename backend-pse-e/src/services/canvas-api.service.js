// This service communicates with the Canvas API
const express = require('express');
const router = express.Router();

// Require axios for communicating with the canvas api
const axios = require('axios');

// Canvas api url (testing environment, the environment we need for this project)
const apiUrl = 'https://uvadlo-dev.test.instructure.com/api/v1';
// apiUrl for logging in with OAuth2 (without the "/api/v1" part)
const loginApiUrl = 'https://uvadlo-dev.test.instructure.com';

// Developer key variables
const redirectUri = 'https://localhost:5000/';
const clientId = '104400000000000219';
const clientSecret = 'JXTauByTlng3ATvTHQ9dLaM9w7GzCle93F2mOanqVcNXzG6eRwn16BGhCCSNP3ks';

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

/*
TODO: see user stories on github board, but this is the main overview:
// get user role for course
// TODO

// Get assignments for a course that are written
// TODO: see assignment returned, probably file uploads

"submission_types": [
            "online_upload"
        ],
Then here something with file upload!

// Upload submission for an assignment, this is a pdf file, contact Alessio for this!
// TODO: Create assignment on canvas
*/


// TODO: use OAuth from Canvas documentation to extract access token?? Use Developer key settings??
// Login request (not done yet, need developer key setup)
// Route for initiating the login redirect
router.get('/login', (req, res) => {
  const authUrl = `${loginApiUrl}/login/oauth2/auth?client_id=${clientId}&response_type=code&state=1&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
});
// TODO: to test this locally: go to this URL in your browser: localhost:5000/canvas-api/login
/*
TODO: after this (now you still get a tab with "Deze site kan geen beveiligde verbinding leveren", but that is because it is not handled
in the FE, but you get the correct URL, with only "code" and "state", so there is no error, it is just because that URL is not handled
in the FE!), you get the code and state in the frontend in the webbrowser, then the FE needs to send a request with the 
received "code" and "state" to the backend to retrieve the user's access token!

TODO: So, discuss with Saif and/or Devran how the FE can extract that from the URL to send the following request in the BE to 
get the user access-key/token!
*/
// After the /login request, the FE extracted the code and state from the URL in the browser
// that can be used to make this request to actually get the user's access-key/token 
router.post('/get-user-token', (req, res) => {
  axios.post(`${loginApiUrl}/login/oauth2/token`, {}, {
    params: {
      grant_type: `authorization_code`,
      client_id: clientId,
      client_secret: clientSecret,
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

// 

// API: gebruiker logt in op jou tool, authoriseert dingen in canvas. Alles wat de gebruiker kan.
// TODO: wij willen de API aparte website en met uva account login, dus de API.
// API developer key wordt aangemaakt voor ons. Simpeler om te implementeren.
// OIDC OAuth login. 
/*
Developer key wordt aangemaakt voor ons door Gerrit.
Daarvoor heeft hij nodig 1 of meer redirect URLs, waar canvas terug naar redirect na een geslaagde login. 
Canvas stuurt die gegevens dan naar ons toe, naar die endpoint, 
of een accessToken of een code waarmee je die accesstoken kan opvragen, maar dit staat wel in de documentatie van de canvas api.

Daarna zou het moeten werken, met die key (vmg cliendId en ClientSecret).


Flow:
1. GET https://uvadlo-dev.test.instructure.com/login/oauth2/auth?client_id=<clientIdFromGerrit>&response_type=code&state=<Number, such as 1>&redirect_uri=<What I Sent to Gerrit, can be any>
2. In the response it sends a code and state, the code can be used to ask the access token of the user.
  You get the access token and the refresh token, the access token expires after an hour. If you want a new one you can use the refresh token.
3. Step 3 needs to happen server side because the secret is sent with it. grant_type is just the string "authorization_code"

Test omgeving wordt elke maand leeggegooit, 1x per maand. Dan moet het opnieuw geconfigureerd worden.
*/

module.exports = router;
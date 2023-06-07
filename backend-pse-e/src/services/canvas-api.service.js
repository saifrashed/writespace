// This service communicates with the Canvas API
const express = require('express');
const router = express.Router();

// Require axios for communicating with the canvas api
const axios = require('axios');

// Canvas api url
const apiUrl = 'https://canvas.uva.nl/api/v1';
// Change this access token every time for different users!
// See Canvas_API document in discord on how to get an access token
const accessToken = '10392~qSVcCb3DoNHbTt2luk1QS88w2tvzUsmfFjEXqVOm65zgz6GLXpvr7SIG2dJJYNNo';
// TODO: use OAuth from Canvas documentation to extract access token?? Use Developer key settings??

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

// Login request (not done yet, need developer key setup)
// router.get('/login', (req, res) => {
//     const queryParams = new URLSearchParams({
//       client_id: YOUR_CLIENT_ID,
//       response_type: 'code',
//       redirect_uri: YOUR_REDIRECT_URI
//     });
  
//     const loginUrl = `${apiUrl}/login/oauth2/auth?${queryParams}`;
  
//     res.redirect(loginUrl);
// });

module.exports = router;
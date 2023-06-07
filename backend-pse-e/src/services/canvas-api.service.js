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

module.exports = router;
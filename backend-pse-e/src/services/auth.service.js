// Import the router with express to do requests
const express = require('express');
const router = express.Router();
// Require axios for communicating with the canvas api
const axios = require('axios');

// Authentication
const { encryptToken, decryptToken} = require('../middleware/auth');

// Login api URL
const { LOGIN_API_URL } = process.env;
// Developer key variables
const { CANVAS_REDIRECT_URI } = process.env;
const { CLIENT_ID } = process.env;
const { CLIENT_SECRET } = process.env;

// Route for initiating the login redirect
// Test this by going to this URL in your browser for example: localhost:5000/canvas-api/login
router.get('/login', (req, res) => {
    const authUrl = `${LOGIN_API_URL}/login/oauth2/auth?client_id=${CLIENT_ID}&response_type=code&state=1&redirect_uri=${CANVAS_REDIRECT_URI}`;
    res.redirect(authUrl);
});
// After the /login request, the FE extracted the code from the URL in the browser
// that can be used to make this request to actually get the user's access-key/token
// NOTE: the code from the /login request can only be used for ONE request, otherwise it will give an error!!
router.post('/get-user-token', async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.post(`${LOGIN_API_URL}/login/oauth2/token`, {}, {
            params: {
                grant_type: `authorization_code`,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: CANVAS_REDIRECT_URI,
                code: req.body.code
            }
        });
        // Encrypt tokens
        response.data.access_token = encryptToken(response.data.access_token);
        response.data.refresh_token = encryptToken(response.data.refresh_token);
        // Send back the edited response
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /get-user-token.' });
    }
});
// Get new user token with refresh token (the refresh token from can be used infinitely!)
router.post('/get-user-token/refresh', async (req, res) => {
    try {
        // Canvas API url
        const response = await axios.post(`${LOGIN_API_URL}/login/oauth2/token`, {}, {
            params: {
                grant_type: `refresh_token`,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: CANVAS_REDIRECT_URI,
                // Decrypt refresh token (no auth because refresh token does NOT retrieve a user)
                refresh_token: decryptToken(req.headers["bearer"])
            }
        });
        // Encrypt tokens
        response.data.access_token = encryptToken(response.data.access_token);
        // Send back the edited response
        res.json(response.data);
    } catch (error) {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred in /get-user-token/refresh.' });
    }
});

// Export requests with the router variable
module.exports = router;
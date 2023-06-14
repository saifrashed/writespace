// Encryt and decrypt functions
const CryptoJS = require('crypto-js');
require('dotenv').config(); // Load environment variables from .env file
const axios = require('axios');
// Canvas apiUrl
const { apiUrl } = require('../services/canvas-api.service.js');

function encryptToken(token) {
    const clientSecret = process.env.CLIENT_SECRET; // Retrieve client secret from .env file
    const encryptedToken = CryptoJS.AES.encrypt(token, clientSecret).toString();
    return encryptedToken;
}

const decryptToken = (encryptedToken) => {
    const clientSecret = process.env.CLIENT_SECRET; // Retrieve client secret from .env file
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, clientSecret);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
}

const auth = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        // Decrypt the token
        const decryptedToken = decryptToken(token);

        // Check if the user exists
        // axios.get(`${apiUrl}/users/self`, {
        //     headers: {
        //         // Authorization using the access token
        //         Authorization: `Bearer ${decryptedToken}`
        //     }
        // }).then(response => {
        //     console.log(response);
        //     // Edit the request body with the new values if the user is valid
        //     req.body.token = decryptedToken;
        //     // Put the userId of the user with the access token in the body
        //     // req.body.userId = userId;
        // }).catch(error => {
        //     // User does not exist or something went wrong
        //     return res.status(403).send("User does not exist");
        // });
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    // Continue to the next the next middleware function in the request-response cycle.
    return next();
};

module.exports = {
    encryptToken,
    decryptToken,
    auth
};
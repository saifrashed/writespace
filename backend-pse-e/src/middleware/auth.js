// Encryt and decrypt functions
const CryptoJS = require('crypto-js');
require('dotenv').config(); // Load environment variables from .env file
const axios = require('axios');
// Canvas apiUrl
const { API_URL } = process.env;

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

// This is the authentication function for the canvas-api requests. This is a bit 
// different because the canvas-api has its own authentication, this is just decryption
const authCanvas = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        // Decrypt the token
        const decryptedToken = decryptToken(token);
        // Edit the body by adding the decrypted token
        req.body.token = decryptedToken;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    // Continue to the next the next middleware function in the request-response cycle.
    return next();
};

// This is the authentication for all of our own requests. The canvas api has its own
// authentication, so you cannot do another request since it already gives an error.
const auth = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        // Decrypt the token
        const decryptedToken = decryptToken(token);
        let userNotFound = false;

        // Check if the user exists in canvas
        axios.get(`${API_URL}/users/self`, {
            headers: {
                // Authorization using the access token
                Authorization: `Bearer ${decryptedToken}`
            }
        }).then(response => {
            console.log("*******************************************************************************");
            console.log(response.data);
            // Edit the request body with the new values if the user is valid.
            req.body.token = decryptedToken;
            // Put the userId of the user with the access token in the body so that 
            // the request can use the userId of the canvas account
            req.body.userId = userId;
        }).catch(error => {
            console.log("ERROR!!!*******************************************************************************");
            // User not found, so set boolean to true
            userNotFound = true;
        });
        // If the user is not found return this status (done outside the axios)
        // otherwise, it recognizes it as the axios header and it will crash!
        if (userNotFound) {
            return res.status(404).send("User not found or token expired");
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    // Continue to the next the next middleware function in the request-response cycle.
    return next();
};

module.exports = {
    encryptToken,
    decryptToken,
    authCanvas,
    auth
};
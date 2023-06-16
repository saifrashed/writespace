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
    // Get the token from the body or header
    const token =
        req.body.token || req.headers["bearer"];

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
// GET requests have the token in the header, all other requests have the token in the body!
const auth = async (req, res, next) => {
    // Get the token from the header (or body, but every token should be in the header!)
    const token =
        req.headers["bearer"] || req.body.token;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        // Decrypt the token
        const decryptedToken = decryptToken(token);
        // let userNotFound = false;

        // Check if the user exists in canvas (await to first do this before the request)
        // TODO: change to try-catch
        try {
            const response = await axios.get(`${API_URL}/users/self`, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            });
            // Edit the request body with the new values if the user is valid.
            console.log(req.headers.bearer);
            console.log(req.headers["bearer"]);
            req.headers["bearer"] = decryptedToken;
            // Put the id of the user in the response
            res.locals.userId = response.data.id;
            console.log(res.locals.userId);
            
            // console.log("*******************************************************************");
            // console.log(response);

        } catch (err) {
            return res.status(404).send("User not found or token expired");
        }
        

        // const response = await axios.get(`${API_URL}/users/self`, {
        //     headers: {
        //         // Authorization using the access token
        //         Authorization: `Bearer ${decryptedToken}`
        //     }
        // }).then(response => {

        // }).catch(error => {
        //     // User not found, so set boolean to true
        //     userNotFound = true;
        // });
        // // If the user is not found return this status (done outside the axios)
        // // otherwise, it recognizes it as the axios header and it will crash!
        // if (userNotFound) {
        //     return res.status(404).send("User not found or token expired");
        // }
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

// TODO: check if it can be in one auth function.
/*
TODO: put the userId in the response: res.locals
res.headers(bearer) = decryptedToken.

TODO: update everything: the token needs to be in the header for every request, so ALL requests!

TODO: first change all canvas-api to try-catch and token from header (not token variable, but req.headers.bearer), 
    then test everything in postman if the try-catch still works.
    Then remove canvas-api and paste every request in the correct service, such as users.


TODO: in backend chat
1. Try catch, await and async gebruiken (geen .then/catch gebruiken)
2. Routes GEEN camalCase, doel moet duidelijk zijn: user-create, not userCreate.
    NOT: user/:courseId/:assignmentId. Dit wordt een POST met dit in de body.
3. Canvas-api wordt verwijderd, alles van assignments komt in de assignments service, alles van users komt in user service.
4. Try-catch van alle requests wordt 400 voor een error en 200 bij success.
*/


// TODO: add "auth" to all other requests in the BE and FE needs to add header (bearer) in get requests and body token for others, ask Saif or Devran!
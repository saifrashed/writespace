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

// Authentication function
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

        // Check if the user exists in canvas (await to first do this before the request)
        try {
            const response = await axios.get(`${API_URL}/users/self`, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            });
            // Edit the request body with the new values if the user is valid.
            req.headers["bearer"] = decryptedToken;
            // Put the id of the user in the response
            res.locals.userId = response.data.id;
        } catch (error) {
            console.log(error);
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
    auth
};

/*
TODO: export postman into project and send to everyone in discord.

TODO: in backend chat dit zeggen met @everyone
1. Try catch, await and async gebruiken (geen .then/catch gebruiken)
2. Routes GEEN camalCase, doel moet duidelijk zijn: user-create, not userCreate.
    NOT: user/:courseId/:assignmentId. Dit wordt een POST met dit in de body.
3. Canvas-api wordt verwijderd, alles van assignments komt in de assignments service, alles van users komt in user service.
4. Try-catch van alle requests wordt 400 voor een error en 200 bij success.
5. Ik heb bij alle bestaande requests authenticatie toegevoegt en getest daarna, 
    als iets niet werkt of als ik iets gemist hebt laat het me vooral weten dan zal ik ernaar kijken.
*/
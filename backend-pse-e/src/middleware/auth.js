// Encryt and decrypt functions
const CryptoJS = require('crypto-js');
require('dotenv').config(); // Load environment variables from .env file

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
        const decoded = decryptToken(token);
        req.body.token = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = {
    encryptToken,
    decryptToken,
    auth
};
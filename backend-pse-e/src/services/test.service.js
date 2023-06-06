// Test service, services handle everything with requests in the BE
// Import the router with express to do requests
const express = require('express');
const router = express.Router();

// Database connection
//require("./config/databaseConfig").connect();

// Import models for this service (../ goes up one directory)
const TestModel = require("../models/test.model.js");

// ************************* Requests for this service *************************
// Define a route without the starting route defined in app.js
// Get request (gets something from the db)
router.get("/get", (req, res) => {
    res.status(200).json('Welcome to /test requests')
});

// Post request (creates something in the db)
router.post('/save', (req, res) => {
    var test = new TestModel();
    test.username = req.body.username;
    test.testId = req.body.testId;

    test.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// Export requests with the router variable
module.exports = router;
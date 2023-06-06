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
router.post('/save', async (req, res) => {
    try {
        const username = req.body.username;
        const testId = req.body.testId;
    
        // Create a new instance of the TestModel
        const newTest = new TestModel({
            username,
            test: {
              testId
            }
        });
    
        // Save the newTest instance to the database
        const savedTest = await newTest.save();
        
        // Send the savedTest object back in json form
        res.status(200).json(savedTest);
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to the database' });
    }
});

// Export requests with the router variable
module.exports = router;
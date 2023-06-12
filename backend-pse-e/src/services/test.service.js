// Test service, services handle everything with requests in the BE

// ************************* This can be coppied for every new service *************************
// Import the router with express to do requests
const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');
// ************************* This can be coppied for every new service *************************

// ************************* Copy and change this with the model you added *************************
// Import models for this service (../ goes up one directory)
const TestModel = require('../models/test.model.js');
// ************************* Copy and change this with the model you added *************************

// ************************* Requests for this service (examples below) *************************
// Define a route without the starting route defined in app.js

// Get request (gets something from the db)
router.get('/getAll', async (req, res) => {
  try {
    // Find all tests
    const tests = await TestModel.find();
    // Return them in json form
    res.status(200).json(tests);
  } catch (error) {
    console.error('Error from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// This gets one test with an ObjectId from MongoDB
router.get('/findByTestId/:testId', async (req, res) => {
  try {
    // Find the object using an attribute of the object
    const test = await TestModel.find({ 'test.testId': req.params.testId });
    // If the object is not fount give an error
    if (test.length === 0) {
      return res.status(404).json({ error: 'Object not found' });
    }

    // Handle success case here
    res.status(200).json(test);
  } catch (error) {
    console.error('Error from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Post request (creates something in the db)
router.post('/save', async (req, res) => {
  try {
    // Variables for the model
    const { username } = req.body;
    const { testId } = req.body;

    // Create a new instance of the TestModel
    const newTest = new TestModel({
      username,
      test: {
        testId,
      },
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

// PUT request (updates something in the db)
router.put('/update/:testId', async (req, res) => {
  try {
    const { testId } = req.params;
    const updatedTest = {
      username: req.body.username,
      test: {
        testId: req.body.testId,
      },
    };

    // Find the existing test by testId and update it
    const result = await TestModel.updateOne(
      { 'test.testId': testId },
      { $set: updatedTest },
    );

    // Check if the test was found and updated successfully
    if (result.nModified === 0) {
      return res.status(404).json({ error: 'Object not found' });
    }

    res.status(200).json({ message: 'Test updated successfully' });
  } catch (error) {
    console.error('Error updating data in MongoDB:', error);
    res.status(500).json({ error: 'Failed to update data in the database' });
  }
});

// DELETE request (deletes something from the db)
router.delete('/delete/:testId', async (req, res) => {
  try {
    const { testId } = req.params;

    // Find the document by testId and remove it
    const result = await TestModel.deleteOne({ 'test.testId': testId });

    // Check if the document was found and deleted successfully
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Object not found' });
    }

    // Delete successful
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to delete data from the database' });
  }
});

// ************************* This needs to stay the same for every service, you are exporting the requests with the router variable *************************
// Export requests with the router variable
module.exports = router;

/*
*****************************************************************************************************************************
Example Postman collection to test the test model can be found in the root folder of the backend-pse-e directory.
Import this in Postman using the import button, this is a file, so import it as a file, and then you can use
that collection to test and make new requests based on these requests in Postman to test your requests.
*****************************************************************************************************************************
*/

// Test database model
const mongoose = require("mongoose");
const testModel = new mongoose.Schema({
    username: String,
    // This is an Object in an Object, so an Object as an attribute
    test: {
        testId: Number
    }
});

// Export the database model for MongoDB
module.exports = mongoose.model("test", testModel);
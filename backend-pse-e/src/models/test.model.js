// Test database model
const mongoose = require("mongoose");
const testModel = new mongoose.Schema({
    username: String,
    test: {
        testId: Number
    }
});

// Export the database model for MongoDB
module.exports = mongoose.model("test", testModel);
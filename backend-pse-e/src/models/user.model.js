const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    userId: String,
    experiencePoints: Number,
    level: Number,
});

// Export the database model for MongoDB
module.exports = mongoose.model("user", userModel);



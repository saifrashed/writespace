const mongoose = require("mongoose");

const badgeModel = new mongoose.Schema({
    badgeId: Number,
    experiencePoints: Number,
    name: String,
    category: String,
    description: String,
});

// Export the database model for MongoDB
module.exports = mongoose.model("badge", badgeModel);


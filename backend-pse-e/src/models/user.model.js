const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
    badgeId: Number,
    courseId: Number,
    assignmentId: Number,
    graderId: Number,
    comment: String
  });

const userModel = new mongoose.Schema({
    userId: Number,
    pictureId: Number,
    experiencePoints: Number,
    badges: [badgeSchema],
  });

// Export the database model for MongoDB
module.exports = mongoose.model("user", userModel);



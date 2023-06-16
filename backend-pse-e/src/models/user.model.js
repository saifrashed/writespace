const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
    courseId: Number,
    assignmentId: Number,
    graderId: Number,
    comment: String
  });

const userModel = new mongoose.Schema({
    userId: Number,
    pictureId: Number,
    experiencePoints: Number,
    level: Number,
    badges: {
      type: Map,
      of: [{
        amount: Number,
        badgelist: [badgeSchema]
      }]
    }
  });

// Export the database model for MongoDB
module.exports = mongoose.model("user", userModel);



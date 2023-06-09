const mongoose = require("mongoose");

const assignmentModel = new mongoose.Schema({
    assignmentId: Number,
    courseId: Number,
    creatorId: Number,
    name: String,
    description: String,
    deadline: Date,
    availableAt: Date,
    maxPoints: Number,
    rubric : [{ criterium: String, description: String, points: Number }],
});

// Export the database model for MongoDB
module.exports = mongoose.model("assignment", assignmentModel);

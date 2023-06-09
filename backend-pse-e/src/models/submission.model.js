const mongoose = require("mongoose");

const submissionModel = new mongoose.Schema({
    userId: Number,
    userName: String,
    assignmentId: Number,
    courseId: Number,
    date: Date,
    grade: Number,
    status: String,
    filetype: String,
    filename: String,
    fileData: Buffer, // Field to store file data
    fileNotes: [Object]
});

// Export the database model for MongoDB
module.exports = mongoose.model("submission", submissionModel);
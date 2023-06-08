const mongoose = require("mongoose");

const submissionModel = new mongoose.Schema({
    userId: String,
    assignmentId: String,
    submissionDate: Date,
    submissionGrade: Number,
    submissionStatus: String,
    filetype: String,
    filename: String,
    fileData: Buffer, // Field to store file data
});

// Export the database model for MongoDB
module.exports = mongoose.model("submission", submissionModel);
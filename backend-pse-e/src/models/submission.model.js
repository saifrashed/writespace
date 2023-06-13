const mongoose = require("mongoose");

const submissionModel = new mongoose.Schema({
    userId: Number,
    assignmentId: Number,
    submissionDate: Date,
    submissionGrade: Number,
    submissionWhatifGrade: Number,
    submissionStatus: String,
    filetype: String,
    filename: String,
    fileData: Buffer, // Field to store file data
});

// Export the database model for MongoDB
module.exports = mongoose.model("submission", submissionModel);
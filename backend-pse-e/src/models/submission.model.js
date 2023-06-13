const mongoose = require("mongoose");

const submissionModel = new mongoose.Schema({
    userId: String,
    assignmentId: String,
    submissionDate: Date,
    submissionGrade: Number,
    submissionWhatifGrade: Number,
    submissionStatus: String,
    filetype: String,
    filename: String,
    fileData: Buffer, // Field to store file data
    fileNotes: [Object]
});

// Export the database model for MongoDB
module.exports = mongoose.model("submission", submissionModel);
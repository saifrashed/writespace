const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    type: String,
    correctAnswer: String,
    choices: [String]
});

const quizModel = new mongoose.Schema({
    quizId: Number,
    topic: String,
    experiencePoints: Number,
    questions: [questionSchema]
});

// Export the database model for MongoDB
module.exports = mongoose.model("quiz", quizModel);

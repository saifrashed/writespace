const mongoose = require("mongoose");

const quizScoreModel = new mongoose.Schema({
    quizId: Number,
    userId: Number,
    latestScore: Number,
    highScore: Number
});

// Export the database model for MongoDB
module.exports = mongoose.model("quiz", quizScoreModel);

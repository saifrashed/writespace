const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  port: process.env.PORT,
};

require('dotenv').config();

// Database connection
const database = require('./config/databaseConfig');

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

// Import ObjectId from MongoDB
require('mongodb');

const app = express();

// Cross origin resource sharing
app.use(cors(corsOptions));
// Express

app.use(express.json())
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Function to initialize services after database connection
async function init() {
    try {
        // Connect to the database
        await database.connect();

        // ************************* Add new services here *************************
        // Import services here
        const submissionService = require('./services/submission.service.js');
        const userService = require('./services/user.service.js');
        const quizService = require('./services/quiz.service.js');
        const quizScoreService = require('./services/quiz-score.service.js');
        const assignmentService = require('./services/assignment.service.js');
        const badgeService = require('./services/badge.service.js');
        const authService = require('./services/auth.service.js');
        const courseService = require('./services/course.service.js');
        // Define new routes here with the start route
        app.use('/submission', submissionService);
        app.use('/user', userService);
        app.use('/quiz', quizService);
        app.use('/quiz-score', quizScoreService);
        app.use('/assignment', assignmentService);
        app.use('/badge', badgeService);
        app.use('/auth', authService);
        app.use('/course', courseService);

        // ************************* General requests *************************
        app.get('/', (req, res) => {
          res.status(200).json('Welcome to PSE-E Api');
        });

        // Every other route. This should be the last route else it won't work
        app.use('*', (req, res) => {
          res.status(404).json({
            success: 'false',
            message: 'Page not found',
            error: {
              statusCode: 404,
              message: 'This route is not defined',
            },
          });
        });
    } catch(err) {
      console.error("Failed to start application", err);
      process.exit(1);
    }
}

// Call the init function to start the application after database connection
init();

module.exports = app;

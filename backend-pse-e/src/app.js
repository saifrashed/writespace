const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  port: process.env.PORT,
};

require('dotenv').config();

// Database connection
require('./config/databaseConfig').connect();

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

// Import ObjectId from MongoDB
const { ObjectId } = require('mongodb');

const app = express();

// Cross origin resource sharing
app.use(cors(corsOptions));
// Express

app.use(express.json())
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


// ************************* Add new services here *************************
// Import services here
const testService = require('./services/test.service.js');
const submissionService = require('./services/submission.service.js');
const userService = require('./services/user.service.js');
const quizScoreService = require('./services/quizScore.service.js');
const assignmentService = require('./services/assignment.service.js');
// Define new routes here with the start route
app.use('/test', testService);
app.use('/submission', submissionService);
app.use('/user', userService);
app.use('/quizScore', quizScoreService);
app.use('/assignment', assignmentService);
const canvasService = require('./services/canvas-api.service.js');
// Define new routes here with the start route
app.use('/test', testService);
app.use('/canvas-api', canvasService);

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

module.exports = app;

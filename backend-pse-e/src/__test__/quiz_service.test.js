const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const quizModel = require('../services/quiz.service'); // change the path as needed
const Quiz = require('../models/quiz.model');



// Mocks the auth middelware such that canvas api interaction is not needed
// Sets user id to 2
jest.mock('../middleware/auth', () => ({
  auth: (req, res, next) => {
  res.locals.userId = 2;
  next();}
}));


const app = express();
app.use(express.json());
app.use('/', quizModel);

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Test the quiz service', () => {
    test('It should create a quiz on POST /save', async () => {
        const quizDetails = {
            quizId: 123,
            topic: "testQuiz",
            experiencePoints: 0,
            questions: [],
        };
        const response = await request(app).post('/save').send(quizDetails);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Quiz saved');
        });

    test('It should get all quizzes on GET /get-all', async () => {    
        const response = await request(app).get('/get-all');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].quizId).toBe(123);
      });
    
    test("It should delete a quiz on DELETE /delete", async () => {
        const response = await request(app).delete('/delete/123');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Quiz deleted successfully');
        const check = await Quiz.findOne({quizId: 123});
        expect(check).toBe(null);
      });
    });


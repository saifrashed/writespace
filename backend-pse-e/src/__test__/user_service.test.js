const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userService = require('../services/user.service.js'); // change the path as needed
const User = require('../models/user.model');



// Mocks the auth middelware such that canvas api interaction is not needed
// Sets user id to 2
jest.mock('../middleware/auth', () => ({
  auth: (req, res, next) => {
  res.locals.userId = 2;
  next();}
}));


const app = express();
app.use(express.json());
app.use('/', userService);

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

describe('Test the user service', () => {
    test('It should get all users on GET /get-all', async () => {
        const testUser = new User({
          userId: 123,
          pictureId: 0,
          experiencePoints: 0,
          badges: [],
        });
        await testUser.save();
    
        const response = await request(app).get('/get-all');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].userId).toBe(123);
      });
    
    test('It should create a user on POST /save', async () => {
        const response = await request(app).post('/save')
        expect(response.statusCode).toBe(200);
        expect(response.body.userId).toBe(2); 
      });

    test('It should not create a user with an existing userId on POST /save', async () => {
        const response = await request(app).post('/save');
        expect(response.statusCode).toBe(409);
        expect(response.body.error).toBe('You cant have two users with the same Id');
      });

    test('It should update the user picture on PUT /update/picture', async () => {
        const response = await request(app).put('/update/picture').send({pictureId: 1});
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User updated successfully'); 
        const responseMongo = await User.find({ 'userId': 2});
        expect(responseMongo[0].pictureId).toBe(1);
      });
    test('It should update the user experience points on PUT /update/experience-points', async () => {
        const response = await request(app).put('/update/experience-points').send({experiencePoints: 1});
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User updated successfully'); 
        const responseMongo = await User.find({ 'userId': 2});
        expect(responseMongo[0].experiencePoints).toBe(1);
      });
    test('It should update the user badges on PUT /update/badges', async () => {
        const badge = {
            badges: [1,],
            courseId: 101,
            assignmentId: 201,
            comment: 'Great work!',
        };
        const response = await request(app).put('/update/add-badges/').send(badge);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User updated successfully'); 
      });
    test("It should delete the badge from the user's badges on PUT /update/delete-badge", async () => {
        const badge = {
            badgeId: 1,
            courseId: 101,
            assignmentId: 201,
            comment: 'Great work!',
        };
        const response = await request(app).put('/update/delete-badge/').send(badge);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Badge removed successfully'); 
      });
    test("should not find the badge to delete on PUT /update/delete-badge", async () => {
        const badge = {
            badgeId: 1,
            courseId: 101,
            assignmentId: 201,
            graderId: 301,
            comment: 'Great work!',
        };
        const response = await request(app).put('/update/delete-badge/').send(badge);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Badge not found'); 
      });
    });


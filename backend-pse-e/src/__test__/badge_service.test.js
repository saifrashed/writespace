const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const badgeService = require('../services/badge.service.js');
const Badge = require('../models/badge.model.js');
const encryptedToken = 'mockToken123';

// Mock the auth middleware
jest.mock('../middleware/auth', () => ({
  auth: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use('/', badgeService);

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

describe("Badge Service", () => {
  it('should fetch all badges', async () => {
    const res = await request(app)
      .get('/get-all')
      .send();
    
    expect(res.statusCode).toEqual(200);
  });

  test('should get a badge by Id', async () => {
    const badge = new Badge({ badgeId: 12345, experiencePoints: 10, name: 'badge1', category: 'cat1', description: 'desc1' });
    await badge.save();

    const res = await request(app)
    .get(`/get-badge/${badge.badgeId}`)
    .set("bearer", encryptedToken);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('badgeId');
    expect(res.body[0].badgeId).toBe(badge.badgeId);
});

test('should save a badge', async () => {
    const badgeData = { badgeId: 12355, experiencePoints: 10, name: 'badge2', category: 'cat2', description: 'desc2' };
    const res = await request(app)
      .post('/save')
      .send(badgeData);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.badgeId).toEqual(badgeData.badgeId);
  });

  test('should update a badge experience points', async () => {
    const badge = new Badge({ badgeId: 333, experiencePoints: 10, name: 'badge3', category: 'cat3', description: 'desc3' });
    await badge.save();

    const updatedExp = 20;
    const res = await request(app)
      .put('/update/experience-points/')
      .send({ badgeId: badge.badgeId, experiencePoints: updatedExp });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Badge updated successfully');
  });

  test('should update a badge details', async () => {
    const badge = new Badge({ badgeId: 4444, experiencePoints: 10, name: 'badge4', category: 'cat4', description: 'desc4' });
    await badge.save();

    const updatedName = 'updatedName';
    const updatedCategory = 'updatedCategory';
    const updatedDescription = 'updatedDescription';
    const res = await request(app)
      .put('/update/details/')
      .send({ badgeId: badge.badgeId, name: updatedName, category: updatedCategory, description: updatedDescription });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Badge updated successfully');
  });

  test('should delete a badge', async () => {
    const badge = new Badge({ badgeId: 5555, experiencePoints: 10, name: 'badge5', category: 'cat5', description: 'desc5' });
    await badge.save();

    const res = await request(app)
      .delete(`/delete/${badge.badgeId}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Badge deleted successfully');
  });
});

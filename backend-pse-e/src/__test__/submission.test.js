// const path = require('path');
// const filePath = path.join(__dirname, 'testFile.txt');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const submissionService = require('../services/submission.service.js'); // change the path as needed
// const Submission = require('../models/submission.model');
// const fs = require('fs');


// Mocks the auth middelware such that canvas api interaction is not needed
// Sets user id to 2
jest.mock('../middleware/auth', () => ({
  auth: (req, res, next) => {
  res.locals.userId = 123;
  res.locals.user = {
    name: "test",
    userId: 123,
  }
  next();}
}));


const app = express();
app.use(express.json());
app.use('/', submissionService);

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

describe('Test the submission service', () => {
    // test("it should save a submission on POST /save", async () => {
    //   const response = await request(app)
    //   .post("/save")
    //   // .field('userId', '123')
    //   .field('assignmentId', '0')
    //   .attach('file', fs.readFileSync(filePath), 'testFile.txt');
    //   expect(response.statusCode).toBe(200);
    // });

    // test('It should get all submission on GET /get-all', async () => {
    //     // const testSubmission = new Submission({
    //     //   userId: 123,
    //     //   assignmentId: 0,
    //     //   grade: 10,
    //     // });
    //     // await testSubmission.save();
    
    //     const response = await request(app).get('/get-all');
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.length).toBe(1);
    //     expect(response.body[0].userId).toBe(123);
    //   });

      // test("It /get-submissions/:subId should return all submissions for the assignmentId", async () => {
      //   const response = await request(app).get("/get-submissions/0");
      //   expect(response.statusCode).toBe(200);
      //   expect(response.body[0].userId).toBe(123);
      // });

      test("it should not find any submissions for an assignmentId that does not exist", async () => {
        const response = await request(app).get("/get-submissions/1");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
      });
      
      // test("get-submission should return all submissions for the userId", async () => {
      //   const headers = {
      //     assignmentId: 0,
      //   }
      //   const response = await request(app).post("/get-submission").send(headers);
      //   expect(response.statusCode).toBe(200);
      //   expect(response.body[0].userId).toBe(123);
      // });

    //   test("it should not find any submissions for a userId that does not exist", async () => {
    //     const response = await request(app).get("/find-by-user-id/1");
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.message).toBe("Object not found");
    //   });

    //   test("it should find specific submision /find-specific-submission/ ", async () => {
    //     const response = await request(app).get("/find-specific-submission?userId=123&assignmentId=0");
    //     expect(response.statusCode).toBe(200);
    //   });
            
    //   test("It should add notes /update/fileNotes", async () => {
    //     const details = {
    //       notes: [{test: "test"}],
    //       grade: 10,
    //       userId: 123,
    //       assignmentId: 0,
    //     };
    //     const response = await request(app)
    //     .put("/update/fileNotes/")
    //     .send(details);
    //     expect(response.statusCode).toBe(200);
    //     const check = await Submission.findOne({userId: 123, assignmentId: 0});
    //     expect(check.fileNotes[0].test).toBe("test");
    //   });

      // test("It should update grade grade", async () => {
      //   const details = {
      //     grade: 20,
      //     userId: 123,
      //     assignmentId: 0,
      //     notes: ["test", ]
      //   };
      //   const response = await request(app)
      //   .put("/grade/")
      //   .send(details);
      //   expect(response.statusCode).toBe(200);
      //   expect(response.body.message).toBe("Submission updated successfully");
      //   const check = await Submission.findOne({userId: 123, assignmentId: 0});
      //   expect(check.grade).toBe(20);
      // });

    //   test("It should update a submission /update/file", async () => {
    //     const response = await request(app)
    //     .put("/update/file")
    //     .field('userId', '123')
    //     .field('assignmentId', '0')
    //     .attach('file', fs.readFileSync(filePath), 'testFile.txt');
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.message).toBe("Submission updated successfully");
    //   });

    //   test("It should delete a submission /delete-one", async () => {
    //     const response = await request(app)
    //     .delete("/delete-one")
    //     .send({userId: 123, assignmentId: 0});
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.message).toBe("Submission deleted successfully");
    //     const check = await Submission.findOne({userId: 123, assignmentId: 0});
    //     expect(check).toBe(null);
    //   });
    });
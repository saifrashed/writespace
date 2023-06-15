const http = require("http");
const mongoose = require('mongoose');
// Import app.js
const app = require("../app");
// Create the server using http

// Set the port for the server


const request = require('supertest');

describe('Server endpoints', () => {
  let server;
  let server2;

  beforeAll(async() => {
    server = http.createServer(app);
    const { API_PORT } = process.env;
    const port = process.env.PORT || API_PORT;
    server2 = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });

  afterAll((done) => {
    server2.close(done);
    mongoose.connection.close();
    done();
  });

  it('should respond with 200 and "Hello World" for the root path', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toBe('Welcome to PSE-E Api');
  });

  it('should respond with 404 and "404 Not Found" for unknown paths', async () => {
    const response = await request(server).get('/unknown');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "This route is not defined",
        },
    });
  });
});



// const request = require('supertest');
// const express = require('express');
// const submissionService = require('./submissionService');

// // Create an instance of the Express application

// describe('Submission Service', () => {
//   let testSubmissionId;

//   test('GET /submissions/getAll should return all submissions', async () => {
//     const response = await request(app).get('/submissions/getAll');
//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//     expect(Array.isArray(response.body)).toBe(true);
//   });

//   test('POST /submissions/save should create a new submission', async () => {
//     const newSubmission = {
//       userId: 'user123',
//       assignmentId: 'assignment456',
//     };

//     const response = await request(app)
//       .post('/submissions/save')
//       .attach('file', './test/testfile.txt')
//       .field(newSubmission);

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//     expect(response.body.userId).toBe(newSubmission.userId);
//     expect(response.body.assignmentId).toBe(newSubmission.assignmentId);

//     testSubmissionId = response.body._id;
//   });

//   test('GET /submissions/findSpecificSubmission should find a specific submission', async () => {
//     const queryParams = {
//       userId: 'user123',
//       assignmentId: 'assignment456',
//     };

//     const response = await request(app)
//       .get('/submissions/findSpecificSubmission')
//       .query(queryParams);

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBe(1);
//     expect(response.body[0]._id).toBe(testSubmissionId);
//     expect(response.body[0].userId).toBe(queryParams.userId);
//     expect(response.body[0].assignmentId).toBe(queryParams.assignmentId);
//   });

//   test('PUT /submissions/update/grade should update the grade of a submission', async () => {
//     const updatedSubmission = {
//       userId: 'user123',
//       assignmentId: 'assignment456',
//       submissionGrade: 90,
//     };

//     const response = await request(app)
//       .put('/submissions/update/grade')
//       .send(updatedSubmission);

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//     expect(response.body.message).toBe('Submission updated successfully');
//   });

//   test('DELETE /submissions/deleteOne should delete a specific submission', async () => {
//     const deleteParams = {
//       userId: 'user123',
//       assignmentId: 'assignment456',
//     };

//     const response = await request(app)
//       .delete('/submissions/deleteOne')
//       .send(deleteParams);

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//     expect(response.body.message).toBe('Submission deleted successfully');
//   });
// });

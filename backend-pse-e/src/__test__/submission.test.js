const http = require("http");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
// Import app.js
const app = require("../app");
// Create the server using http

// Set the port for the server
const request = require('supertest');

describe('Server endpoints', () => {
  let server;
  let server2;
  let assignmentId;
  let userId;

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

  //... previous tests

  test('GET /submissions/getAll should return all submissions', async () => {
    const response = await request(app).get('/submission/getAll');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    submissionId = response.body[0]._id;
    assignmentId = response.body[0].assignmentId;
    userId = response.body[0].userId;
  });


  it('should respond with 200 and submissions by assignmentId for the /findByAssignmentId path', async () => {
    const response = await request(server).get(`/submission/findByAssignmentId/${assignmentId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });


  it("should respond with 404 object not found for the /findByAssignmentId path", async () => {
    const response = await request(server).get(`/submission/findByAssignmentId/123456789012345678901234`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Object not found");
    });

it ('should respond with 200 and submissions by studentId for the /findByUserId path', async () => {
    const response = await request(server).get(`/submission/findByUserId/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    });

it('should return the specified submission if it exists', async () => {
        const response = await request(server).get(`/submission/findSpecificSubmission?userId=${userId}&assignmentId=${assignmentId}`);
        expect(response.status).toBe(200);
});

it('should return an error if the specified submission does not exist', async () => {
    const FuserId = 'nonexistentUser'; // Use ID that doesn't exist
    const FassignmentId = 'nonexistentAssignment'; // Use ID that doesn't exist

    const response = await request(server).get(`/submission/findSpecificSubmission?userId=${FuserId}&assignmentId=${FassignmentId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Object not found');
});

it('should save the file if it is the first submission', async () => {
    const response = await request(server)
        .post('/submission/save')
        .field('userId', userId)
        .field('assignmentId', assignmentId)
        .attach('file', fs.readFileSync(path.join(__dirname, './testFile.txt')), 'testFile.txt');

    expect(response.status).toBe(200);
    // Add more assertions here to check the content of the response body
});

it('should return an error if the user has already submitted', async () => {
    const response = await request(app)
        .post('/submission/save')
        .field('userId', userId)
        .field('assignmentId', assignmentId)
        .attach('file', fs.readFileSync(path.join(__dirname, './testFile.txt')), 'testFile.txt');

    expect(response.status).toBe(409);
    expect(response.body.error).toBe('You cant submit twice, update the existing assignment using /update/file.');
});

});

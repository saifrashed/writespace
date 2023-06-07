const express = require('express');
const router = express.Router();

// Require axios for communicating with the canvas api
const axios = require('axios');

// Canvas api url
const apiUrl = 'https://canvas.uva.nl/api/v1';
// Change this access token every time for different users!
// See Canvas_API document in discord on how to get an access token
const accessToken = '10392~6vNDwyfsw2Dfo0UG8hT0DkAnoUDtaOwBcTIuQD5MZbTOQPBUKsb7Ttq6jaLjCZoN';

/* 
Get request to get all courses with the api.
router.x is used to specify the used route.
axios is used to communicate with the canvas api and authenticate
the user with the access token.
Postman request URL: localhost:5000/canvas-api/courses
*/
router.get('/courses', (req, res) => {
    axios.get(`${apiUrl}/courses`, {
      headers: {
        // Authorization using the access token
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred.' });
    });
});

// Get general user information
router.get('/user-information', (req, res) => {
    axios.get(`${apiUrl}/users/self`, {
      headers: {
        // Authorization using the access token
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.error('Error from Canvas API:', error);
        res.status(500).json({ error: 'An error occurred.' });
    });
});


// router.get('/courses/users', (req, res) => {
//     // Retrieve courses for the authenticated user
//     axios.get(`${apiUrl}/users/self/courses`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//       .then(coursesResponse => {
//         const courses = coursesResponse.data;
//         const coursePromises = [];
  
//         // Retrieve user information for each course
//         courses.forEach(course => {
//           const courseId = course.id;
//           const coursePromise = axios.get(`${apiUrl}/courses/${courseId}/users`, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`
//             }
//           });
//           coursePromises.push(coursePromise);
//         });
  
//         // Wait for all requests to complete
//         Promise.all(coursePromises)
//           .then(results => {
//             const usersByCourse = results.map((result, index) => {
//               const courseId = courses[index].id;
//               const users = result.data;
//               return { courseId, users };
//             });
  
//             res.json(usersByCourse);
//           })
//           .catch(error => {
//             console.error('Error from Canvas API:', error);
//             res.status(500).json({ error: 'An error occurred.' });
//           });
//       })
//       .catch(error => {
//         console.error('Error from Canvas API:', error);
//         res.status(500).json({ error: 'An error occurred.' });
//       });
//   });  

module.exports = router;
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Require axios for the canvas api
const axios = require('axios');

// Canvas api url
const apiUrl = 'https://canvas.uva.nl/api/v1';
// Change this access token every time for different users!
const accessToken = '10392~gyicaEXku20FnjyEZWajtl9lDEAop2sHvpiGZl5DmqeqzhJzj0OtDq4bOs8AgdNm';

// Get request to get all courses with the api
router.get('/courses', (req, res) => {
    axios.get(`${apiUrl}/courses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred.' });
      });
});
  
module.exports = router;
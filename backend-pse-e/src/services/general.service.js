// Test service, services handle everything with requests in the BE
require("dotenv").config();

// Use the app to make requests
const app = express();

// Database connection
require("./config/databaseConfig").connect();

// Import models
const TestModel = require("./models/testModel");

// Post request (creates something in the db)
app.post('/test/save', (req, res) => {
    var test = new TestModel();
    test.username = req.body.username;
    test.testId = req.body.testId;

    test.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// module.exports = general;

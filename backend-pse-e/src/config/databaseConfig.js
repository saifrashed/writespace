// This is the database configuration file to connect to MongoDB
const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const connect = () => {
    return mongoose.connect(MONGO_URI);
}

module.exports = { connect };


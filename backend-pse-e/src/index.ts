const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

import { generalRouter } from "./routes/general.route";

require("dotenv").config();

// Database connection
require("./config/databaseConfig").connect();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({ extended: true, }));
app.use(cors());
app.use(express.json());


// include routers in application
app.use("/api/general", generalRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

import express from "express";

import {
    getHelloWorldController
} from "../controllers/general"

// For uploading files
const upload = require("../lib/multer");

export const generalRouter = express.Router();

generalRouter.get("/", getHelloWorldController);





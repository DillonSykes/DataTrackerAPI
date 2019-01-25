import { Request, Response } from "express";
import { sessionController } from "./controllers";
import { userController } from "./controllers";
import { config } from "./config";

import * as bodyParser from "body-parser";

const serverless = require("serverless-http");
const express = require("express");

const cors = require("cors");

// Our Express APP config
const app = express();

app.use(cors());
app.set("port", config.PORT || 3000);
app.use(bodyParser.json());
// API Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Hi");
});

app.use("/session", sessionController);
app.use("/users", userController);
app.listen(3000, () => {
  // Success callback
  console.log(`Listening at http://localhost:${config.PORT}/`);
});
// export our app
module.exports.handler = serverless(app);

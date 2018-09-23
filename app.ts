const serverless = require('serverless-http');
const express = require("express");
import {sessionController} from "./controllers/session";
import {userController} from "./controllers/user";
import {clientController} from "./controllers/clients";

const bodyParser = require("body-parser");
const verifyToken = require("./controllers/verifyToken");
const port = process.env.PORT || 3000;
const cors = require("cors");
// import bycrypt from "bcryptjs";

// Our Express APP config
const app = express();

app.use(cors());
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
// API Endpoints
app.get("/", (req, res) => {
    res.send("Hi");
});
// app.post("/login", userController.login);

app.use("/session", sessionController);
app.use("/users", userController);
app.use("/client", clientController);
app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});
// export our app
module.exports.handler = serverless(app);
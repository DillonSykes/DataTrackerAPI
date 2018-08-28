const express = require('express');
const userController = require("./controllers/user");
const sessionController = require("./controllers/session");
const bodyParser = require("body-parser");
const verifyToken = require("./controllers/verifyToken");

// import bycrypt from "bcryptjs";

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
// API Endpoints
app.get("/", (req, res) => {
    res.send("Hi");
});
// app.post("/login", userController.login);

app.use("/session", sessionController);
app.use("/users", userController);

// export our app
module.exports = app;
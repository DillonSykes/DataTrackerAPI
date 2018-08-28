const conn = require("../db");
const config = require("../tmp");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
 router.get('/all', verifyToken,(req, res) => {
     console.log("here");
     conn.getConnection((poolErr, connection) => {
         if (poolErr) {
             return res.status(404).send("Server Error.");
         }
         connection.query("SELECT * FROM `Session`", (error, sessions) => {
             if (error) {
                 return res.status(404).send("SQL Query Error");
             }
             if (sessions.length < 1) {
                 return res.status(404).send("There are no sessions.");
             }
             else {
                 return res.send({data: sessions});
             }
             connection.release();
         });
     });
});
 module.exports = router;
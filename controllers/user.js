const express = require('express');
const router = express.Router();
const conn = require("../db");
const config = require("../tmp");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/login", (req, res) => {
    conn.getConnection((err, connection) => {
        if (err) {
            return res.status(404).send("Server Error.");
        }
        connection.query("SELECT * FROM `User` where `name`= ?", req.body.name, (error, results) => {
            if (error) {
                return res.status(404).send("SQL Query Error");
            }
            if (results.length < 1) {
                return res.status(404).send("No user found.");
            }
            if (results[0].password === req.body.password) {
                const token = jwt.sign({id: req.body.name}, config.secret, {expiresIn: 8600});
                res.status(200).send({ auth: true, token: token });
            } else {
                return res.status(404).send("Password is incorrect.");
            }
            connection.release();
        });
    });
});
router.get("/", (req, res) => {
    res.send("USER");
});
module.exports = router;

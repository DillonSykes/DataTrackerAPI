const express = require('express');
const router = express.Router();

const verifyToken = require("./verifyToken");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/new', verifyToken, (req, res) => {
  
});

module.exports = router;
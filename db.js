const mysql = require('mysql');

const conn =  mysql.createPool({
    host: "data.clrftn1xeoku.us-east-1.rds.amazonaws.com",
    user: "data",
    password: "gamesetmatch12",
    database: "data",
});
module.exports = conn;

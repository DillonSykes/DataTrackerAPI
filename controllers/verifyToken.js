const jwt = require("jsonwebtoken");

const config = require("../tmp");

module.exports =  function verifyToken(req, res, next ) {
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({auth: false, message: "Failed to authenticate token."});
        }
        // if everything good, save to request for use in other routes
        console.log("all good.");
        req.name = decoded.id;
        next();
    });
};


const app = require('./app');
const port = process.env.PORT;


const server = app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

module.exports = server;
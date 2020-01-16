const http = require('http'); // http-moduuli

const server = http.createServer((req, res) => {
    console.log(req);
});

server.listen(8080);

const http = require('http'); // http-moduuli

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    console.log(`HTTP request received: url=${url} method=${method}`)
});

server.listen(8080);

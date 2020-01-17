const http = require('http'); // http-moduuli
const fs = require('fs'); // filestream

const notes = [];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    console.log(`HTTP request received: url=${url} method=${method}`)

    if (url === '/') {
        res.write(`
        <html>
        <head><title>MemoApp</title></head>
        <body>`);

        notes.forEach((value, index) => {
            res.write(`
                <div>
                    note: ${value}, index: ${index}
                    <form action="delete-note2" method="POST">
                        <input type="hidden" name="index" value="${index}">
                        <button type="submit">Delete</button>
                    </form>
                </div>`);
        });

        res.write(`
            <form action="add-note" method="POST">
                <input type="text" name="note">
                <button type="submit">Add note</button>
            </form>
            <form action="delete-note" method="POST">
                <input type="number" name="index">
                <button type="submit">Delete</button>
            </form>
        </body>
        </html>
        `);
        res.statusCode = 200; // OK
        res.end();
        return;
    }
    else if (url === '/add-note') {
        console.log('/add-note');
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const note = body.split('=')[1];
            notes.push(note);
            
            res.statusCode = 303; // See other, redirect
            res.setHeader('Location', '/');
            res.end();
        });

        return;
    }
    else if (url === '/favicon.ico') {
        fs.readFile('./favicon.ico', (err, data) => {
            res.write(data);
            res.end();
        });
        return;
    }
    else if (url === '/delete-note') {
        console.log('/delete-note');
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const index = body.split('=')[1];
            notes.splice(index, 1);
            
            res.statusCode = 303; // See other, redirect
            res.setHeader('Location', '/');
            res.end();
        });

        return;
    }
    else if (url === '/delete-note2') {
        console.log('/delete-note2');
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const index = body.split('=')[1];
            notes.splice(index, 1);
            
            res.statusCode = 303; // See other, redirect
            res.setHeader('Location', '/');
            res.end();
        });

        return;
    }

    console.log(`${url} not found`);
    res.write(`
        <html>
        <head><title>MemoApp - 404</title></head>
        <body>
            <h1>404 - page not found</h1>
        </body>
        </html>
        `);
    res.statusCode = 404; // Not found
    res.end();
});

server.listen(8080);

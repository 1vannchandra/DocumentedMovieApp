const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const fileExt = path.extname(req.url);

    if (req.url === '/') {
        fs.readFile('./src/pages/index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.write('Error 404: Page not found');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });
    }


    // console.log(req.url);
    if(fileExt === '.css') {
        console.log(req.url);
        fs.readFile('./src' + req.url, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.write('Error 404: Page not found');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                res.end();
            }
        })
    } else if(fileExt === '.js' || fileExt === '.mjs') {
        fs.readFile('./src' + req.url, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.write('Error 404: Page not found');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.write(data);
                res.end();
            }
        })
    }
});

server.listen(3000,  '127.0.0.1', () => {
    console.log('Listening at 127.0.0.1:3000');
});
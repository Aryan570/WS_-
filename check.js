"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var http_1 = require("http");
fs.readFile('index.html', function (err, html) {
    var server = (0, http_1.createServer)(function (req, res) {
        // console.log(req.url);
        if (req.url == '/') {
            res.setHeader('Content-type', 'text/html');
            res.write(html);
            res.end();
        }
        else if (req.url == '/output.css') {
            res.setHeader('Content-type', 'text/css');
            res.write(fs.readFileSync('output.css'));
            res.end();
        }
        else {
            res.write("invalid request");
            res.end();
        }
    });
    server.listen(3000);
    // const ser = new WebSocket.Server({
    //     server
    // })
});

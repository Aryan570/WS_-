"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var http_1 = require("http");
fs.readFile('index.html', function (err, html) {
    var server = (0, http_1.createServer)(function (req, res) {
        res.write(html);
        res.end();
    });
    // const ser = new WebSocket.Server({
    //     server
    // })
    server.listen(3000);
});

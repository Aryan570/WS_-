"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var http_1 = require("http");
var ws_1 = require("ws");
fs.readFile('index.html', function (err, html) {
    var server = (0, http_1.createServer)(function (req, res) {
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
        else if (req.url == '/frnd.js') {
            res.setHeader('Content-type', 'text/javascript');
            res.write(fs.readFileSync('frnd.js'));
            res.end();
        }
        else {
            res.write("invalid request");
            res.end();
        }
    }).listen(3000);
    var ser = new ws_1.WebSocketServer({ server: server });
    var msgArray = [];
    ser.on('connection', function (server) {
        ser.clients.forEach(function (client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                var to_connec = JSON.stringify(['connections', "".concat(ser.clients.size)]);
                client.send(to_connec);
            }
        });
        for (var i = 0; i < msgArray.length; i++) {
            var msg = JSON.stringify(['message', msgArray[i]]);
            server.send(msg);
        }
        server.on('message', function (data) {
            msgArray.push(data.toString());
            ser.clients.forEach(function (client) {
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    var to_send = JSON.stringify(['message', data.toString()]);
                    client.send(to_send);
                }
            });
        });
        server.on('close', function () {
            ser.clients.forEach(function (client) {
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    var siu = JSON.stringify(['connections', "".concat(ser.clients.size)]);
                    client.send(siu);
                }
            });
            if (ser.clients.size < 1)
                msgArray = [];
            console.log("Closed");
        });
        console.log("Connected!");
    });
});

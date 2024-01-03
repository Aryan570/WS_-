import * as fs from 'fs'
import { createServer } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
fs.readFile('index.html', (err, html) => {
    let server = createServer((req, res) => {
        if (req.url == '/') {
            res.setHeader('Content-type', 'text/html');
            res.write(html)
            res.end();
        } else if (req.url == '/output.css') {
            res.setHeader('Content-type', 'text/css');
            res.write(fs.readFileSync('output.css'))
            res.end();
        } else if (req.url == '/frnd.js') {
            res.setHeader('Content-type', 'text/javascript');
            res.write(fs.readFileSync('frnd.js'))
            res.end();
        } else {
            res.write("invalid request");
            res.end();
        }
    }).listen(3000)
    const ser = new WebSocketServer({ server });
    let msgArray: string[] = [];
    ser.on('connection', (server) => {
        ser.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                const to_connec = JSON.stringify(['connections', `${ser.clients.size}`])
                client.send(to_connec)
            }
        })
        for (let i = 0; i < msgArray.length; i++){
            const msg = JSON.stringify(['message',msgArray[i]])
            server.send(msg)
        } 
        server.on('message', (data) => {
            msgArray.push(data.toString());
            ser.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    const to_send = JSON.stringify(['message', data.toString()])
                    client.send(to_send);
                }
            })
        })
        server.on('close', () => {
            ser.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    const siu = JSON.stringify(['connections', `${ser.clients.size}`])
                    client.send(siu)
                }
            })
            console.log("Closed")
        })
        console.log("Connected!")
    })
})

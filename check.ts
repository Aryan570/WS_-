import * as fs from 'fs'
import { createServer } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
fs.readFile('index.html', (err, html) => {
    let server = createServer((req,res)=>{
        if(req.url=='/'){
            res.setHeader('Content-type', 'text/html');
            res.write(html)
            res.end();
        }else if(req.url == '/output.css'){
            res.setHeader('Content-type', 'text/css');
            res.write(fs.readFileSync('output.css'))
            res.end();
        }else if(req.url == '/frnd.js'){
            res.setHeader('Content-type', 'text/javascript');
            res.write(fs.readFileSync('frnd.js'))
            res.end();
        }else{
            res.write("invalid request");
            res.end();
        }
    }).listen(3000)
    const ser = new WebSocketServer({server});
    let msgArray : string[] = [];
    ser.on('connection',(server)=>{
        // server.send('Hello Client')
        // console.log(ser.clients.size) // How to write in Dom , no. of connected people
        for(let i=0;i<msgArray.length;i++) server.send(msgArray[i])
        server.on('message',(data)=>{
            // console.log(`message from client : ${data}`)
            // server.send('This message is from server')
            msgArray.push(data.toString());
            ser.clients.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN){
                    client.send(data.toString());
                }
            })
        })
        server.on('close',()=>{
            console.log("Closed")
        })
        console.log("Connected!")
    })
})


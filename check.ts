import * as fs from 'fs'
import { createServer } from 'http'
import { WebSocket } from 'ws'
fs.readFile('index.html', (err, html) => {
    let server = createServer((req,res)=>{
        // console.log(req.url);
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
    })
    
    const ser = new WebSocket.Server({
        server
    })
    ser.on('connection',(socket)=>{
        // console.log('connected!!')
        console.log("Im fucking here")
        
        socket.on('open',()=>{
            console.log('Connected!!')
        })
        socket.on('close',()=>{
            console.log('Disconnected!!')
        })
    });
    server.listen(3000)
    
    
})


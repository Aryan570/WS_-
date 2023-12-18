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
        }else{
            res.write("invalid request");
            res.end();
        }
        
    })
    
    server.listen(3000)
    // const ser = new WebSocket.Server({
    //     server
    // })
})


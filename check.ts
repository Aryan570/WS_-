import * as fs from 'fs'
import { createServer } from 'http'
import { WebSocket } from 'ws'
fs.readFile('index.html', (err, html) => {
    let server = createServer((req,res)=>{
        res.write(html)
        res.end()
    })
    // const ser = new WebSocket.Server({
    //     server
    // })
    server.listen(3000)
})


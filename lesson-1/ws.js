const http = require('http')

// 3rd party module, ws
const websocket = require('ws')

const server = http.createServer((req,res) => {
    res.end("I am connected")

})



server.listen(8000)
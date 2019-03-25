const http = require("http");

// 3rd party module, ws
const websocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("I am connected");
});

const wss = new websocket.Server({ server });
wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  ws.send("welcome to web sockets!!");
  ws.on("message", msg => {
    console.log(msg);
  });
});

server.listen(8000, () => {
  console.log("listening at 8000");
});

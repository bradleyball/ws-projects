const http = require("http");
const socketio = require("socket.io");

// 3rd party module, ws

const server = http.createServer((req, res) => {
  res.end("I am connected");
});

const io = socketio(server);

io.on("connection", (socket, req) => {
  socket.emit("welcome", "welcome to web sockets!!");
  socket.on("message", msg => {
    console.log(msg);
  });
});

server.listen(8001, () => {
  console.log("listening at 8002");
});

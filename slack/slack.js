const express = require("express");
const app = express();
const socketio = require("socket.io");
let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () => {
  console.log("listening to 9000");
});

const io = socketio(expressServer);

//loop trough each namespace and listen for a connection
namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on("connection", socket => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  });
});

io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
  socket.on("messageToServer", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.join("level1");
  io.of("/")
    .to("level1")
    .emit("joined", `${socket.id} says: I have joined the level one room`);
});

io.of("/admin").on("connection", socket => {
  console.log("Someone connected to admin namespace.");
  io.of("/admin").emit("welcome", "welcome to the admin channel");
});

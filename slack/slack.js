const express = require("express");
const app = express();
const socketio = require("socket.io");
let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () => {
  console.log("listening to 9000");
});

const io = socketio(expressServer);

io.on("connection", socket => {
  let nsData = namespaces.map(ns => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    };
  });
  socket.emit("nsList", nsData);
});

namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on("connection", nsSocket => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      nsSocket.join(roomToJoin);
      io.of("/wiki")
        .in(roomToJoin)
        .clients((error, clients) => {
          numberOfUsersCallback(clients.length);
        });
      const nsRoom = namespaces[0].rooms.find(room => {
        return room.roomTitle === roomToJoin;
      });
      nsSocket.emit("historyCatchUp", nsRoom.history);
    });

    nsSocket.on("newMessageToServer", msg => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "bradley",
        avatar: "https://via.placeholder.com/30"
      };
      console.log(fullMsg);
      console.log(msg);
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const nsRoom = namespaces[0].rooms.find(room => {
        return room.roomTitle === roomTitle;
      });
      console.log(nsRoom);
      nsRoom.addMessage(fullMsg);
      io.of(`/wiki`)
        .to(roomTitle)
        .emit("messageToClients", fullMsg);
    });
  });
});

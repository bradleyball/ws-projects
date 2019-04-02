const socket = io("http://localhost:9000");
const socket2 = io("http://localhost:9000/wiki");
const socket3 = io("http://localhost:9000/mozilla");
const socket4 = io("http://localhost:9000/linux");

socket.on("connect", () => {
  console.log(socket.id);
});

socket2.on("connect", () => {
  console.log(socket.id);
});

socket2.on("welcome", msg => {
  console.log(msg);
});

socket2.on("welcome", msg => {
  console.log(msg);
});

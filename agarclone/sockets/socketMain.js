const io = require("../server").io;
const Orb = require("./classes/Orb");
// ========== CLASSES ======================
const Player = require("./classes/Player");
const PlayerData = require("./classes/PlayerData");
const PlayerConfig = require("./classes/PlayerConfig");

let orbs = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500
};
initGame();

io.sockets.on("connect", socket => {
  let playerConfig = new PlayerConfig(settings);
  let playerData = new PlayerData(null, settings);
  let player = new Player(socket.id, playerConfig, playerData);
  socket.emit("init", {
    orbs
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;

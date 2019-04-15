const io = require("../server").io;
const Orb = require("./classes/Orb");
// ========== CLASSES ======================
const Player = require("./classes/Player");
const PlayerData = require("./classes/PlayerData");
const PlayerConfig = require("./classes/PlayerConfig");

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500
};
initGame();
setInterval(() => {
  io.to("game").emit("tock", {
    players
  });
}, 33);

io.sockets.on("connect", socket => {
  let player = {};

  socket.on("init", data => {
    socket.join("game");

    let playerConfig = new PlayerConfig(settings);
    let playerData = new PlayerData(data.playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);

    socket.emit("initReturn", {
      orbs
    });
    players.push(playerData);
  });
  socket.on("tick", data => {
    if (data.xVector && data.yVector) {
      speed = player.playerConfig.speed;
      let xV = (player.playerConfig.xVector = data.xVector);
      let yV = (player.playerConfig.yVector = data.yVector);

      if (
        (player.playerData.locX < 5 && player.playerData.xVector < 0) ||
        (player.playerData.locX > 500 && xV > 0)
      ) {
        player.playerData.locY -= speed * yV;
      } else if (
        (player.playerData.locY < 5 && yV > 0) ||
        (player.playerData.locY > 500 && yV < 0)
      ) {
        player.playerData.locX += speed * xV;
      } else {
        player.playerData.locX += speed * xV;
        player.playerData.locY -= speed * yV;
      }
    }
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;

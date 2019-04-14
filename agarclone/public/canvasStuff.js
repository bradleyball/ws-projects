function init() {
  draw();
}

// =================================
// -------   DRAWING ---------------
// =================================
let randomX = Math.floor(500 * Math.random() + 10);
let randomY = Math.floor(500 * Math.random() + 10);
console.log(randomX);
function draw() {
  context.beginPath();
  context.fillStyle = "rgb(255,0,0)";

  context.arc(randomX, randomY, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0,255,0)";
  context.stroke();
  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", event => {
  console.log(event);
});

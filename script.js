import { drawTiles, moveDown, moveUp } from "./overWorld.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

window.addEventListener('keydown', function (e) {
  if (e.code === "ArrowDown") {
    moveDown();
  }
  if (e.code === "ArrowUp") {
    moveUp();
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTiles(ctx);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  requestAnimationFrame(animate);
}

animate();
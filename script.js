import { drawTiles, moveDown, moveUp, moveRight, moveLeft } from "./overWorld.js";

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
  if (e.code === "ArrowRight") {
    moveRight();
  }
  if (e.code === "ArrowLeft") {
    moveLeft();
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTiles(ctx);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(898, 0, 302,canvas.height)
  requestAnimationFrame(animate);
}

animate();
import { Hero } from "./hero.js";
import { drawTiles, moveDown, moveUp, moveRight, moveLeft, oldMap } from "./overWorld.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

var zelda = new Hero(8, 72, 32);

window.addEventListener('keydown', function (e) {
  if (e.code === "ArrowDown") {
    zelda.moveDown(oldMap);
  }
  if (e.code === "ArrowUp") {
    zelda.moveUp(oldMap);
  }
  if (e.code === "ArrowRight") {
    zelda.moveRight(oldMap);
  }
  if (e.code === "ArrowLeft") {
    zelda.moveLeft(oldMap);
  }
});


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTiles(ctx);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(904, 0, 302, canvas.height);

  ctx.fillStyle = "green";
  ctx.fillRect(zelda.x, zelda.y, zelda.spriteSize, zelda.spriteSize)
  zelda.nextTile(oldMap);

  requestAnimationFrame(animate);
}

animate();
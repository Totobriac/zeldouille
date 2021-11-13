import { Hero } from "./hero.js";
import { drawTiles, moveDown, moveUp, moveRight, moveLeft, oldMap } from "./overWorld.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

var zelda = new Hero(40, 72, 32);

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
  var exitTile = zelda.nextTile(oldMap);
  checkExit(exitTile);

  requestAnimationFrame(animate);
}


const leftExit = [];
for (let i = 0; i < 13; i++) {
  leftExit.push(i * 28)
}

const rightExit = [];
for (let i = 0; i < 13; i++) {
  rightExit.push(i * 28 + 27)
}

function checkExit(tile) {
  if (tile >= 0 && tile <= 27) {
    moveUp();
  }
  if (tile >= 308 && tile <= 326) {
    moveDown();
  }
  if (leftExit.includes(tile)) {
    moveLeft();
  }
  if (rightExit.includes(tile)) {
    moveRight();
  }
}

animate();
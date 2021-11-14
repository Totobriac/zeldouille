import { Hero } from "./hero.js";
import { drawTiles, mapMove, actualMap } from "./overWorld.js";
import { checkExit } from "./maps.js"

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;


var zelda = new Hero(40, 72, 32);

window.addEventListener('keydown', function (e) {
  if (e.code === "ArrowDown") {
    zelda.moveDown(actualMap);
  }
  if (e.code === "ArrowUp") {
    zelda.moveUp(actualMap);
  }
  if (e.code === "ArrowRight") {
    zelda.moveRight(actualMap);
  }
  if (e.code === "ArrowLeft") {
    zelda.moveLeft(actualMap);
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
  ctx.fillRect(zelda.x, zelda.y, zelda.spriteSize, zelda.spriteSize);

  var currentTile = zelda.nextTile(actualMap);
  if (actualMap[currentTile] === 2) var exitTile = checkExit(currentTile);

  if (exitTile != undefined) {
    mapMove[exitTile]();
    switch (exitTile) {
      case 0:
        zelda.exitUp();
        break;
      case 1:
        zelda.exitDown();
        break;
      case 2:
        zelda.exitLeft();
        break;
      case 3:
        zelda.exitRight();
        break;
    }
  };

  requestAnimationFrame(animate);
}

animate();
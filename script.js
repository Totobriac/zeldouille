import { Hero } from "./hero.js";
import { drawTiles, mapMove, oldMap } from "./overWorld.js";
import { checkExit } from "./maps.js"

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
  ctx.fillRect(zelda.x, zelda.y, zelda.spriteSize, zelda.spriteSize);

  var currentTile = zelda.nextTile(oldMap);
  console.log(zelda.x, zelda.y);

  var exitTile = checkExit(currentTile);

  if (exitTile != undefined) {
    mapMove[exitTile]();
    // switch (exitTile) {
    //   case 0:
    //     zelda.exitUp();
    //     break;
    //   case 1:
    //     zelda.exitDown();
    //     break;
      // case 2:
      //   zelda.exitLeft();
      //   break;
      // case 3:
      //   zelda.exitRight();
      //   break;
      exitTile === 0 ? zelda.exitUp() : zelda.exitDown();
    // }
  };

  requestAnimationFrame(animate);
}

animate();
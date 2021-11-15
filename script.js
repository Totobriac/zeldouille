import { Hero } from "./hero.js";
import { drawTiles, mapMove, actualMap, monstersList, monsterMayem } from "./overWorld.js";
import { checkExit } from "./maps.js"

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;


var zelda = new Hero(40, 72, 32);

var monstersIndexList = [];

var exitTile;

window.addEventListener('keydown', function (e) {
  if (e.code === "ArrowDown") {
    zelda.moveDown(actualMap,monstersIndexList);
  }
  if (e.code === "ArrowUp") {
    zelda.moveUp(actualMap,monstersIndexList);
  }
  if (e.code === "ArrowRight") {
    zelda.moveRight(actualMap,monstersIndexList);
  }
  if (e.code === "ArrowLeft") {
    zelda.moveLeft(actualMap,monstersIndexList);
  }
});

function moveMap() {
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
}

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

  ctx.fillStyle = "red";
  if (monstersList) {
    monstersIndexList = [];
    for (let i = 0; i < monstersList.length; i++) {
      ctx.fillRect(monstersList[i].x, monstersList[i].y, 32, 32);
      monstersIndexList.push(monstersList[i].index);
      monstersList[i].move();
    }
  }

  var currentTile = zelda.nextTile(actualMap);
  if (actualMap[currentTile] === 2) exitTile = checkExit(currentTile);

  if (exitTile != undefined) {
    monsterMayem();
    moveMap();
  }


  requestAnimationFrame(animate);
}

animate();



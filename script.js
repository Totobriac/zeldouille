import { Hero } from "./hero.js";
import { drawTiles, mapMove, actualMap, monstersList, monsterMayem } from "./overWorld.js";
import { checkExit } from "./maps.js"

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

var zelda = new Hero(40, 72, 32,ctx);

var monstersIndexList = [];

var exitTile;

var direction;

var isAttacking = false;

var isMoving = false;

window.addEventListener('keydown', function (e) {
  isMoving = true;
  if (e.code === "ArrowDown") {
    direction = 0;   
  }
  if (e.code === "ArrowUp") {
    direction = 1;
  }
  if (e.code === "ArrowRight") {
    direction = 2;
  }
  if (e.code === "ArrowLeft") {
    direction = 3;
  }
  if (e.code === "Space") {
   if (e.repeat) return;
   isAttacking = true;
  }
});

window.addEventListener('keyup', function (e) {
  isMoving = false;
  direction = undefined;
  isAttacking = false;
});


function moveMap() {
  mapMove[exitTile]();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTiles(ctx);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(904, 0, 302, canvas.height);

  zelda.move(direction);
  zelda.attack(isAttacking);
  zelda.draw(isMoving);


  ctx.fillStyle = "red";
  if (monstersList) {
    monstersIndexList = [];
    for (let i = 0; i < monstersList.length; i++) {
      ctx.fillRect(monstersList[i].x, monstersList[i].y, 32, 32);
      monstersIndexList.push(monstersList[i].index);
      monstersList[i].move();
    }
  }

  exitTile = checkExit(zelda.x, zelda.y);

  if (exitTile != undefined) {
    monsterMayem();
    moveMap();
  }

  requestAnimationFrame(animate);
}

animate();

import { Hero } from "./hero.js";
import { drawTiles, mapMove, monstersList, monsterMayem,oldMap } from "./overWorld.js";
import { checkExit } from "./maps.js";
import {SideBar} from "./sideBar.js";
import {drawCave} from "./cave.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

var zelda = new Hero(400, 172, 32,ctx);
var sideBar = new SideBar(ctx);

var monstersIndexList = [];
var exitTile;
var direction;
var isInCave = false;


window.addEventListener('keydown', function (e) {
  zelda.isMoving = true;
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
  if (e.code === "Space" && zelda.hasSword) {
   if (e.repeat) return;
   zelda.isAttacking = true;
  }
});

window.addEventListener('keyup', function (e) {
  zelda.isMoving = false;
  direction = undefined;
});


function moveMap() {
  mapMove[exitTile]();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isInCave === false)drawTiles(ctx);

  if (exitTile === 4) {
    drawCave(0, ctx)
  };

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(904, 0, 296, canvas.height);

  zelda.attack();
  zelda.move(direction);
  zelda.draw();

  ctx.fillStyle = "red";
  if (monstersList) {
    monstersIndexList = [];
    for (let i = 0; i < monstersList.length; i++) {
      ctx.fillRect(monstersList[i].x, monstersList[i].y, 32, 32);
      monstersIndexList.push(monstersList[i].index);
      monstersList[i].move();
    }
  };

  exitTile = checkExit(zelda.x, zelda.y,oldMap);

  if (exitTile != undefined && exitTile != 4) {
    monsterMayem();
    moveMap();
  };



  sideBar.draw(oldMap, zelda);

  requestAnimationFrame(animate);
}

animate();

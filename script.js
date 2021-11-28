import { Hero } from "./hero.js";
import { drawTiles, mapMove, monsterMayem } from "./overWorld.js";
import { checkExit, Map } from "./map.js";
import { SideBar } from "./sideBar.js";
import { Control } from "./controls.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

var zelda = new Hero(90, 192, 32, ctx);
var sideBar = new SideBar(ctx);
var map = new Map();
var control = new Control(zelda);

var monstersIndexList = [];
var exitTile;

function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTiles(ctx);
  
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(904, 0, 296, canvas.height);

  zelda.attack();
  zelda.move();
  zelda.draw();

  ctx.fillStyle = "red";
  if (map.monsters) {
    monstersIndexList = [];
    for (let i = 0; i < map.monsters.length; i++) {
      ctx.fillRect(map.monsters[i].x, map.monsters[i].y, 32, 32);
      monstersIndexList.push(map.monsters[i].index);
      map.monsters[i].move();
    }
  };

  exitTile = checkExit(zelda.x, zelda.y, map.actual);

  if (exitTile != undefined) {
    monsterMayem();
    mapMove[exitTile]();
  };

  sideBar.draw();

  requestAnimationFrame(animate);
}

animate();

export { map, zelda };

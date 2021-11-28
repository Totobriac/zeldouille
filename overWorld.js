import { mainMap } from "./maps.js";
import { spawnMonsters } from "./ghouls.js";
import { getObstaclesList, getTile } from "./functions.js";
import { map, zelda } from "./script.js";


var tiles = new Image();
tiles.src = "./sprites.png";

var newMap;
var xOffset = 0;
var yOffset = 0;
var mapTiles = 336;
var direction = 0;
var upDown = 392;
var leftRight = 904;
var mapMove = [moveLeft, moveRight, moveUp, moveDown, enterCave, exitCave];
var zob = 0;
var zobi = false;



function drawTiles(ctx) {

  map.obstacles = getObstaclesList(mainMap[map.actual].bluePrint);

  upDown === 8 ? xOffset += direction : yOffset += direction;

  map.actual != 9 ? ctx.fillStyle = "rgb(116,116,116)" : ctx.fillStyle = "black";
  ctx.fillRect(8, 8, 896, 384);

  for (let i = 0; i < mapTiles; i++) {
    var selectedTile = getTile(mainMap[map.actual].bluePrint[i]);
    var line = Math.floor(i / 28);
    var column = i - (line * 28);
    ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
      Math.floor(column * 32 + 8 + xOffset), Math.floor(line * 32 + 8 + yOffset), 32, 32);
    if (newMap != undefined) {
      var selectedTile = getTile(mainMap[newMap].bluePrint[i]);
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
        Math.floor(column * 32 + 8 - zob + leftRight + xOffset), Math.floor(line * 32 + upDown + yOffset), 32, 32);
    }
    if (yOffset === 390 || yOffset === -390) {
      zobi = false;
      yOffset = 0;
      map.actual = newMap;
      direction = 0;
      map.monsters = spawnMonsters(mainMap[map.actual].bluePrint, ctx);
    }
    if (xOffset === 888 || xOffset === -896) {
      zobi = false;
      xOffset = 0;
      map.actual = newMap;
      direction = 0;
      map.monsters = spawnMonsters(mainMap[map.actual].bluePrint, ctx);
    }
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(904, 0, 296, canvas.height);
}

function moveDown() {
  zobi = true;
  newMap = nextMap(0);
  direction = -2;
  upDown = 392;
  leftRight = 0;
  xOffset = 0;
  zob = 0;
}

function moveUp() {
  zobi = true;
  newMap = nextMap(1);
  direction = 2;
  upDown = -376;
  leftRight = 0;
  xOffset = 0;
  zob = 0;
}

function moveRight() {
  zobi = true;
  newMap = nextMap(2);
  direction = -4;
  upDown = 8;
  leftRight = 904;
  yOffset = 0;
  zob = 8;
}

function moveLeft() {
  zobi = true;
  newMap = nextMap(3);
  direction = 4;
  upDown = 8;
  leftRight = -888;
  yOffset = 0;
  zob = 0;
}

function enterCave() {
  map.actual = 9;
  zelda.x = 440;
  zelda.y = 328;
}

function exitCave() {
  map.actual = 3;
  zelda.x = 192;
  zelda.y = 94;
}

function nextMap(side) {
  switch (side) {
    case 0:
      return (map.actual + 3);
    case 1:
      return (map.actual - 3);
    case 2:
      return map.actual + 1;
    case 3:
      return map.actual - 1;
  }
}


function monsterMayem() {
  map.monsters = [];
}

export { drawTiles, mapMove, monsterMayem, zobi };

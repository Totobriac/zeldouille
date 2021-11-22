import {
  mainMap
} from "./maps.js";
import {
  spawnMonsters
} from "./ghouls.js";
import {
  getObstaclesList
} from "./functions.js";

var tiles = new Image();
tiles.src = "./overworldtiles_no_space.png";

var xOffset = 0;
var yOffset = 0;
var mapTiles = 336;
var oldMap = 4;
var newMap;
var direction = 0;
var upDown = 392;
var leftRight = 904;
var mapMove = [moveLeft, moveRight, moveUp, moveDown];
var actualMap = mainMap[oldMap];
var monstersList = [];
var obstacles = [];

var zob = 0;

var zobi = false;

function getTile(tile) {
  var line = Math.floor(tile / 6);
  var column = tile - (line * 6);
  return [Math.floor(line * 16 + line + 1), Math.floor(column * 16 + column + 1)];
}

function drawTiles(ctx) {
  obstacles = getObstaclesList(mainMap[oldMap]);

  upDown === 8 ? xOffset += direction : yOffset += direction;

  ctx.fillStyle = "rgb(116,116,116)";
  ctx.fillRect(8, 8, 896, 384);

  for (let i = 0; i < mapTiles; i++) {
    var selectedTile = getTile(mainMap[oldMap][i]);
    var line = Math.floor(i / 28);
    var column = i - (line * 28);
    ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
      Math.floor(column * 32 + 8 + xOffset), Math.floor(line * 32 + 8 + yOffset), 32, 32);
    if (newMap != undefined) {
      var selectedTile = getTile(mainMap[newMap][i]);
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
        Math.floor(column * 32 + 8 - zob + leftRight + xOffset), Math.floor(line * 32 + upDown + yOffset), 32, 32);
    }
    if (yOffset === 390 || yOffset === -390) {
      zobi = false;
      yOffset = 0;
      oldMap = newMap;
      direction = 0;
      actualMap = mainMap[oldMap];
      monstersList = spawnMonsters(actualMap, ctx);
    }
    if (xOffset === 888 || xOffset === -896) {
      zobi = false;
      xOffset = 0;
      oldMap = newMap;
      direction = 0;
      actualMap = mainMap[oldMap];
      monstersList = spawnMonsters(actualMap, ctx);
    }
  }
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

function nextMap(side) {
  switch (side) {
    case 0:
      return (oldMap + 3);
    case 1:
      return (oldMap - 3);
    case 2:
      return oldMap + 1;
    case 3:
      return oldMap - 1;
  }
}

function monsterMayem() {
  monstersList = [];
}

export {
  drawTiles,
  mapMove,
  actualMap,
  monstersList,
  monsterMayem,
  obstacles,
  zobi
};

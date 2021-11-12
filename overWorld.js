import { mainMap } from "./maps.js";

var tiles = new Image();
tiles.src = "./overworldtiles_no_space.png";

var xOffset = 0;
var yOffset = 0;
var mapTiles = 336;
var oldMap = mainMap[1];
var newMap;
var direction = 0;
var upDown = 392;
var leftRight = 904;

var zob = 0;


function getTile(tile) {
  var line = Math.floor(tile / 6);
  var column = tile - (line * 6);
  return [Math.floor(line * 16 + line + 1), Math.floor(column * 16 + column + 1)];
}

function drawTiles(ctx) {

  upDown === 8 ? xOffset += direction : yOffset += direction;

  ctx.fillStyle = "rgb(116,116,116)";
  ctx.fillRect(8, 8, 896, 384);

  for (let i = 0; i < mapTiles; i++) {
    var selectedTile = getTile(oldMap[i]);
    var line = Math.floor(i / 28);
    var column = i - (line * 28);
    ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
      Math.floor(column * 32 + 8 + xOffset), Math.floor(line * 32 + 8 + yOffset), 32, 32);
    if (newMap) {
      var selectedTile = getTile(newMap[i]);
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
        Math.floor(column * 32 + 8 - zob + leftRight + xOffset), Math.floor(line * 32 + upDown + yOffset), 32, 32);
    }
    if (yOffset === 390 || yOffset === -390) {
      yOffset = 0;
      oldMap = newMap;
      direction = 0;
    }
    if (xOffset === 888 || xOffset === -896) {
      xOffset = 0;
      oldMap = newMap;
      direction = 0;
    }
  }
}

function moveDown() {
  newMap = mainMap[1];
  direction = -2;
  upDown = 392;
  leftRight = 0;
  xOffset = 0;  
  zob = 0;
}

function moveUp() {
  newMap = mainMap[0];
  direction = 2;
  upDown = -376;
  leftRight = 0;
  xOffset = 0;
  zob = 0;
}

function moveRight() {
  newMap = mainMap[0];
  direction = -2;
  upDown = 8;
  leftRight = 904;
  yOffset = 0;
  zob = 8;
}

function moveLeft() {
  newMap = mainMap[1];
  direction = 2;
  upDown = 8;
  leftRight = -888;
  yOffset = 0;
  zob = 0;
}

export { drawTiles, moveDown, moveUp, moveRight, moveLeft, oldMap };
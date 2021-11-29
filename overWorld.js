import { mainMap } from "./maps.js";
import { spawnMonsters } from "./ghouls.js";
import { getObstaclesList, getTile } from "./functions.js";
import { map, zelda } from "./script.js";
import { monsterAnimation } from "./ghouls.js";

var tiles = new Image();
tiles.src = "./sprites.png";

function drawTiles(ctx) {

  map.obstacles = getObstaclesList(mainMap[map.actual]);

  map.upDown === 8 ? map.xOffset += map.direction : map.yOffset += map.direction;

  map.actual != 9 ? ctx.fillStyle = "rgb(116,116,116)" : ctx.fillStyle = "black";
  ctx.fillRect(8, 8, 896, 384);

  for (let i = 0; i < map.mapTiles; i++) {
    var selectedTile = getTile(mainMap[map.actual].bluePrint[i]);
    var line = Math.floor(i / 28);
    var column = i - (line * 28);
    ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
      Math.floor(column * 32 + 8 + map.xOffset), Math.floor(line * 32 + 8 + map.yOffset), 32, 32);
    if (map.newMap != undefined) {

      var selectedTile = getTile(mainMap[map.newMap].bluePrint[i]);
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
        Math.floor(column * 32 + 8 - map.zob + map.leftRight + map.xOffset), Math.floor(line * 32 + map.upDown + map.yOffset), 32, 32);
    }
    if (map.yOffset === 390 || map.yOffset === -390) {
      map.zobi = false;
      map.yOffset = 0;
      map.actual = map.newMap;
      map.direction = 0;
      map.monsters = spawnMonsters(mainMap[map.actual].bluePrint, ctx);
    }
    if (map.xOffset === 888 || map.xOffset === -896) {
      map.zobi = false;
      map.xOffset = 0;
      map.actual = map.newMap;
      map.direction = 0;
      map.monsters = spawnMonsters(mainMap[map.actual].bluePrint, ctx);
    }
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(904, 0, 296, canvas.height);
}

function monsterMayem() {
  map.monsters = [];
}

export { drawTiles, monsterMayem };

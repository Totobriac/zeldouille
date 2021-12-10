import { mainMap } from "./maps.js";
import { getObstaclesList, getTile } from "./functions.js";
import { map } from "./script.js";

import {Octorok} from "./monsters/octorok.js";
import { Moblin } from "./monsters/moblin.js";
import {Zora} from "./monsters/zora.js";
import {Lynel} from "./monsters/lynel.js";

var tiles = new Image();
tiles.src = "./assets/sprites.png";

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
      if (mainMap[map.actual].hasWater === true) map.zora = [spawnZora(mainMap[map.actual].bluePrint)];
    }
    if (map.xOffset === 888 || map.xOffset === -896) {
      map.zobi = false;
      map.xOffset = 0;
      map.actual = map.newMap;
      map.direction = 0;
      map.monsters = spawnMonsters(mainMap[map.actual], ctx);
      if (mainMap[map.actual].hasWater === true) map.zora = [spawnZora(mainMap[map.actual].bluePrint)];
    }
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, 392, canvas.width, 8);
  ctx.fillRect(0, 0, 8, canvas.height);
  ctx.fillRect(904, 0, 296, canvas.height);
}

function spawnMonsters(map,ctx) {
  var monsters = [];
  var monstersNb = 0;

  for (let i = 0; i < map.monsterList.length; i ++) {
    monstersNb += map.monsterList[i].nb;

    while ( monsters.length < monstersNb) {
      var type = map.monsterList[i].type;
      switch(type) {
        case "Octorok":
        var monster = new Octorok(map, [1, 1, 1, 1],ctx, 1);
        if (map.bluePrint[monster.index] === 2) monsters.push(monster);
        break;
        case "Moblin":
        var monster = new Moblin(map, [1, 1, 1, 1],ctx, 0.75);
        if (map.bluePrint[monster.index] === 2) monsters.push(monster);
        break;
        case "Lynel":
        var monster = new Lynel(map, [1, 1, 1, 1],ctx, 1.25);
        if (map.bluePrint[monster.index] === 2) monsters.push(monster);
        break;
      }
    }
  }
  return monsters;
}

function spawnZora(map) {
  var waterTiles = [];
  for (let i = 0; i < map.length; i++) {
    if ( [24,25,26,30,31,32,36,37,38].includes(map[i])) {
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      waterTiles.push({ x: column * 32 + 8, y: line * 32 + 8 });
    }
  }
  var zoraCoord = waterTiles[Math.floor(Math.random() * waterTiles.length)];
  var zora = new Zora(zoraCoord.x, zoraCoord.y, waterTiles);
  return zora;
}

export { drawTiles };

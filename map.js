import { mainMap } from "./maps.js";

class Map {
  constructor() {
    this.actual = 3;
    this.bluePrint = mainMap[3];
    this.obstacles;
    this.monsters = [];
  }
}

function checkExit(x, y, map) {
  var actualTile = getActualTile(x, y);
  if (mainMap[map][actualTile] === 10 && map === 3) {
    return (4);
  }
  if (mainMap[map][actualTile] === 10 && map === 9) {
    return (5);
  }
  if (x < 40) {
    return (0);
  }
  if (x > 840) {
    return (1);
  }
  if (y < 40) {
    return (2);
  }
  if (y > 328) {
    return (3);
  }
  else return undefined
}

function getActualTile(x, y) {
  var line = Math.floor((y - 8) / 32);
  var column = Math.floor((x - 8) / 32);
  return (line * 28) + column;
}

export { Map, checkExit };
function getObstaclesList(map) {
  var obstacles = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i] != 2 && map[i] != 10 && map[i] != 53) {
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      obstacles.push({ x: column * 32 + 8, y: line * 32 + 8 });
    }
  }
  return obstacles;
}

function collChecker(x, y, objects) {
  var colliding;
  for (let i = 0; i < objects.length; i++) {
    if (x + 32 <= objects[i].x || x >= objects[i].x + 32 ||
      y + 32 <= objects[i].y || y >= objects[i].y + 32) {
      colliding = false;
    }
    else {
      return { isColliding: true, object: objects[i], index : i };
    }
  }
  return { isColliding: colliding };
}

function getTile(tile) {
  var line = Math.floor(tile / 6);
  var column = tile - (line * 6);
  return [Math.floor(line * 16 + line + 1), Math.floor(column * 16 + column + 1)];
}

export { getObstaclesList, collChecker, getTile };

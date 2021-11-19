function getObstaclesList(map) {
  var obstacles = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i] != 2) {
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
      return true;
    }
  }
  return colliding;
}

export { getObstaclesList, collChecker };
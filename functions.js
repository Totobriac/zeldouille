function getObstaclesList(map) {
  var obstacles = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i] != 2) {
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      obstacles.push([column * 32 + 8, line * 32 + 8]);
    }
  }
  return obstacles;
}

export { getObstaclesList };
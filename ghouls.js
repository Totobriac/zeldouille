
class Monster {
  constructor(map, obstacles, bundaries) {
    this.x = (Math.floor(Math.random() * 24) + 2) * 32 + 8;
    this.y = (Math.floor(Math.random() * 10) + 1) * 32 + 8;
    this.map = map;
    this.obstacles = obstacles;
    this.direction = Math.floor(Math.random() * 4);
    this.index = this.getIndex();
    this.isColliding = false;
    this.isExiting = false;
    this.bundaries = bundaries;
  }
  randomDirection() {
    this.direction = Math.floor(Math.random() * 4);
  }
  getIndex() {
    return (Math.floor((this.y - 8) / 32) * 28 + Math.floor((this.x - 8) / 32));
  }
  move() {
    if (!this.isColliding) {
      if (this.direction === 0) {
        var nextX = this.x + 1;
        var exit = this.checkBundaries(nextX, this.y);
        this.isColliding = this.checkCollision(nextX, this.y);
        this.isColliding === false && exit === false ? this.x += 1 : this.randomDirection();
      }
      else if (this.direction === 1) {
        var nextX = this.x - 1;
        var exit = this.checkBundaries(nextX, this.y);
        this.isColliding = this.checkCollision(nextX, this.y);
        this.isColliding === false && exit === false ? this.x -= 1 : this.randomDirection();
      }
      else if (this.direction === 2) {
        var nextY = this.y + 1;
        var exit = this.checkBundaries(this.x, nextY);
        this.isColliding = this.checkCollision(this.x, nextY);
        this.isColliding === false && exit === false ? this.y += 1 : this.randomDirection();
      }
      else if (this.direction === 3) {
        var nextY = this.y - 1;
        var exit = this.checkBundaries(this.x, nextY);
        this.isColliding = this.checkCollision(this.x, nextY);
        this.isColliding === false && exit === false ? this.y -= 1 : this.randomDirection();
      }
    }
    else {
      this.randomDirection();
      this.isColliding = false;
    }
  }
  checkCollision(x, y) {
    var colliding;
    for (let i = 0; i < this.obstacles.length; i++) {
      if (x + 32 <= this.obstacles[i][0] || x >= this.obstacles[i][0] + 32 ||
        y + 32 <= this.obstacles[i][1] || y >= this.obstacles[i][1] + 32) {
        colliding = false;
      }
      else {
        colliding = true;
        return colliding
      }
    }
    return colliding
  }
  checkBundaries(x, y) {
    if (x >= this.bundaries[0] * 32 + 8 &&
      x <= (27 - this.bundaries[1]) * 32 + 8 &&
      y >= this.bundaries[2] * 32 + 8 &&
      y <= (11 - this.bundaries[3]) * 32 + 8
    ) {
      return false
    }
    else {
      return true
    }
  }
}

function spawnMonsters(map, ctx) {
  var obstacles = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i] != 2) {
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      obstacles.push([column * 32 + 8, line * 32 + 8]);
    }
  }
  var monsters = [];
  for (let i = 0; monsters.length < 8; i++) {
    var monster = new Monster(map, obstacles, [1, 1, 1, 1]);
    if (map[monster.index] === 2) monsters.push(monster)
  }
  return monsters;
}





export { spawnMonsters };
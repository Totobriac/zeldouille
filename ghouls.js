import { checkExit } from "./maps.js";

class Monster {
  constructor(map, obstacles, ctx) {
    this.x = (Math.floor(Math.random() * 24) + 2) * 32 + 8;
    this.y = (Math.floor(Math.random() * 10) + 1) * 32 + 8;
    this.map = map;
    this.obstacles = obstacles;
    this.direction = Math.floor(Math.random() * 4);
    this.index = this.getIndex();
    this.ctx = ctx;
    this.isColliding = false;
  }
  randomDirection() {
    this.direction = Math.floor(Math.random() * 4);
  }
  getIndex() {
    return (Math.floor((this.y - 8) / 32) * 28 + Math.floor((this.x - 8) / 32));
  }
  move() {
    var index = this.getIndex();
    var exit = checkExit(index);
    if (exit) this.randomDirection();
    if (!this.isColliding) {
      if (this.direction === 0) {
        this.isColliding = this.checkCollision(this.x + 1, this.y);
        if (this.isColliding === false) this.x += 1;
      }
      else if (this.direction === 1) {
        this.isColliding = this.checkCollision(this.x - 1, this.y);
        if (this.isColliding === false) this.x -= 1;
      }
      else if (this.direction === 2) {
        this.isColliding = this.checkCollision(this.x, this.y + 1);
        if (this.isColliding === false) this.y += 1;
      }
      else if (this.direction === 3) {
        this.isColliding = this.checkCollision(this.x, this.y - 1);
        if (this.isColliding === false) this.y -= 1;
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
    var monster = new Monster(map, obstacles, ctx);
    if (map[monster.index] === 2) monsters.push(monster)
  }
  return monsters;
}





export { spawnMonsters };
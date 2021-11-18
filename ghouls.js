import {obstacles} from "./overWorld.js";

class Monster {
  constructor(map, bundaries) {
    this.x = (Math.floor(Math.random() * 24) + 2) * 32 + 8;
    this.y = (Math.floor(Math.random() * 10) + 1) * 32 + 8;
    this.map = map;
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
    for (let i = 0; i < obstacles.length; i++) {
      if (x + 32 <= obstacles[i][0] || x >= obstacles[i][0] + 32 ||
        y + 32 <= obstacles[i][1] || y >= obstacles[i][1] + 32) {
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

function spawnMonsters(map) {  
  var monsters = [];
  for (let i = 0; monsters.length < 8; i++) {
    var monster = new Monster(map, [1, 1, 1, 1]);
    if (map[monster.index] === 2) monsters.push(monster)
  }
  return monsters;
}





export { spawnMonsters };
import { collChecker } from "./functions.js";
import { map } from "./script.js";

var octorok = new Image();
octorok.src = "./assets/beast_1.png";


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
    this.maxDist = 64;
    this.dist = 0;
    this.hasAppeard = false;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.frame = 0;
  }
  randomDirection() {
    this.direction = Math.floor(Math.random() * 4);
  }
  getIndex() {
    return Math.floor((this.y - 8) / 32) * 28 + Math.floor((this.x - 8) / 32);
  }
  move() {
    if (!this.isColliding) {

      if (this.dist > this.maxDist) {
        this.randomDirection();
        this.dist = 0;
      }
      if (this.direction === 0) {
        var nextX = this.x + 1;
        this.checkBundaries(nextX, this.y) === false && this.checkCollision(nextX, this.y).isColliding === false
          ? this.x += 1
          : this.randomDirection();
      }
      else if (this.direction === 1) {
        var nextX = this.x - 1;
        this.checkBundaries(nextX, this.y) === false && this.checkCollision(nextX, this.y).isColliding === false
          ? this.x -= 1
          : this.randomDirection();
      }
      else if (this.direction === 2) {
        var nextY = this.y + 1;
        this.checkBundaries(this.x, nextY) === false && this.checkCollision(this.x, nextY).isColliding === false
          ? this.y += 1
          : this.randomDirection();
      }
      else if (this.direction === 3) {
        var nextY = this.y - 1;
        this.checkBundaries(this.x, nextY) === false && this.checkCollision(this.x, nextY).isColliding === false
          ? this.y -= 1
          : this.randomDirection();
      }
      this.dist += 1;
    }
    else {
      this.randomDirection();
      this.isColliding = false;
    }
  }
  checkCollision(x, y) {
    return collChecker(x, y, map.obstacles);
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

function monsterAnimation(ctx) {

  if (map.monsters) {
    var monstersIndexList = [];
    for (let i = 0; i < map.monsters.length; i++) {

      map.monsters[i].tickCount ++

      if (map.monsters[i].hasAppeard === false) {
        if (map.monsters[i].tickCount < map.monsters[i].maxTickCount) {
          ctx.drawImage(octorok, 0, 128, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        }
        else if (map.monsters[i].tickCount >= map.monsters[i].maxTickCount && map.monsters[i].tickCount < 2 * map.monsters[i].maxTickCount) {
          ctx.drawImage(octorok, 32, 128, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        }
        else {
          map.monsters[i].hasAppeard = true;
        }
      }
      else {
        if (map.monsters[i].tickCount > map.monsters[i].maxTickCount) {
          map.monsters[i].frame === 0 ? map.monsters[i].frame = 1 : map.monsters[i].frame = 0;
          map.monsters[i].tickCount = 0;
        }
        ctx.drawImage(octorok, map.monsters[i].frame * 32, map.monsters[i].direction * 32, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        monstersIndexList.push(map.monsters[i].index);
        map.monsters[i].move();
      }
    }
  };
}

export { spawnMonsters, monsterAnimation };

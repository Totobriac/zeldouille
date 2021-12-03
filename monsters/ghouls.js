import { collChecker } from "../functions.js";
import { map } from "../script.js";

var dyingEffect = new Image();
dyingEffect.src = "./assets/effects.png";


export class Monster {
  constructor(map, bundaries, ctx) {
    this.x = (Math.floor(Math.random() * 24) + 2) * 32 + 8;
    this.y = (Math.floor(Math.random() * 10) + 1) * 32 + 8;
    this.map = map;
    this.ctx = ctx;
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
    this.misileCount = 0;
    this.reload = 200;
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
  checkShot() {
    var dir = [];
    if (this.direction === 0) {
      dir = [1, 0];
    } else if (this.direction === 1) {
      dir = [-1, 0];
    } else if (this.direction === 2) {
      dir = [0, 1];
    } else if (this.direction === 3) {
      dir = [0, -1];
    }
    for (let i = 0; i < 180; i++) {
      var shot = collChecker(this.x + dir[0] * i, this.y + dir[1] * i, map.obstacles);
      if (shot.isColliding === true) return false;
    }
    return true;
  }
  vanish() {
    dyingAnimation(this.x, this.y, this.ctx);
  }
}

class Missile {
  constructor(x, y, direction, speed, maxDist) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.maxDist = maxDist;
    this.dist = 0;
  }
  fly() {
    if (this.direction === 0) {
      this.x += this.speed;
    } else if (this.direction === 1) {
      this.x -= this.speed;
    } else if (this.direction === 2) {
      this.y += this.speed;
    } else if (this.direction === 3) {
      this.y -= this.speed;
    }
    this.dist += this.speed;
  }
}

function monsterAnimation(ctx) {

  if (map.monsters) {
    var monstersIndexList = [];

    for (let i = 0; i < map.monsters.length; i++) {
      map.monsters[i].misileCount++;
      map.monsters[i].tickCount++

      if (map.monsters[i].hasAppeard === false) {
        if (map.monsters[i].tickCount < map.monsters[i].maxTickCount) {
          ctx.drawImage(map.monsters[i].sprite, 0, 128, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        }
        else if (map.monsters[i].tickCount >= map.monsters[i].maxTickCount && map.monsters[i].tickCount < 2 * map.monsters[i].maxTickCount) {
          ctx.drawImage(map.monsters[i].sprite, 32, 128, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
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
        ctx.drawImage(map.monsters[i].sprite, map.monsters[i].frame * 32, map.monsters[i].direction * 32, 32, 32, map.monsters[i].x, map.monsters[i].y, 32, 32);
        monstersIndexList.push(map.monsters[i].index);
        map.monsters[i].move();
      }
      if (map.monsters[i].checkShot() === true &&
        map.monsters[i].misileCount > map.monsters[i].reload) {
        map.monsters[i].misileCount = 0;
        var missile = new Missile(map.monsters[i].x, map.monsters[i].y, map.monsters[i].direction, 4, 280);
        map.missiles.push(missile)
      };
    }
    for (let i = 0; i < map.missiles.length; i++) {
      map.missiles[i].fly();
      if (map.missiles[i].dist < map.missiles[i].maxDist) {
        var dir = [];
        if (map.missiles[i].direction === 0) {
          dir = [0, 160];
        } else if (map.missiles[i].direction === 1) {
          dir = [32, 160];
        } else if (map.missiles[i].direction === 2) {
          dir = [32, 192];
        } else if (map.missiles[i].direction === 3) {
          dir = [0, 192];
        }
        ctx.drawImage(map.monsters[i].sprite, dir[0], dir[1], 32, 32, map.missiles[i].x, map.missiles[i].y, 32, 32);
      }
      else {
        map.missiles.splice(i, 1);
      }
    }

  }
}

function monsterMayem() {
  map.monsters = [];
  map.missiles = [];
}

function dyingAnimation(x, y, ctx) {
  var tickCount = 0;
  var totalTickount = 2800;
  while (tickCount < totalTickount) {
    tickCount++;
    var frame = Math.floor(tickCount / 400);
    ctx.drawImage(dyingEffect, frame * 32, 0, 32, 32, x, y, 32, 32);
  }
}

export { monsterAnimation, monsterMayem };

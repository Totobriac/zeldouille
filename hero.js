import { obstacles, zobi, monstersList } from "./overWorld.js";
import { collChecker } from "./functions.js";

class Hero {
  constructor(x, y, spriteSize) {
    this.x = x;
    this.y = y;
    this.spriteSize = spriteSize;
    this.nextX = x;
    this.nextY = y;
    this.wallCollision = false;
    this.enemyCollison = false;
    this.exit;
  }
  move(direction) {
    this.enemyCollison = collChecker(this.x, this.y, monstersList);
    if (this.enemyCollison.isColliding === true) {
      var dir = this.enemyCollison.object.direction;
      if (dir === 0) {
        this.x += this.wallBounce(1, 0);
      }
      else if (dir === 1) {
        this.x += this.wallBounce(-1, 0);
      }
      else if (dir === 2) {
        this.x += this.wallBounce(0, 1);
      }
      else if (dir === 3) {
        this.x += this.wallBounce(0, -1);
      }
    }

    if (zobi === false) {
      if (direction === 2) {
        this.y += this.align(this.y + 8, 16);
        var nextX = this.x + 4;
        this.wallCollision = this.checkCollision(nextX, this.y).isColliding;
        if (this.wallCollision === false) {
          this.x += 4;
        }
      }
      else if (direction === 3) {
        this.y -= this.align(this.y + 8, 16);
        var nextX = this.x - 4;
        this.wallCollision = this.checkCollision(nextX, this.y).isColliding;
        if (this.wallCollision === false) {
          this.x -= 4;
        }
      }
      else if (direction === 0) {
        this.x += this.align(this.x + 8, 16);
        var nextY = this.y + 4;
        this.wallCollision = this.checkCollision(this.x, nextY).isColliding;
        if (this.wallCollision === false) {
          this.y += 4;
        }
      }
      else if (direction === 1) {
        this.x -= this.align(this.x + 8, 16);
        var nextY = this.y - 4;
        this.wallCollision = this.checkCollision(this.x, nextY).isColliding;
        if (this.wallCollision === false) {
          this.y -= 4;
        }
      }
      this.enemyCollison = collChecker(this.x, this.y, monstersList);
      if (this.enemyCollison === true) {
        if (direction === 0) {
          this.y -= 48;
        }
        else if (direction === 1) {
          this.y += 48;
        }
        else if (direction === 2) {
          this.x -= 48;
        }
        else if (direction === 3) {
          this.x += 48;
        }
      }
    }
    else {
      if (direction != undefined) this.exit = direction;
      if (this.exit === 3 && this.x < 840) this.x += 4;
      else if (this.exit === 2 && this.x > 40) this.x -= 4;
      else if (this.exit === 0 && this.y > 40) this.y -= 2;
      else if (this.exit === 1 && this.y < 328) this.y += 2;
    }
  }
  checkCollision(x, y) {
    return collChecker(x, y, obstacles);
  }
  wallBounce(dirX, dirY) {
    for (let i = 0; i < 48; i++) {
      var bounce = collChecker(this.x + dirX * i, this.y + dirY * i, obstacles);
      if (bounce.isColliding === true) return i;
    }
    return 48;
  }
  align(coord, alignTo) {
    var remainder = coord % alignTo;
    var halfway = alignTo / 2;
    if (remainder > halfway) {
      return alignTo - remainder
    }
    else {
      return remainder
    }
  }
}


export { Hero };
import {
  obstacles,
  zobi,
  monstersList
} from "./overWorld.js";
import {
  collChecker
} from "./functions.js";
import {
  checkExit
} from "./maps.js";

var zeldaSprite = new Image();
zeldaSprite.src = "./dino_up.png";

var zeldaAttackSprite = new Image();
zeldaAttackSprite.src = "./sprite_sheet.png";

class Hero {
  constructor(x, y, spriteSize, ctx) {
    this.x = x;
    this.y = y;
    this.spriteSize = spriteSize;
    this.ctx = ctx;
    this.wallCollision = false;
    this.enemyCollison = false;
    this.exit;
    this.direction = 2;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.totalAttackFrame = 3;
    this.frame = 0;
    this.isMoving = false;
    this.isAttacking = false;
  }
  draw() {
    if (this.isAttacking === false) {
      if(this.frame != 0 && this.frame != 1) this.frame = 0;
      if (this.tickCount > this.maxTickCount) {
        this.tickCount = 0;
        this.frame === 0 ? this.frame = 1 : this.frame = 0
      }
      else {
        if (this.isMoving === true) this.tickCount += 1;
      }

      this.ctx.drawImage(zeldaSprite, 32 * this.frame, 32 * this.direction, 32, 32, this.x, this.y, 32, 32)
    }
  }

  move(direction) {
    if (direction != undefined) this.direction = direction;
    this.enemyCollison = collChecker(this.x, this.y, monstersList);
    if (this.enemyCollison.isColliding === true) {
      var dir = this.enemyCollison.object.direction;
      if (dir === 0) {
        this.x += this.wallBounce(1, 0);
      } else if (dir === 1) {
        this.x -= this.wallBounce(-1, 0);
      } else if (dir === 2) {
        this.y += this.wallBounce(0, 1);
      } else if (dir === 3) {
        this.y -= this.wallBounce(0, -1);
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
      } else if (direction === 3) {
        this.y -= this.align(this.y + 8, 16);
        var nextX = this.x - 4;
        this.wallCollision = this.checkCollision(nextX, this.y).isColliding;
        if (this.wallCollision === false) {
          this.x -= 4;
        }
      } else if (direction === 0) {
        this.x += this.align(this.x + 8, 16);
        var nextY = this.y + 4;
        this.wallCollision = this.checkCollision(this.x, nextY).isColliding;
        if (this.wallCollision === false) {
          this.y += 4;
        }
      } else if (direction === 1) {
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
          this.y -= this.wallBounce(0, -1);
        } else if (direction === 1) {
          this.y += this.wallBounce(0, 1);
        } else if (direction === 2) {
          this.x -= this.wallBounce(-1, 0);
        } else if (direction === 3) {
          this.x += this.wallBounce(1, 0);
        }
      }
    } else {
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
      var exit = checkExit(this.x + dirX * i, this.y + dirY * i);
      var bounce = collChecker(this.x + dirX * i, this.y + dirY * i, obstacles);
      if (bounce.isColliding === true || exit != undefined) return i - 1;
    }
    return 48;
  }
  align(coord, alignTo) {
    var remainder = coord % alignTo;
    var halfway = alignTo / 2;
    if (remainder > halfway) {
      return alignTo - remainder
    } else {
      return remainder
    }
  }
  attack() {
    if (this.isAttacking) {
      if (this.tickCount > this.maxTickCount * 0.5) {
        this.tickCount = 0;
        this.frame < this.totalAttackFrame ? this.frame++ : this.isAttacking = false;
      }
      else {
        this.tickCount += 1;
      }
      var xOffset;
      var yOffset;
      var xHitOffset;
      var yHitOffset;
      switch (this.direction) {
        case 0:
          xOffset = 0;
          yOffset = 0;
          xHitOffset = 0;
          yHitOffset = 20;
          break;
        case 1:
          xOffset = 5;
          yOffset = -23;
          xHitOffset = 0;
          yHitOffset = -20;
          break;
        case 2:
          xOffset = 0;
          yOffset = 0;
          xHitOffset = 20;
          yHitOffset = 0;
          break;
        case 3:
          xOffset = -22;
          yOffset = 0;
          xHitOffset = -20;
          yHitOffset = 0;
          break;
      }
      var hasHitMonster = collChecker(this.x + xHitOffset, this.y + yHitOffset, monstersList);
      if (hasHitMonster.isColliding === true) {
        monstersList.splice(hasHitMonster.index, 1)
      }
      this.ctx.drawImage(zeldaAttackSprite, 54 * this.frame, 56 * this.direction, 54, 56, this.x + xOffset, this.y + yOffset, 54, 56)
    }
  }
}


export {
  Hero
};

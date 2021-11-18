import { obstacles, zobi } from "./overWorld.js";

class Hero {
  constructor(x, y, spriteSize) {
    this.x = x;
    this.y = y;
    this.spriteSize = spriteSize;
    this.nextX = x;
    this.nextY = y;
    this.isColliding = false;
    this.exit;
  }
  move(direction) {
    if (zobi === false) {
      if (direction === 2) {
        var nextX = this.x + 4;
        this.isColliding = this.checkCollision(nextX, this.y);
        if (this.isColliding === false) this.x += 4;
      }
      else if (direction === 3) {
        var nextX = this.x - 4;
        this.isColliding = this.checkCollision(nextX, this.y);
        if (this.isColliding === false) this.x -= 4;
      }
      else if (direction === 0) {
        var nextY = this.y + 4;
        this.isColliding = this.checkCollision(this.x, nextY);
        if (this.isColliding === false) this.y += 4;
      }
      else if (direction === 1) {
        var nextY = this.y - 4;
        this.isColliding = this.checkCollision(this.x, nextY);
        if (this.isColliding === false) this.y -= 4;
      }
    }
    else {
      if (direction != undefined) this.exit = direction;
      console.log(this.exit);
      if (this.exit === 3 && this.x < 840) this.x += 4;
      else if (this.exit === 2 && this.x > 40) this.x -= 4;
      else if (this.exit === 0 && this.y > 40) this.y -= 2;
      else if (this.exit === 1 && this.y < 328) this.y += 2;
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
  
}

export { Hero };
import { map } from "../script.js";

var gannonSprite = new Image();
gannonSprite.src = "./assets/gannon.png";

class Gannon {
  constructor(x, y) {
    this.gannonX = x;
    this.gannonY = y;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.x;
    this.y;
    this.missileTC = 0;
    this.missileDist = 0;
    this.radians;
  }
  checkCollision(x, y) {
    return collChecker(x, y, map.obstacles);
  }
}

function gannonAnimation(ctx) {
  ctx.drawImage(gannonSprite, 0, 64, 64, 64, map.gannon.gannonX, map.gannon.gannonY, 64, 64);
}

export { gannonAnimation, Gannon };
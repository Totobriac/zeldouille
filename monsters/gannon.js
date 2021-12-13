import { map } from "../script.js";

var gannonSprite = new Image();
gannonSprite.src = "./assets/gannon.png";

class Gannon {
  constructor(ctx) {
    this.gannonX = 400;
    this.gannonY = 160;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.ctx = ctx;
    this.x;
    this.y;
    this.missileTC = 0;
    this.missileDist = 0;
    this.radians;
  }
  spawn() {
    this.gannonX = 264 + Math.floor(Math.random() * 320);
    this.gannonY = 104 + Math.floor(Math.random() * 160);
  }
  gannonAnimation() {
    console.log(this.tickCount)
    if (this.tickCount > this.maxTickCount * 25) {
      this.spawn();
      this.tickCount = 0;
    }
    else { this.tickCount ++; }

    this.ctx.drawImage(gannonSprite, 0, 64, 64, 64, this.gannonX, this.gannonY, 64, 64);
  }
}

export { Gannon };

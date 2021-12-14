import {
  map,
  zelda
} from "../script.js";
import {
  animateFireBall
} from "../functions.js";

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
    this.radians;
    this.isFiring = false;
    this.isVisible = false;
  }
  spawn() {
    this.gannonX = 264 + Math.floor(Math.random() * 320);
    this.gannonY = 104 + Math.floor(Math.random() * 160);
  }
  gannonAnimation() {
    if (this.isVisible === true) this.ctx.drawImage(gannonSprite, 0, 64, 64, 64, this.gannonX, this.gannonY, 64, 64);

    if (this.tickCount > this.maxTickCount * 45) {
      this.spawn();
      this.tickCount = 0;
      this.isFiring = false;
      this.isVisible = false;
    }
    else {
      this.tickCount++;
    }

    if (this.tickCount === 200) {
      this.radians = Math.atan2(zelda.y - this.gannonY, zelda.x - this.gannonX);
      this.isFiring = true;
      this.x = this.gannonX;
      this.y = this.gannonY;
    }
    if (this.isFiring === true) {
      if (this.x > 264 && this.x < 648 &&
        this.y > 104 && this.y < 368) {
        var x2 = Math.cos(this.radians) * 5;
        var y2 = Math.sin(this.radians) * 5;
        this.x += x2;
        this.y += y2;
        animateFireBall(this.ctx, this.x, this.y);
      }
    }
  }
}

export {
  Gannon
};

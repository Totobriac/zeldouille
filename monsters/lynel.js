import { Monster } from "./ghouls.js";

var lynel = new Image();
lynel.src = "./assets/lynel.png";

export class Lynel extends Monster {
  constructor(map, bundaries, ctx) {
    super(map, bundaries, ctx);
    this.sprite = lynel;
  }
}

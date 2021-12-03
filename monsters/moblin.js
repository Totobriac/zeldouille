import { Monster } from "./ghouls.js";

var moblin = new Image();
moblin.src = "./assets/beast_2.png";

export class Moblin extends Monster {
  constructor(map, bundaries, ctx) {
    super(map, bundaries, ctx);
    this.sprite = moblin;
  }
}
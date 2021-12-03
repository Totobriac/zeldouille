import { Monster } from "./ghouls.js";

var octorok = new Image();
octorok.src = "./assets/beast_1.png";

export class Octorok extends Monster {
  constructor(map, bundaries, ctx) {
    super(map, bundaries, ctx);
    this.sprite = octorok;
  }
}
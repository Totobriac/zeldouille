import { Hero } from "./hero.js";
import { drawTiles } from "./overWorld.js";
import { Map } from "./map.js";
import { SideBar } from "./sideBar.js";
import { Control } from "./controls.js";
import { monsterAnimation } from "./monsters/ghouls.js";
import { drawTransition } from "./transition.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

var zelda = new Hero(90, 192, 32, ctx);
var sideBar = new SideBar(ctx);
var map = new Map();
var control = new Control(zelda, map);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTiles(ctx);

  zelda.move();

  monsterAnimation(ctx);

  sideBar.draw();

  drawTransition(ctx);

  requestAnimationFrame(animate);
}

animate();

export { map, zelda };

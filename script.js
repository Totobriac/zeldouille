import { Hero } from "./hero.js";
import { drawTiles } from "./overWorld.js";
import { checkAction, Map } from "./map.js";
import { SideBar } from "./sideBar.js";
import { Control } from "./controls.js";
import { monsterAnimation, monsterMayem } from "./monsters/ghouls.js";
import { displayItemsPng } from "./itemsPng.js";
import { action } from "./actions.js";
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
  zelda.draw();
  monsterAnimation(ctx);

  var actionTile = checkAction(zelda.x, zelda.y, map.actual);

  if (actionTile != undefined) {
    monsterMayem();
    map.mapMove(actionTile);
    action(actionTile);
  };

  sideBar.draw();

  displayItemsPng(ctx);

  drawTransition(ctx);

  requestAnimationFrame(animate);
}

animate();

export { map, zelda };

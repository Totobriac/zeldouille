import {drawTiles} from "./overWorld.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

function animate() {
  drawTiles(ctx);
  requestAnimationFrame(animate);
}

animate();
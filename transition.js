import { zelda } from "./script.js";

var hasGameStarted = false;
var tickCount = 0;

function drawTransition(ctx) {
  if (hasGameStarted === false) {
    tickCount++;
    if (tickCount < 150) {
      var xOffset = tickCount * 3;
      ctx.fillStyle = "black";
      ctx.fillRect(8 , 8, 448 - xOffset, 384);
      ctx.fillRect(456 + xOffset, 8, 448 - xOffset, 384);
    }
    else {
      hasGameStarted = true;
      tickCount = 0;
    }
  }

  if (zelda.isEnteringCave === true) {
    tickCount++;
    if (tickCount < 20) {
      ctx.fillStyle = "black";
      ctx.fillRect(8, 8, 896, 384);
    }
    else {
      zelda.isEnteringCave = false;
      tickCount = 0;
    }
  }

  if (zelda.isExitingCave === true) {
    tickCount++;
    if (tickCount < 20) {
      ctx.fillStyle = "black";
      ctx.fillRect(8, 8, 896, 384);
    }
    else {
      zelda.isExitingCave = false;
      tickCount = 0;
    }
  }
}

export { drawTransition }
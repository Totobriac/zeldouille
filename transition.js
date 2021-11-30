import { zelda, map } from "./script.js";

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
    if (tickCount < 100) {
      zelda.x = undefined;
      zelda.y = undefined;
      ctx.fillRect(200,41,32,32);
    }
    else if (tickCount >= 100 && tickCount < 126) {
      ctx.fillStyle = "black";
      ctx.fillRect(8, 8, 896, 384);
      map.actual = 9;
      zelda.x = 440;
      zelda.y = 308;
    }
    else if (tickCount >= 126 && tickCount < 166) {
      zelda.isMoving = true;
      zelda.y --;
    }
    else  {
      zelda.isEnteringCave = false;
      zelda.isMoving = false;
      tickCount = 0;
    }
  }

  if (zelda.isExitingCave === true) {
    tickCount++;
    if (tickCount < 26) {
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

import { map, zelda } from "./script.js";

var tickCount = 0;

function action(i, ctx) {
  switch (i) {
    case 4:
      enterCave(ctx);
      break;
    case 5:
      exitCave();
      break;
    case 6:
      getSword();
      break;
  }
}

function enterCave(ctx) {
  if (zelda.direction === 1 && zelda.y === 40) zelda.isEnteringCave = true;
}

function exitCave() {
  if (zelda.direction === 0) zelda.isExitingCave = true;
}

function getSword() {
  zelda.isGrabingSword = true;
}
export { action };

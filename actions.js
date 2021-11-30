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
  zelda.isEnteringCave = true;
}

function exitCave() {
  zelda.isExitingCave = true;
  map.actual = 3;
  zelda.x = 192;
  zelda.y = 68;
}

function getSword() {
  zelda.isGrabingSword = true;
}
export { action };

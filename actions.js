import { zelda } from "./script.js";

function action(i) {
  switch (i) {
    case 4:
      enterCave(9);
      break;
    case 5:
      exitCave();
      break;
    case 6:
      getSword();
      break;
    case 7:
      enterCave(10);
      break;
    case 8:
      exitCave();
      break;
  }
}

function enterCave(cave) {
  if (zelda.direction === 1 && zelda.y === 40) {
    zelda.isEnteringCave = true;
    zelda.cave = cave
  }
}

function exitCave() {
  if (zelda.direction === 0) zelda.isExitingCave = true;
}

function getSword() {
  zelda.isGrabingSword = true;
}
export { action };

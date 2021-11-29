import { map, zelda } from "./script.js";

function action(i) {
  switch (i) {
    case 4:
      enterCave();
      break;
    case 5:
      exitCave();
      break;
  }
}

function enterCave() {
  zelda.isEnteringCave = true;
  map.actual = 9;
  zelda.x = 440;
  zelda.y = 328;

}

function exitCave() {
  zelda.isExitingCave = true;
  map.actual = 3;
  zelda.x = 192;
  zelda.y = 68;
}

export { action };

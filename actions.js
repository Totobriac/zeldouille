import {
  map,
  zelda
} from "./script.js";

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
  map.actual = 9;
  zelda.x = 440;
  zelda.y = 328;
}
function exitCave() {
  map.actual = 3;
  zelda.x = 192;
  zelda.y = 94;
}

export {action};

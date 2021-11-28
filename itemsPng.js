import { map } from "./script.js";
import { mainMap } from "./maps.js";
import { getTile } from "./functions.js";

var sprites = new Image();
sprites.src = "./sprites.png";

function displayItemsPng(ctx) {
  if (mainMap[map.actual].itemsPng) {
    for (let i = 0; i < mainMap[map.actual].itemsPng.length; i++) {
      var sprite = getTile(mainMap[map.actual].itemsPng[i].img);
      ctx.drawImage(
        sprites,
        sprite[1],
        sprite[0],
        16,
        16,
        mainMap[map.actual].itemsPng[i].x,
        mainMap[map.actual].itemsPng[i].y,
        32,
        32);

    }
  }
}

export { displayItemsPng };
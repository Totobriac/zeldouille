import { map } from "./script.js";
import { mainMap } from "./maps.js";
import { getTile } from "./functions.js";

var sprites = new Image();
sprites.src = "./sprites.png";

var tickCount = 0;
var frame = 0;


function displayItemsPng(ctx) {

  tickCount++;

  if (mainMap[map.actual].itemsPng) {
    for (let i = 0; i < mainMap[map.actual].itemsPng.length; i++) {

      if (mainMap[map.actual].itemsPng[i].frames) {
        if (tickCount % 12 === 0) {
          frame > mainMap[map.actual].itemsPng[i].frames.length -1
           ? frame = 0
           : frame ++
        }
        console.log(frame);
        mainMap[map.actual].itemsPng[i].img = mainMap[map.actual].itemsPng[i].frames[frame];
      }

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
        32
      );
    }
  }
}

export { displayItemsPng };
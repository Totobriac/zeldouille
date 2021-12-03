import {
  map, zelda
} from "../script.js";

var zoraSprite = new Image();
zoraSprite.src = "../assets/zora.png";

class Zora {
  constructor(x, y, waterTiles) {
    this.x = x;
    this.y = y;
    this.waterTiles = waterTiles;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.ringsFrame = 0;
    this.totalCount = 0;
  }
}

function zoraAnimation(ctx) {
  if (map.zora) {
    map.zora.totalCount ++;
    if (map.zora.tickCount > map.zora.maxTickCount) {
      map.zora.ringsFrame === 0 ? map.zora.ringsFrame = 1 : map.zora.ringsFrame = 0;
      map.zora.tickCount = 0;
    } else {
      map.zora.tickCount++;
    }
    ctx.drawImage(zoraSprite, map.zora.ringsFrame * 32, 0,32,32, map.zora.x, map.zora.y, 32, 32);

    if (map.zora.totalCount > 200 && map.zora.totalCount < 400) {
      var zoraFace;
      zelda.y > map.zora.y ? zoraFace = 0: zoraFace = 1;
      ctx.drawImage(zoraSprite, 32 * zoraFace , 32,32,32, map.zora.x, map.zora.y, 32, 32);
    }

    if (map.zora.totalCount === 300) {
      console.log("shoot")      
    }

    if(map.zora.totalCount > 500) {
      var zoraCoord = map.zora.waterTiles[Math.floor(Math.random() * map.zora.waterTiles.length)];
      map.zora.x = zoraCoord.x;
      map.zora.y = zoraCoord.y;
      map.zora.totalCount = 0;
    }
  }
}


export {
  Zora,
  zoraAnimation
};

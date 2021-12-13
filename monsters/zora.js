import { map, zelda } from "../script.js";

var zoraSprite = new Image();
zoraSprite.src = "../assets/zora.png";

class Zora {
  constructor(x, y, waterTiles) {
    this.zoraX = x;
    this.zoraY = y;
    this.waterTiles = waterTiles;
    this.tickCount = 0;
    this.maxTickCount = 12;
    this.ringsFrame = 0;
    this.totalCount = 0;
    this.x;
    this.y;
    this.missileTC = 0;
    this.missileDist = 0;
    this.radians;
  }
}

function zoraAnimation(ctx) {
  if (map.zora) {

    map.zora[0].totalCount++;
    if (map.zora[0].tickCount > map.zora[0].maxTickCount) {
      map.zora[0].ringsFrame === 0 ? map.zora[0].ringsFrame = 1 : map.zora[0].ringsFrame = 0;
      map.zora[0].tickCount = 0;
    } else {
      map.zora[0].tickCount++;
    }
    ctx.drawImage(zoraSprite, map.zora[0].ringsFrame * 32, 0, 32, 32, map.zora[0].zoraX, map.zora[0].zoraY, 32, 32);

    if (map.zora[0].totalCount > 200 && map.zora[0].totalCount < 400) {
      var zoraFace;
      zelda.zoraY > map.zora[0].zoraY ? zoraFace = 0 : zoraFace = 1;
      ctx.drawImage(zoraSprite, 32 * zoraFace, 32, 32, 32, map.zora[0].zoraX, map.zora[0].zoraY, 32, 32);
    }

    if (map.zora[0].totalCount === 300) {
      map.zora[0].radians = Math.atan2(zelda.y - map.zora[0].zoraY, zelda.x - map.zora[0].zoraX);
      map.zora[0].isFiring = true;
      map.zora[0].x = map.zora[0].zoraX;
      map.zora[0].y = map.zora[0].zoraY;
    }

    if (map.zora[0].totalCount > 500) {
      var zoraCoord = map.zora[0].waterTiles[Math.floor(Math.random() * map.zora[0].waterTiles.length)];
      map.zora[0].zoraX = zoraCoord.x;
      map.zora[0].zoraY = zoraCoord.y;
      map.zora[0].totalCount = 0;
      map.zora[0].isFiring = false;
    }

    if (map.zora[0].isFiring === true) {
      if (map.zora[0].x > 40 && map.zora[0].x < 840
        && map.zora[0].y > 40 && map.zora[0].y < 328) {
        var x2 = Math.cos(map.zora[0].radians) * 5;
        var y2 = Math.sin(map.zora[0].radians) * 5;
        map.zora[0].x += x2;
        map.zora[0].y += y2;
        animateFireBall(ctx, map.zora[0].x, map.zora[0].y);
      }
    }
  }
}

var numColumns = 2;
var numRows = 2;
var frameWidth = 32;
var frameHeight = 32;
var currentFrame = 0;
var maxframe = 3;
var tickCount = 0;
var maxTickCount = 12;

function animateFireBall(ctx, x, y) {
  if (tickCount > maxTickCount) {
    currentFrame++;
    tickCount = 0;
  }
  else {
    tickCount++
  }
  if (currentFrame > maxframe) {
    currentFrame = 0;
  }
  var row = Math.floor(currentFrame / numRows);
  var column = currentFrame - (row * 2);
  ctx.drawImage(zoraSprite, column * 32, (row * 32) + 64, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
}


export {
  Zora,
  zoraAnimation
};

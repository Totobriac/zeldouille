import {
  map,
  zelda
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
    this.zoraX;
    this.zoraY;
    this.missileTC = 0;
    this.missileDist = 0;
    this.radians;
  }
}

function zoraAnimation(ctx) {
  if (map.zora) {
    map.zora.totalCount++;
    if (map.zora.tickCount > map.zora.maxTickCount) {
      map.zora.ringsFrame === 0 ? map.zora.ringsFrame = 1 : map.zora.ringsFrame = 0;
      map.zora.tickCount = 0;
    } else {
      map.zora.tickCount++;
    }
    ctx.drawImage(zoraSprite, map.zora.ringsFrame * 32, 0, 32, 32, map.zora.x, map.zora.y, 32, 32);

    if (map.zora.totalCount > 200 && map.zora.totalCount < 400) {
      var zoraFace;
      zelda.y > map.zora.y ? zoraFace = 0 : zoraFace = 1;
      ctx.drawImage(zoraSprite, 32 * zoraFace, 32, 32, 32, map.zora.x, map.zora.y, 32, 32);
    }

    if (map.zora.totalCount === 300) {
      map.zora.radians = Math.atan2(zelda.y - map.zora.y, zelda.x - map.zora.x);
      map.zora.isFiring = true;
      map.zora.zoraX = map.zora.x;
      map.zora.zoraY = map.zora.y;
    }

    if (map.zora.totalCount > 500) {
      var zoraCoord = map.zora.waterTiles[Math.floor(Math.random() * map.zora.waterTiles.length)];
      map.zora.x = zoraCoord.x;
      map.zora.y = zoraCoord.y;
      map.zora.totalCount = 0;
      map.zora.isFiring  = false;
    }

    if (map.zora.isFiring === true) {
      var x2 = Math.cos(map.zora.radians) * 5;
      var y2 = Math.sin(map.zora.radians) * 5;
      map.zora.zoraX += x2;
      map.zora.zoraY += y2;
      animateFireBall(ctx,map.zora.zoraX,map.zora.zoraY);
    }
  }
}

let numColumns = 2;
let numRows = 2;
let frameWidth = 32;
let frameHeight = 32;
let currentFrame = 0;
let maxframe = 3;
let tickCount = 0;
let maxTickCount = 12;

function animateFireBall(ctx,x,y) {  
  if (tickCount > maxTickCount) {
    currentFrame ++;
    tickCount = 0;
  }
  else {
    tickCount ++
  }
  if (currentFrame > maxframe){
        currentFrame = 0;
    }
  let row = Math.floor(currentFrame / numRows);
  let column = currentFrame - (row * 2);
  ctx.drawImage(zoraSprite, column * 32, (row * 32) + 64, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
}


export {
  Zora,
  zoraAnimation
};

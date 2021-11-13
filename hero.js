class Hero {
  constructor(x, y, spriteSize) {
    this.x = x;
    this.y = y;
    this.spriteSize = spriteSize;
    this.nextX = x;
    this.nextY = y;
  }
  moveUp(map) {
    this.nextY = this.y - this.spriteSize;
    this.nextX = this.x;
    var nextTile = this.nextTile(map);
    if (map[nextTile] == 2) this.y -= this.spriteSize;
    checkExit(nextTile);
  }
  moveDown(map) {
    this.nextY = this.y + this.spriteSize;
    this.nextX = this.x;
    var nextTile = this.nextTile(map);
    if (map[nextTile] == 2) this.y += this.spriteSize;
    checkExit(nextTile);
  }
  moveRight(map) {
    this.nextX = this.x + this.spriteSize;
    this.nextY = this.y;
    var nextTile = this.nextTile(map);
    if (map[nextTile] == 2) this.x += this.spriteSize;
    checkExit(nextTile);
  }
  moveLeft(map) {
    this.nextX = this.x - this.spriteSize;
    this.nextY = this.y;
    var nextTile = this.nextTile(map);
    if (map[nextTile] == 2) this.x -= this.spriteSize;
    checkExit(nextTile);
  }
  nextTile(map) {
    return (Math.floor(((this.nextY - 8) / this.spriteSize) * 28) + Math.floor(this.nextX / this.spriteSize));
  }
}

const leftExit = [];
for (let i = 0; i < 13; i++) {
  leftExit.push(i * 28)
}

const rightExit = [];
for (let i = 0; i < 13; i++) {
  rightExit.push(i * 28 + 27)
}

function checkExit(tile) {
  if (tile >= 0 && tile <= 27) {
    console.log("up");
  }
  if (tile >= 308 && tile <= 326) {
    console.log("down");
  }
  if (leftExit.includes(tile)) {
    console.log("left");
  }
  if (rightExit.includes(tile)) {
    console.log("right");
  }
}

export { Hero };
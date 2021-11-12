class Hero {
  constructor(x, y, spriteSize) {
    this.x = x;
    this.y = y;
    this.spriteSize = spriteSize;
    this.nextX = 0;
    this.nextY = 0;
  }
  moveUp(map) {
    this.nextY = this.y - this.spriteSize;
    var nexTile = this.nextTile(map);
    if (map[nexTile] == 2) this.y -= this.spriteSize;
  }
  moveDown(map) {
    this.nextY = this.y + this.spriteSize;
    var nexTile = this.nextTile(map);
    if (map[nexTile] == 2) this.y += this.spriteSize;
  }
  moveRight() {
    this.x += this.spriteSize;
  }
  moveLeft() {
    this.x -= this.spriteSize;
  }
  nextTile(map) {
    return (Math.floor(((this.nextY - 8) / this.spriteSize) * 28) + Math.floor(this.nextX / this.spriteSize));
  }
}

export { Hero };
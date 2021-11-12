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
  }
  moveDown(map) {
    this.nextY = this.y + this.spriteSize;
    this.nextX = this.x;
    var nextTile = this.nextTile(map);
    if (map[nextTile] == 2) this.y += this.spriteSize;
  }
  moveRight(map) {
    this.nextX = this.x + this.spriteSize;
    this.nextY = this.y;
    var nextTile = this.nextTile(map);
    if (map[nextTile] == 2) this.x += this.spriteSize;
  }
  moveLeft(map) {
    this.nextX = this.x - this.spriteSize;
    this.nextY = this.y;
    var nextTile = this.nextTile(map);
    if (map[nextTile] == 2) this.x -= this.spriteSize;
  }
  nextTile(map) {
    return (Math.floor(((this.nextY - 8) / this.spriteSize) * 28) + Math.floor(this.nextX / this.spriteSize));
  }
}

export { Hero };
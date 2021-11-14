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
  exitUp() {
    if (this.y < 328) {
      this.y += 1.69;      
    }    
    else if (this.y > 328){
      this.y = 328;
      this.nextY = 328;
    }    
  }
  exitDown() {
    if (this.y > 40) {
      this.y -= 1.69;      
    }
    else if (this.y < 40){
      this.y = 40;
      this.nextY = 40;
    }
  }
  exitLeft() {
    if (this.x < 840) {
      this.x += 4;      
    }
    else (this.nextX = this.x)
  }
  exitRight() {
    if (this.x > 40) {
      this.x -= 4;      
    }
    else (this.nextX = this.x)
  }  
}

export { Hero };
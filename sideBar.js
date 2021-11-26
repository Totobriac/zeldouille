var itemsSprite = new Image();
itemsSprite.src = "./heart.png";

class  SideBar {
  constructor(ctx) {
    this.x = 912;
    this.y = 8;
    this.width = 280;
    this.height = canvas.height - 16;
    this.backColor = "black";
    this.mapColor = "rgb(116,116,116)";
    this.mapOffset = 24;
    this.mapHeight = 120;
    this.ctx = ctx;
  }
  draw(oldMap) {
    this.ctx.fillStyle = this.backColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = this.mapColor;
    this.ctx.fillRect(this.x + this.mapOffset , this.height - this.mapHeight - this.mapOffset + 8, this.width - this.mapOffset * 2 , this.mapHeight);

    this.ctx.font = "bold 30px pixel";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText("-LIFE-", 1052, 50);

    this.ctx.fillStyle = "green";

    var line = Math.floor(oldMap / 3);
    var column = oldMap - line * 3;

    this.ctx.fillRect(this.x + this.mapOffset +( column * 77) + 38 , this.height - this.mapHeight - this.mapOffset + 28 + (line * 40),10,10);

    this.ctx.fillStyle = "red";
    this.ctx.drawImage(itemsSprite, 28,0 ,28,32, 980,100,28,32)
  }
}

export {SideBar};

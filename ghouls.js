import { checkExit } from "./maps.js"

class Monster {
  constructor(map) {
    this.x = (Math.floor(Math.random() * 24) + 2) * 32 + 8;
    this.y = (Math.floor(Math.random() * 10) + 1) * 32 + 8;
    this.index = Math.floor(((this.y - 8) / 32) * 28) + Math.floor((this.x - 8) / 32);
    this.map = map;
    this.direction = Math.floor(Math.random() * 4);
  }
  randomDirection() {
    this.direction = Math.floor(Math.random() * 4);
  }
  move() {
    this.index = Math.floor(((this.y - 8) / 32) * 28) + Math.floor((this.x - 8) / 32);

    if (this.direction === 0) {
      var isExiting = checkExit(this.index + 1);
      if (this.map[this.index + 1] === 2 && isExiting === undefined) {
        this.x += 1;
      }
      else { this.randomDirection() }
    }
    if (this.direction === 1) {
      var isExiting = checkExit(this.index);
      if (this.map[this.index] === 2 && isExiting === undefined) {
        this.x -= 1;
      }
      else { this.randomDirection() }
    }
    if (this.direction === 2) {
      var isExiting = checkExit(this.index + 1);
      var nextY = this.y + 32;
      var next = nextTile(this.map, this.x, nextY);
      console.log(next)
      if (this.map[next] === 2 && isExiting === undefined) {
        while (this.y < nextY) this.y += 0.00001;
      }
      else { this.randomDirection() }
    }
    if (this.direction === 3) {
      var isExiting = checkExit(this.index);
      var nextY = this.y - 32;
      var next = nextTile(this.map, this.x, nextY);
      if (this.map[next] === 2 && isExiting === undefined) {
        while (this.y > nextY) this.y -= 0.00001;
      }
      else { this.randomDirection() }
    }
  }
}


function spawnMonsters(map) {
  var monsters = [];
  for (let i = 0; monsters.length < 6; i++) {
    var monster = new Monster(map);
    if (map[monster.index] === 2) monsters.push(monster)
  }
  return monsters;
}

function nextTile(map, x, y) {
  return (Math.floor(((y - 8) /32) * 28) + Math.floor(x /32));
}



export { spawnMonsters };
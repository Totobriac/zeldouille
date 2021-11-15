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
    console.log(this.direction)
  }
  move() {
    this.index = Math.floor(((this.y - 8) / 32) * 28) + Math.floor((this.x - 8) / 32);
    console.log(this.direction)
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
      if (this.map[this.index + 1] === 2 && isExiting === undefined) {
        this.y += 1;
      }
      else { this.randomDirection() }
    }
    if (this.direction === 3) {
      var isExiting = checkExit(this.index);
      if (this.map[this.index] === 2 && isExiting === undefined) {
        this.y -= 1;
      }
      else { this.randomDirection() }
    }
  }
}


function spawnMonsters(map) {
  var monsters = [];
  for (let i = 0; monsters.length < 1; i++) {
    var monster = new Monster(map);
    if (map[monster.index] === 2) monsters.push(monster)
  }
  return monsters;
}

function nextTile(map) {
  return (Math.floor(((this.nextY - 8) / this.spriteSize) * 28) + Math.floor(this.nextX / this.spriteSize));
}



export { spawnMonsters };
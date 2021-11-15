import { checkExit } from "./maps.js"

class Monster {
  constructor(map) {
    this.x = (Math.floor(Math.random() * 24) + 2) * 32 + 8;
    this.y = (Math.floor(Math.random() * 10) + 1) * 32 + 8;
    this.map = map;
    this.direction = Math.floor(Math.random() * 4);
    this.index = this.getIndex();
  }
  randomDirection() {
    this.direction = Math.floor(Math.random() * 4);
  }
  getIndex() {
    return (Math.floor(((this.y - 8) / 32) * 28) + Math.floor((this.x - 8) / 32));
  }
  move() {
    this.index = this.getIndex();
    var isExiting;
    this.direction === 0 || this.direction === 2
      ? isExiting = checkExit(this.index + 1)
      : isExiting = checkExit(this.index);

    if (this.direction === 0) {
      if (this.map[this.index + 1] === 2 && isExiting === undefined) {
        this.x += 1;
      }
      else { this.randomDirection() }
    }
    if (this.direction === 1) {
      if (this.map[this.index] === 2 && isExiting === undefined) {
        this.x -= 1;
      }
      else { this.randomDirection() }
    }
    if (this.direction === 2) {
      if (this.map[this.index + 28] === 2 && isExiting === undefined) {

        this.y += 32;
        console.log(this.index);
        }
        // var nextY = this.y + 32;
        // var next = nextTile(this.map, this.x, nextY);
        // if (this.map[next] === 2 && isExiting === undefined) {
        //   this.y += 32;
        // }
        else { this.randomDirection() }
    }
    if (this.direction === 3) {
      var nextY = this.y - 32;
      var next = nextTile(this.map, this.x, nextY);
      if (this.map[next] === 2 && isExiting === undefined) {
        this.y -= 32;
      }
      else { this.randomDirection() }
    }
  }
}


function spawnMonsters(map) {
  var monsters = [];
  for (let i = 0; monsters.length < 8; i++) {
    var monster = new Monster(map);
    if (map[monster.index] === 2) monsters.push(monster)
  }
  return monsters;
}

function nextTile(map, x, y) {
  return (Math.floor(((y - 8) / 32) * 28) + Math.floor(x / 32));
}



export { spawnMonsters };
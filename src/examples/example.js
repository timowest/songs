const Player = require("../player")
const phrase = require("../phrase")
const {major} = require("../scale")

// melody 1
let phrase1 = phrase(
        [3/3, 3/3, 2/3, 1/3, 3/3],
        [  0,   0,   0,   1,   2]) 

 let phrase2 = phrase(
        [2/3,  1/3,  2/3,  1/3,  6/3],
        [  2,    1,    2,    3,    4])      

 let melody1 = phrase1.then(phrase2)
     .tempo(90)
     .where("pitch", major)
     .where("pitch", p => p + 44)

// melody 2
function arpeggio(start, steps) {
  let pitches = []
  for (var i = 0; i < steps; i++) {
    pitches.push(start + i * 2)  
  }
  return phrase([1], pitches)
}

let melody2 = arpeggio(0, 4)
        .then(arpeggio(1, 4))
        .then(arpeggio(2, 4))
        .tempo(120)
        .where("pitch", major)
        .where("pitch", p => p + 44)

let player = new Player()
player.openPort(0)
player.play(melody2)

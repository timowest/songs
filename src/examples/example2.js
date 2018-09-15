const Player = require("../player")
const phrase = require("../phrase")
const {major} = require("../scale")

// Visa från Utanmyra
// based on https://musescore.com/user/3541/scores/3169751

// Piano & Upright Bass

let empty = ["4", "."]

let rhs = [
  empty,
  empty,
  empty,
  ["3 0.5 0.5",     ". E5 D5"],

  ["1 1 1 0.5 0.5", "C5 A4 G#4 G#4 E4"],
  ["2 1 0.5 0.5",   "A4 . B4 D#5"],
  ["1 1 1 0.5 0.5", "E5 E5 E5 D5 B4"],
  ["2 1 0.5 0.5",   "C5 B4 E5 D5"],

  ["1 1 1 0.5 0.5", "C5 A4 G#4 G#4 E4"],
  ["2 1 0.5 0.5",   "A4 . B4 D#5"],
  ["1 1 1 0.5 0.5", "E5 E5 E5 D5 B4"],
  ["2 1.5 0.5",     "C5 B4 B4"],

  ["1 1 1 0.5 0.5", "C5 A4 B4 C5 D5"],
  ["3 0.5 0.5",   "E5 . E5"],
  ["1 1 1 1",       "G5 E5 E5 C5"],
  ["2 1 0.5 0.5",   "D5 . Eb5 D5"], // TODO

  ["1 0.5 0.5 1 1", "C5 B4 A4 G#4 E4"],
  ["2 1 0.5 0.5",   "A4 G4 G5 E5"],
  ["1 0.5 0.5 1 1", "C5 E5 D5 B4 G4"],
  ["4",             "A4"] 
]

let lhs = [
  ["2 1 0.5 0.5",   "A2 E3 E2 G#2"],
  ["2 1 0.5 0.5",   "A2 E3 E2 G#2"],
  ["2 1 0.5 0.5",   "A2 E3 E2 G#2"],
  ["2 1 1",         "A2 E3 ."],

  ["2 2",           "A2 E2"],
  ["1.5 0.5 1 1",   "A2 B2 C3 B2"],
  ["1 1 1 1",       "C3 B2 C3 D3"],
  ["2 2",           "E3 E2"],

  ["2 2",           "A2 E2"],
  ["1.5 0.5 1 1",   "A2 B2 C3 B2"],
  ["1 1 1 1",       "C3 B2 C3 D3"],
  ["2 2",           "E3 E2"],

  ["2 2",           "A2 G2"],
  ["2 2",           "C3 B2"],
  ["2 2",           "A2 G2"],
  ["2 2",           "F2 E2"],

  ["2 2",           "A2 E2"],
  ["1 0.5 0.5 1 0.5 0.5", "F2 A2 B2 C3 E3 F3"],
  ["2 2",           "G3 G2"],
  ["2 1 0.5 0.5",   "A2 E3 E2 G#2"],

  ["2 1 0.5 0.5",   "A2 E3 E2 G#2"],
  ["2 1 0.5 0.5",   "A2 E3 E2 G#2"],
  ["4",             "A2"]
]

function combine(arr) {
  return arr.reduce((acc, [d, n]) => acc.then(phrase(d, n)), [])
}

let melody = [lhs, rhs].map(combine).reduce((acc, c) => acc.concat(c), [])

let player = new Player()
player.openPort(0)
player.play(melody.tempo(96))

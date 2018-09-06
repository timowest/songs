function scale(intervals) {
  let notes = [0]
  let last = 0
  intervals.forEach((v) => {
    notes.push(last + v)
    last += v
  })
  let fn = function(pitch) {
    let idx = pitch % notes.length
    return pitch - idx + notes[idx]
  }	
  fn.intervals = intervals
  return fn
}

const major = scale([2, 2, 1, 2, 2, 2, 1])
const blues = scale([3, 2, 1, 1, 3, 2])
const pentatonic = scale([3, 2, 2, 3, 2])
const chromatic = scale([1])

function mode({intervals}, n) {
  intervals = intervals.slice(0)	
  let removed = intervals.splice(0, n)
  return scale(intervals.concat(removed))
}

const ionian = mode(major, 0)
const dorian = mode(major, 1)
const phrygian = mode(major, 2)
const lydian = mode(major, 3)
const mixolydian = mode(major, 4)
const aeolian = mode(major, 5)
const locrian = mode(major, 6)

const low = pitch => pitch - 12
const high = pitch => pitch + 12
const lower = pitch => pitch - 7
const raise = pitch => pitch + 7

module.exports = {
	scale, major, blues, pentatonic, chromatic, mode, 
	ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian,
  low, high, lower, raise}
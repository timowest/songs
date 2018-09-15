const notes = {
  "C":  60,
  "C#": 61, "Db": 61,
  "D":  62,
  "D#": 63, "Eb": 63,
  "E":  64,
  "F":  65,
  "F#": 66, "Gb": 66,
  "G":  67,
  "G#": 68, "Ab": 68,
  "A":  69,
  "A#": 70, "Bb": 70,
  "B":  71
}

// TODO chords

Object.keys(notes).forEach(k => {
  [0, 1, 2, 3, 4, 5, 6, 7].forEach(offset => {
    notes[k + offset] = notes[k] + (offset - 4) * 12
  })
})


module.exports = notes
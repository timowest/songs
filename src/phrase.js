// {time, pitch, duration, channel}

class Phrase {
  constructor(notes) {
    this.notes = notes
  }

  // scale time and duration
  tempo(bpm) {
    let timing = 60 / bpm * 1000
    return this.map(n => ({
      ...n,
      time: n.time && (n.time * timing),
      duration: n.duration && (n.duration * timing)
    }))
  }

  where(key, mapper) {
    return this.map(n => ({...n, [key]: mapper(n[key])}))
  }

  map(mapper) {
    return new Phrase(this.notes.map(mapper))
  }

  then(phrase) {
    let end = this.end
    let shifted = phrase.notes.map(n => ({...n, time: n.time + end}))
    return new Phrase(this.notes.concat(shifted))
  }

  get end() {
    return this.notes.reduce((acc, n) => {
      return Math.max(acc, n.time + n.duration)
    }, 0)
  }
}

// factory method for phrase creation
function phrase(durations, pitches, velocities) {
  let max = Math.max(
    durations ? durations.length : 0,
    pitches ? pitches.length : 0,
    velocities ? velocities.length : 0)
  let notes = []
  let time = 0
  for (var i = 0; i < max; i++) {
    notes.push({
      time,
      duration: durations && durations[i % durations.length],
      pitch: pitches && pitches[i % pitches.length],
      velocity: velocities && velocities[i % velocities.length]
    })
    time += notes[i].duration
  }
  return new Phrase(notes)
}

module.exports = phrase
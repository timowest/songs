// {time, pitch, duration, channel}

Array.prototype.tempo = function(bpm) {
  let timing = 60 / bpm * 1000
  return this.map(n => ({
    ...n,
    time: n.time && (n.time * timing),
    duration: n.duration && (n.duration * timing)
  }))
}

Array.prototype.where = function(key, mapper) {
  return this.map(n => ({...n, [key]: mapper(n[key])}))
}

Array.prototype.then = function(notes) {
  let end = this.end()
  let shifted = notes.map(n => ({...n, time: n.time + end}))
  return this.concat(shifted)
}

Array.prototype.end = function() {
  return this.reduce((acc, n) => {
    return Math.max(acc, n.time + n.duration)
  }, 0)
}

function utter(notes, time, duration, pitch, velocity) {
  if (typeof duration === "object") {
    return duration.reduce((time, d) => {
      return utter(notes, time, d, pitch, velocity)
    }, time)
  } else if (typeof pitch === "object") {
    pitch.forEach(p => utter(notes, time, duration, p, velocity))
  } else if (typeof pitch === "number") {
    notes.push({time, duration, pitch, velocity})
  }
  return time + duration
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
    let duration = durations && durations[i % durations.length] 
    let pitch = pitches && pitches[i % pitches.length]
    let velocity = velocities && velocities[i % velocities.length]
    time = utter(notes, time, duration, pitch, velocity)
  }
  notes.forEach(n => {
    if (n.velocity === undefined) 
      delete n.velocity
  })
  return notes
}

module.exports = phrase
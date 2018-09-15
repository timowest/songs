const symbols = require("./symbols")

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
  } else {
    notes.push({time, duration})
  }
  return time + duration
}

function normalize(v) {
  if (typeof v === "string") {
    return v.split(" ").map(vv => {
      if (vv === ".")
        return undefined
      else
        return symbols[vv] || parseFloat(vv)
    })
  }
  return v || []
}

// factory method for phrase creation
function phrase(durations, pitches, velocities) {
  durations = normalize(durations)
  pitches = normalize(pitches)
  velocities = normalize(velocities)
  let max = Math.max(
    durations.length,
    pitches.length,
    velocities.length)
  let notes = []
  let time = 0
  for (var i = 0; i < max; i++) {
    let duration = durations[i % durations.length] 
    let pitch = pitches[i % pitches.length]
    let velocity = velocities[i % velocities.length]
    time = utter(notes, time, duration, pitch, velocity)
  }
  notes.forEach(n => {
    if (n.velocity === undefined) 
      delete n.velocity
  })
  return notes
}

module.exports = phrase
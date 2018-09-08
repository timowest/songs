const midi = require('midi')

// TODO better scheduling

class Player {
  constructor() {
    this.output = new midi.output()
  }

  openPort(port) {
    this.output.openPort(port)
  }

  play(phrase) {
    let out = this.output
    let fns = []
    let highest = 0
    phrase.forEach(n => {
      let channel = n.channel || 1
      fns.push({
        time: n.time,
        fn: () => { 
          out.sendMessage([143 + channel, n.pitch, n.velocity || 127]) }
      })
      fns.push({
        time: n.time + n.duration,
        fn: () => { 
          out.sendMessage([127 + channel, n.pitch, n.velocity || 127]) }
      })
    })
    fns.forEach(ev => setTimeout(ev.fn, ev.time))
    setTimeout(() => out.closePort(), phrase.end() + 1000)
  }
}

module.exports = Player
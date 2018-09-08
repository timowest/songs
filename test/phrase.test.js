let phrase = require("../src/phrase")

describe("phrase", () => {	
  it("repetition works", () => {
    expect(phrase([1, 2, 3], [1])).toEqual([
      {duration: 1, pitch: 1, time: 0},
      {duration: 2, pitch: 1, time: 1},
      {duration: 3, pitch: 1, time: 3}
    ])
  })

  it("velocity works", () => {
  	expect(phrase([1, 2, 3, 4], [1], [50, 70])).toEqual([
      {duration: 1, pitch: 1, time: 0, velocity: 50},
      {duration: 2, pitch: 1, time: 1, velocity: 70},
      {duration: 3, pitch: 1, time: 3, velocity: 50},
      {duration: 4, pitch: 1, time: 6, velocity: 70}
    ])
  })

  it("note arrays work", () => {
    expect(phrase([1], [[0, 2, 4], [1, 3, 5], [2, 4, 6]])).toEqual([
      {duration: 1, pitch: 0, time: 0},
      {duration: 1, pitch: 2, time: 0},
      {duration: 1, pitch: 4, time: 0},

      {duration: 1, pitch: 1, time: 1},
      {duration: 1, pitch: 3, time: 1},
      {duration: 1, pitch: 5, time: 1},

      {duration: 1, pitch: 2, time: 2},
      {duration: 1, pitch: 4, time: 2},
      {duration: 1, pitch: 6, time: 2}
    ])
  })

  it("duration arrays work", () => {
    expect(phrase([[2, 1], [1, 2], [2, 1]], [0, 2, 4])).toEqual([
      {duration: 2, pitch: 0, time: 0},
      {duration: 1, pitch: 0, time: 2},

      {duration: 1, pitch: 2, time: 3},
      {duration: 2, pitch: 2, time: 4},

      {duration: 2, pitch: 4, time: 6},
      {duration: 1, pitch: 4, time: 8}
    ])
  })

  it("end works", () => {
  	let p = phrase([1, 2, 3], [1])
  	expect(p.end()).toBe(6)
  })

  it("then works", () => {
    let p = phrase([1, 2], [1]).then(phrase([3], [1]))
    expect(p).toEqual([
      {duration: 1, pitch: 1, time: 0},
      {duration: 2, pitch: 1, time: 1},
      {duration: 3, pitch: 1, time: 3}
    ])
  })

  it("tempo works", () => {
  	let p = phrase([1, 2, 3], [1]).tempo(120)
  	expect(p).toEqual([
      {duration: 500, pitch: 1, time: 0},
      {duration: 1000, pitch: 1, time: 500},
      {duration: 1500, pitch: 1, time: 1500}
  	])
  })

  it("where works", () => {
  	// TODO
  })
})
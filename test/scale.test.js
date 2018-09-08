let {major, dorian, low, lower, high, raise} = require("../src/scale")

describe("scale", () => {
  it("major", () => {
    let notes = [0, 1, 2, 3, 4, 5, 6, 7]
    expect(notes.map(major)).toEqual([0, 2, 4, 5, 7, 9, 11, 12])
  })

  // FIXME
  /*it("major extended", () => {
    let notes = [2, 3, 4, 5, 6, 7, 8, 9]
    expect(notes.map(major)).toEqual([4, 5, 7, 9, 11, 12, 14, 16])
  })*/

  it("dorian", () => {
    let notes = [0, 1, 2, 3, 4, 5, 6, 7]
    expect(notes.map(dorian)).toEqual([0, 2, 3, 5, 7, 9, 10, 12])
  })

  it("low", () => {
  	expect(low(2)).toBe(-10)
  })

  it("lower", () => {
  	expect(lower(2)).toBe(-5)
  })

  it("high", () => {
  	expect(high(2)).toBe(14)
  })

  it("raise", () => {
  	expect(raise(2)).toBe(9)
  })
})
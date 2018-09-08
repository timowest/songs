function triad(base) {
  return [base, base + 2, base + 4]
}

function seventh(base) {
  return [base, base + 2, base + 4, base + 6]	
}

function ninth(base) {
  return [base, base + 2, base + 4, base + 6, base + 8]	
}

function inversion(chord, n) {
  // TODO	
}

function augment(chord, k, n) {
  // TODO	
}

module.exports = {triad, seventh, ninth, inversion, augment}
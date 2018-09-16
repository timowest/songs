function swing(len1, len2) {
  const diff = len1 - 0.5
  return note => {
    let {duration, time} = note
    if (time % 1.0 === 0.5) {
      time += diff
      duration -= diff
      return {...note, time, duration} 	
    }
    return note	
  }
}


module.exports = { swing }
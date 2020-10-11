function match(string) {
  let findA = false
  let findB = false
  let findC = false
  let findD = false
  let findE = false
  for (const c of string) {
    if (c === 'a') {
      findA = true
    } else if (findA && c === 'b') {
      findB = true
    } else if (findB && c === 'c') {
      findC = true
    } else if (findC && c === 'd') {
      findD = true
    } else if (findD && c === 'e') {
      findE = true
    } else if (findE && c === 'f') {
      return true
    } else {
      findA = false
      findB = false
      findC = false
      findD = false
      findE = false
    }
  }
  return false
}
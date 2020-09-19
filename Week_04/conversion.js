
function conversion(string) {
  const len = string.length
  const arr = []
  for (let i = 0; i < len; i += 1) {
    const p = string.codePointAt(i)
    arr.push(p)
  }
  return arr
}

conversion('欲上九天揽月')

const pattern = [
  [0, 0, 2],
  [0, 1, 0],
  [0, 0, 0],
]

let color = 1 // 'O'先落子

const wrap = document.getElementById('wrap')

function show() {
  wrap.innerHTML = ''

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      const temp = pattern[i][j] === 1 ? 'O' : pattern[i][j] === 2 ? 'X' : ''
      cell.innerText = temp
      cell.addEventListener('click', () => handleClick(j, i))
      wrap.appendChild(cell)
    }
  }
}


function handleClick(x, y) {
  if (pattern[y][x] !== 0) return
  pattern[y][x] = color
  if (check(pattern, color)) {
    alert(`${color === 1 ? 'O': 'X'} is win`)
  }
  color = 3 - color
  if (canWin(pattern, color)) console.log(`${color === 1 ? 'O': 'X'} can win`)
  show()
}

// note 此处，可以使用另外的判定方法（类似五子棋的那种）
function check(pattern, color) {
  for (let i = 0; i < 3; i += 1) {
    let result = true
    for (let j = 0; j < 3; j += 1) {
      if (pattern[i][j] !== color) result = false
    }
    if (result) return true
  }

  for (let i = 0; i < 3; i += 1) {
    let result = true
    for (let j = 0; j < 3; j += 1) {
      if (pattern[j][i] !== color) result = false
    }
    if (result) return true
  }

  {
    let result = true
    for (let i = 0; i < 3; i += 1) {
      if (pattern[i][i] !== color) result = false
    }
    if (result) return true
  }

  {
    let result = true
    for (let i = 0; i < 3; i += 1) {
      if (pattern[i][2 - i] !== color) result = false
    }
    if (result) return true
  }
  return false
}

function copy(data) {
  return JSON.parse(JSON.stringify(data))
}

function canWin(pattern, color) {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (pattern[i][j] !== 0) continue
      const temp = copy(pattern)
      temp[i][j] = color
      if (check(temp, color)) return [j, i]
    }
  }
  return null
}

// 最优策略
function bestChoice(pattern, color) {
  let p
  if (p = canWin(pattern, color)) {
    return {
      point: p,
      result: 1
    }
  }

  let result = -2
  let point = null
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (pattern[i][j]) continue
      let temp = copy(pattern)
      temp[i][j] = color
      let r = bestChoice(temp, 3 - color).result
      if ( -r > result) {
        result = -r
        point = [j, i]
      }
    }
  }

  return {
    point,
    result: point ? result : 0
  }
}

show()
console.log(bestChoice(pattern, color))
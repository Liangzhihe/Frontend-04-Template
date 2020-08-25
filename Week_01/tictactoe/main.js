const pattern = [
  [0, 0, 0],
  [0, 0, 0],
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
  if (willWin(pattern, color)) console.log(`${color === 1 ? 'O': 'X'} will win`)
  show()
}

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

function willWin(pattern, color) {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (pattern[i][j] !== 0) continue
      const temp = copy(pattern)
      temp[i][j] = color
      if (check(temp, color)) return true
    }
  }
  return false
}

show()

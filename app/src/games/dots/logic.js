export const BOX_ROWS = 4
export const BOX_COLS = 4

export function emptyLines(rows = BOX_ROWS, cols = BOX_COLS) {
  return {
    h: Array.from({ length: rows + 1 }, () => Array(cols).fill(false)),
    v: Array.from({ length: rows }, () => Array(cols + 1).fill(false)),
    owners: Array.from({ length: rows }, () => Array(cols).fill(null)),
  }
}

export function boxSides(state, row, col) {
  let count = 0
  if (state.h[row][col]) count += 1
  if (state.h[row + 1][col]) count += 1
  if (state.v[row][col]) count += 1
  if (state.v[row][col + 1]) count += 1
  return count
}

function clone(state) {
  return {
    h: state.h.map((row) => row.slice()),
    v: state.v.map((row) => row.slice()),
    owners: state.owners.map((row) => row.slice()),
  }
}

export function applyLine(state, kind, row, col, player) {
  const next = clone(state)
  if (kind === 'h') {
    if (next.h[row]?.[col] !== false) return null
    next.h[row][col] = true
  } else if (next.v[row]?.[col] !== false) {
    return null
  } else {
    next.v[row][col] = true
  }
  const completed = []
  for (let boxRow = 0; boxRow < next.owners.length; boxRow += 1) {
    for (let boxCol = 0; boxCol < next.owners[0].length; boxCol += 1) {
      if (!next.owners[boxRow][boxCol] && boxSides(next, boxRow, boxCol) === 4) {
        next.owners[boxRow][boxCol] = player
        completed.push([boxRow, boxCol])
      }
    }
  }
  return { state: next, completed }
}

export function availableMoves(state) {
  const moves = []
  state.h.forEach((row, rowIndex) => {
    row.forEach((taken, colIndex) => {
      if (!taken) moves.push({ kind: 'h', row: rowIndex, col: colIndex })
    })
  })
  state.v.forEach((row, rowIndex) => {
    row.forEach((taken, colIndex) => {
      if (!taken) moves.push({ kind: 'v', row: rowIndex, col: colIndex })
    })
  })
  return moves
}

export function chooseComputerMove(state, random = Math.random) {
  const completing = []
  const safe = []
  const giving = []
  for (const move of availableMoves(state)) {
    const result = applyLine(state, move.kind, move.row, move.col, 'computer')
    if (!result) continue
    if (result.completed.length) {
      completing.push(move)
      continue
    }
    let gives = false
    for (let row = 0; row < result.state.owners.length && !gives; row += 1) {
      for (let col = 0; col < result.state.owners[0].length; col += 1) {
        if (!result.state.owners[row][col] && boxSides(result.state, row, col) === 3) {
          gives = true
          break
        }
      }
    }
    ;(gives ? giving : safe).push(move)
  }
  const pool = completing.length ? completing : safe.length ? safe : giving
  if (!pool.length) return null
  return pool[Math.floor(random() * pool.length)]
}

export function score(state, player) {
  return state.owners.flat().filter((owner) => owner === player).length
}

export function isOver(state) {
  return state.owners.flat().every(Boolean)
}

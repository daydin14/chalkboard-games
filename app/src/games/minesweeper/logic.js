export const ROWS = 10
export const COLS = 10
export const MINES = 10

function neighbors(row, col, rows, cols) {
  const cells = []
  for (let dRow = -1; dRow <= 1; dRow += 1) {
    for (let dCol = -1; dCol <= 1; dCol += 1) {
      if (!dRow && !dCol) continue
      const nextRow = row + dRow
      const nextCol = col + dCol
      if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) cells.push([nextRow, nextCol])
    }
  }
  return cells
}

export function createBoard({ rows = ROWS, cols = COLS, mines = MINES, safe, random = Math.random } = {}) {
  const blocked = new Set()
  if (safe) {
    blocked.add(`${safe.row},${safe.col}`)
    neighbors(safe.row, safe.col, rows, cols).forEach(([row, col]) => blocked.add(`${row},${col}`))
  }
  const open = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!blocked.has(`${row},${col}`)) open.push([row, col])
    }
  }
  for (let index = open.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    ;[open[index], open[swap]] = [open[swap], open[index]]
  }
  const mineSet = new Set(open.slice(0, mines).map(([row, col]) => `${row},${col}`))
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => {
      const mine = mineSet.has(`${row},${col}`)
      const adjacent = mine
        ? 0
        : neighbors(row, col, rows, cols).filter(([r, c]) => mineSet.has(`${r},${c}`)).length
      return { mine, adjacent, revealed: false, flagged: false }
    }),
  )
}

function clone(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })))
}

export function reveal(board, row, col) {
  const next = clone(board)
  const cell = next[row][col]
  if (cell.revealed || cell.flagged) return { board: next, hitMine: false }
  if (cell.mine) {
    next.forEach((line) =>
      line.forEach((spot) => {
        if (spot.mine) spot.revealed = true
      }),
    )
    return { board: next, hitMine: true }
  }
  const stack = [[row, col]]
  while (stack.length) {
    const [r, c] = stack.pop()
    const spot = next[r][c]
    if (spot.revealed || spot.flagged || spot.mine) continue
    spot.revealed = true
    if (spot.adjacent === 0) stack.push(...neighbors(r, c, next.length, next[0].length))
  }
  return { board: next, hitMine: false }
}

export function toggleFlag(board, row, col) {
  const next = clone(board)
  if (!next[row][col].revealed) next[row][col].flagged = !next[row][col].flagged
  return next
}

export function countFlags(board) {
  return board.flat().filter((cell) => cell.flagged).length
}

export function isWin(board) {
  return board.flat().every((cell) => cell.mine || cell.revealed)
}

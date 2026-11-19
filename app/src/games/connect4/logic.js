export const ROWS = 6
export const COLS = 7

export function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

export function drop(board, col, player) {
  if (col < 0 || col >= COLS) return null
  const next = board.map((row) => row.slice())
  for (let row = ROWS - 1; row >= 0; row -= 1) {
    if (!next[row][col]) {
      next[row][col] = player
      return { board: next, row }
    }
  }
  return null
}

export function findWin(board) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ]
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const player = board[row][col]
      if (!player) continue
      for (const [dRow, dCol] of directions) {
        const cells = []
        for (let step = 0; step < 4; step += 1) {
          const nextRow = row + dRow * step
          const nextCol = col + dCol * step
          if (
            nextRow < 0 ||
            nextRow >= ROWS ||
            nextCol < 0 ||
            nextCol >= COLS ||
            board[nextRow][nextCol] !== player
          ) {
            break
          }
          cells.push([nextRow, nextCol])
        }
        if (cells.length === 4) return { player, cells }
      }
    }
  }
  return null
}

export function isDraw(board) {
  return board[0].every(Boolean) && !findWin(board)
}

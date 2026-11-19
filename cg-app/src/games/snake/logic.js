export const ROWS = 16
export const COLS = 16

export const DIRS = {
  ArrowUp: { row: -1, col: 0 },
  ArrowDown: { row: 1, col: 0 },
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1 },
}

export function isOpposite(a, b) {
  return a.row + b.row === 0 && a.col + b.col === 0
}

export function step(snake, dir, food, rows = ROWS, cols = COLS) {
  const head = snake[0]
  const next = { row: head.row + dir.row, col: head.col + dir.col }
  if (next.row < 0 || next.row >= rows || next.col < 0 || next.col >= cols) {
    return { snake, dead: true, ate: false }
  }
  const eats = next.row === food.row && next.col === food.col
  const body = eats ? snake : snake.slice(0, -1)
  if (body.some((segment) => segment.row === next.row && segment.col === next.col)) {
    return { snake, dead: true, ate: false }
  }
  const grown = [next, ...snake]
  if (!eats) grown.pop()
  return { snake: grown, dead: false, ate: eats }
}

export function spawnFood(snake, rows = ROWS, cols = COLS, random = Math.random) {
  const taken = new Set(snake.map((segment) => `${segment.row},${segment.col}`))
  const open = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!taken.has(`${row},${col}`)) open.push({ row, col })
    }
  }
  if (!open.length) return null
  return open[Math.floor(random() * open.length)]
}

export function startingSnake() {
  return [
    { row: 8, col: 4 },
    { row: 8, col: 3 },
    { row: 8, col: 2 },
  ]
}

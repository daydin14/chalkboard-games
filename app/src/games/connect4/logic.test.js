import { describe, expect, it } from 'vitest'
import { createBoard, drop, findWin, isDraw } from './logic'

describe('connect 4', () => {
  it('stacks a vertical win and ignores a full column', () => {
    let board = createBoard()
    for (const col of [0, 1, 0, 1, 0, 1, 0]) {
      board = drop(board, col, board.flat().filter(Boolean).length % 2 === 0 ? 'red' : 'yellow').board
    }
    expect(findWin(board).player).toBe('red')
    expect(findWin(board).cells).toHaveLength(4)

    let filled = createBoard()
    for (let i = 0; i < 6; i += 1) filled = drop(filled, 3, 'red').board
    expect(drop(filled, 3, 'yellow')).toBeNull()
  })

  it('recognizes a full board without four in a row as a draw', () => {
    const pattern = [
      ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R'],
      ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R'],
      ['Y', 'R', 'Y', 'R', 'Y', 'R', 'Y'],
      ['Y', 'R', 'Y', 'R', 'Y', 'R', 'Y'],
      ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R'],
      ['Y', 'R', 'Y', 'R', 'Y', 'R', 'Y'],
    ]
    const board = pattern.map((row) => row.map((cell) => (cell === 'R' ? 'red' : 'yellow')))
    expect(findWin(board)).toBeNull()
    expect(isDraw(board)).toBe(true)
  })
})

import { describe, expect, it } from 'vitest'
import { createBoard, isWin, reveal, toggleFlag } from './logic'

function rng(seed) {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

describe('minesweeper', () => {
  it('keeps the first click and its neighbors clear', () => {
    for (let seed = 1; seed <= 12; seed += 1) {
      const board = createBoard({ safe: { row: 0, col: 0 }, random: rng(seed) })
      expect(board.flat().filter((cell) => cell.mine)).toHaveLength(10)
      expect(board[0][0].mine).toBe(false)
      expect(board[0][1].mine).toBe(false)
      expect(board[1][0].mine).toBe(false)
      expect(board[1][1].mine).toBe(false)
    }
  })

  it('floods open space, skips flags, and does not mutate the source', () => {
    const board = [
      [
        { mine: false, adjacent: 0, revealed: false, flagged: false },
        { mine: false, adjacent: 0, revealed: false, flagged: true },
      ],
      [
        { mine: false, adjacent: 1, revealed: false, flagged: false },
        { mine: true, adjacent: 0, revealed: false, flagged: false },
      ],
    ]
    const before = JSON.stringify(board)
    const opened = reveal(board, 0, 0)
    expect(JSON.stringify(board)).toBe(before)
    expect(opened.board[0][0].revealed).toBe(true)
    expect(opened.board[1][0].revealed).toBe(true)
    expect(opened.board[0][1].revealed).toBe(false)
    expect(opened.hitMine).toBe(false)
  })

  it('flags only covered cells and detects a cleared field', () => {
    const covered = [[{ mine: false, adjacent: 0, revealed: false, flagged: false }]]
    expect(toggleFlag(covered, 0, 0)[0][0].flagged).toBe(true)
    const revealed = [[{ mine: false, adjacent: 0, revealed: true, flagged: false }]]
    expect(toggleFlag(revealed, 0, 0)[0][0].flagged).toBe(false)
    expect(isWin([[{ mine: true, adjacent: 0, revealed: false, flagged: true }], [{ mine: false, adjacent: 1, revealed: true, flagged: false }]])).toBe(true)
  })

  it('reveals the mines when one is hit', () => {
    const board = [[
      { mine: true, adjacent: 0, revealed: false, flagged: false },
      { mine: true, adjacent: 0, revealed: false, flagged: false },
    ]]
    const result = reveal(board, 0, 0)
    expect(result.hitMine).toBe(true)
    expect(result.board[0].every((cell) => cell.revealed)).toBe(true)
  })
})

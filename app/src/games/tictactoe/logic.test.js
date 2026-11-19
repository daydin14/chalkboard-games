import { describe, expect, it } from 'vitest'
import { isDraw, winnerOf } from './logic'

describe('tic tac toe', () => {
  it('finds a line of three', () => {
    const squares = ['X', 'X', 'X', 'O', 'O', null, null, null, null]
    expect(winnerOf(squares)).toEqual({ player: 'X', line: [0, 1, 2] })
  })

  it('spots a draw', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    expect(winnerOf(squares)).toBeNull()
    expect(isDraw(squares)).toBe(true)
  })
})

import { describe, expect, it } from 'vitest'
import { applyLine, chooseComputerMove, emptyLines, isOver, score } from './logic'

describe('dots and boxes', () => {
  it('awards a box on the fourth side and lets that player keep the point', () => {
    let state = emptyLines(1, 1)
    state = applyLine(state, 'h', 0, 0, 'you').state
    state = applyLine(state, 'v', 0, 0, 'you').state
    state = applyLine(state, 'v', 0, 1, 'you').state
    const last = applyLine(state, 'h', 1, 0, 'you')
    expect(last.completed).toEqual([[0, 0]])
    expect(score(last.state, 'you')).toBe(1)
    expect(isOver(last.state)).toBe(true)
    expect(applyLine(last.state, 'h', 1, 0, 'you')).toBeNull()
  })

  it('closes a nearly finished box before drawing elsewhere', () => {
    let state = emptyLines(1, 1)
    state = applyLine(state, 'h', 0, 0, 'you').state
    state = applyLine(state, 'v', 0, 0, 'you').state
    state = applyLine(state, 'v', 0, 1, 'you').state
    expect(chooseComputerMove(state, () => 0)).toEqual({ kind: 'h', row: 1, col: 0 })
  })
})

import { describe, expect, it } from 'vitest'
import { judgePress, nextColor } from './logic'

describe('simon says', () => {
  it('judges each press against the pattern', () => {
    const sequence = ['red', 'blue']
    expect(judgePress(sequence, 0, 'red')).toBe('continue')
    expect(judgePress(sequence, 1, 'blue')).toBe('complete')
    expect(judgePress(sequence, 1, 'green')).toBe('wrong')
  })

  it('picks one of the four colors', () => {
    expect(nextColor(() => 0)).toBe('red')
    expect(nextColor(() => 0.99)).toBe('blue')
  })
})

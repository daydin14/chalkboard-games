import { describe, expect, it } from 'vitest'
import { computerThrow, judge } from './logic'

describe('rock paper scissors', () => {
  it('knows the three outcomes', () => {
    expect(judge('rock', 'scissors')).toBe('win')
    expect(judge('paper', 'scissors')).toBe('lose')
    expect(judge('paper', 'paper')).toBe('tie')
  })

  it('picks a legal throw', () => {
    expect(computerThrow(() => 0)).toBe('rock')
    expect(computerThrow(() => 0.9)).toBe('scissors')
  })
})

import { describe, expect, it } from 'vitest'
import { applyGuess, createRound, pickWord } from './logic'

describe('hangman', () => {
  it('ignores a repeated miss', () => {
    const once = applyGuess(createRound('chalk'), 'z')
    const twice = applyGuess(once, 'z')
    expect(once.wrong).toBe(1)
    expect(twice).toBe(once)
  })

  it('wins when every letter is found', () => {
    let round = createRound('chalk')
    for (const letter of ['c', 'h', 'a', 'l', 'k']) round = applyGuess(round, letter)
    expect(round.status).toBe('won')
    expect(round.wrong).toBe(0)
  })

  it('loses on the sixth miss', () => {
    let round = createRound('chalk')
    for (const letter of ['z', 'q', 'x', 'j', 'v', 'w']) round = applyGuess(round, letter)
    expect(round.status).toBe('lost')
    expect(applyGuess(round, 'b').wrong).toBe(6)
  })

  it('does not repeat the previous word when another is available', () => {
    expect(pickWord(() => 0, 'react')).not.toBe('react')
  })
})

import { describe, expect, it } from 'vitest'
import { SYMBOLS, createDeck } from './logic'

describe('memory', () => {
  it('deals eight matching pairs', () => {
    const deck = createDeck(() => 0)
    expect(deck).toHaveLength(16)
    for (const symbol of SYMBOLS) {
      expect(deck.filter((card) => card.symbol === symbol)).toHaveLength(2)
    }
  })
})

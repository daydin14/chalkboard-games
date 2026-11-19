import { describe, expect, it } from 'vitest'
import { DIRS, isOpposite, spawnFood, step } from './logic'

describe('snake', () => {
  it('refuses a reversal and dies on a wall or its body', () => {
    expect(isOpposite(DIRS.ArrowUp, DIRS.ArrowDown)).toBe(true)
    expect(isOpposite(DIRS.ArrowLeft, DIRS.ArrowUp)).toBe(false)
    expect(step([{ row: 0, col: 0 }], DIRS.ArrowUp, { row: 3, col: 3 }, 4, 4).dead).toBe(true)
    const snake = [
      { row: 0, col: 1 },
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ]
    expect(step(snake, DIRS.ArrowLeft, { row: 3, col: 3 }, 5, 5).dead).toBe(true)
  })

  it('can move into the cell the tail is leaving, and grows when it eats', () => {
    const snake = [
      { row: 0, col: 1 },
      { row: 0, col: 0 },
    ]
    const moved = step(snake, DIRS.ArrowLeft, { row: 3, col: 3 }, 4, 4)
    expect(moved.dead).toBe(false)
    expect(moved.snake).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ])
    const fed = step([{ row: 1, col: 1 }], DIRS.ArrowRight, { row: 1, col: 2 }, 5, 5)
    expect(fed.ate).toBe(true)
    expect(fed.snake).toHaveLength(2)
  })

  it('places food on an open cell', () => {
    expect(spawnFood([{ row: 0, col: 0 }], 1, 1, () => 0)).toBeNull()
    expect(spawnFood([{ row: 0, col: 0 }], 2, 2, () => 0)).toEqual({ row: 0, col: 1 })
  })
})

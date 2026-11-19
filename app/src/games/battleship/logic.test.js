import { describe, expect, it } from 'vitest'
import { SHIP_SPECS, fire, placeFleet } from './logic'

function rng(seed) {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

describe('battleship', () => {
  it('places five ships without overlap', () => {
    const fleet = placeFleet(rng(3))
    expect(fleet.map((ship) => ship.size)).toEqual(SHIP_SPECS.map((ship) => ship.size))
    const cells = fleet.flatMap((ship) => ship.cells.map((cell) => cell.join(',')))
    expect(new Set(cells).size).toBe(17)
    for (const [row, col] of fleet.flatMap((ship) => ship.cells)) {
      expect(row).toBeGreaterThanOrEqual(0)
      expect(row).toBeLessThan(10)
      expect(col).toBeGreaterThanOrEqual(0)
      expect(col).toBeLessThan(10)
    }
  })

  it('records misses, hits, and a sunk ship', () => {
    const ships = [{ id: 'destroyer', name: 'Destroyer', size: 2, cells: [[0, 0], [0, 1]], hits: 0, sunk: false }]
    const miss = fire(ships, {}, 4, 4)
    expect(miss.hit).toBe(false)
    expect(miss.shots['4,4']).toBe('miss')
    const first = fire(ships, {}, 0, 0)
    expect(first.hit).toBe(true)
    expect(first.sunk).toBeNull()
    const second = fire(first.ships, first.shots, 0, 1)
    expect(second.sunk).toBe('Destroyer')
    expect(second.won).toBe(true)
    expect(fire(second.ships, second.shots, 0, 0)).toBeNull()
  })
})

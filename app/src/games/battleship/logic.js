export const SIZE = 10

export const SHIP_SPECS = [
  { id: 'carrier', name: 'Carrier', size: 5 },
  { id: 'battleship', name: 'Battleship', size: 4 },
  { id: 'cruiser', name: 'Cruiser', size: 3 },
  { id: 'submarine', name: 'Submarine', size: 3 },
  { id: 'destroyer', name: 'Destroyer', size: 2 },
]

export function placeFleet(random = Math.random, size = SIZE, depth = 0) {
  if (depth > 25) throw new Error('Unable to place the fleet')
  const occupied = new Set()
  const ships = []
  for (const spec of SHIP_SPECS) {
    let placed = null
    for (let attempt = 0; attempt < 300 && !placed; attempt += 1) {
      const horizontal = random() < 0.5
      const row = Math.floor(random() * (horizontal ? size : size - spec.size + 1))
      const col = Math.floor(random() * (horizontal ? size - spec.size + 1 : size))
      const cells = Array.from({ length: spec.size }, (_, index) =>
        horizontal ? [row, col + index] : [row + index, col],
      )
      if (cells.every(([r, c]) => r >= 0 && c >= 0 && r < size && c < size && !occupied.has(`${r},${c}`))) {
        cells.forEach(([r, c]) => occupied.add(`${r},${c}`))
        placed = { ...spec, cells, hits: 0, sunk: false }
      }
    }
    if (!placed) return placeFleet(random, size, depth + 1)
    ships.push(placed)
  }
  return ships
}

export function fire(ships, shots, row, col) {
  const key = `${row},${col}`
  if (shots[key]) return null
  const nextShots = { ...shots, [key]: 'miss' }
  const nextShips = ships.map((ship) => ({ ...ship }))
  const ship = nextShips.find((entry) => entry.cells.some(([r, c]) => r === row && c === col))
  if (ship) {
    nextShots[key] = 'hit'
    ship.hits += 1
    if (ship.hits >= ship.size) ship.sunk = true
  }
  return {
    ships: nextShips,
    shots: nextShots,
    hit: Boolean(ship),
    sunk: ship?.sunk ? ship.name : null,
    won: nextShips.every((entry) => entry.sunk),
  }
}

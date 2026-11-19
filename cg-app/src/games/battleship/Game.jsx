import { useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { SIZE, fire, placeFleet } from './logic'

function appearance(shots, ships, row, col) {
  const shot = shots[`${row},${col}`]
  const ship = ships.find((entry) => entry.cells.some(([r, c]) => r === row && c === col))
  if (ship?.sunk) return 'sunk'
  return shot || 'unknown'
}

export default function Battleship() {
  const [ships, setShips] = useState(placeFleet)
  const [shots, setShots] = useState({})
  const [message, setMessage] = useState('Fire on the grid. The fleet is hidden.')
  const [tone, setTone] = useState('neutral')

  const won = ships.every((ship) => ship.sunk)
  const fired = Object.keys(shots).length

  const onFire = (row, col) => {
    if (won) return
    const result = fire(ships, shots, row, col)
    if (!result) {
      setMessage('Already fired there.')
      setTone('warning')
      return
    }
    setShips(result.ships)
    setShots(result.shots)
    if (result.won) {
      setMessage('The fleet is sunk.')
      setTone('success')
    } else if (result.sunk) {
      setMessage(`${result.sunk} sunk.`)
      setTone('success')
    } else if (result.hit) {
      setMessage('Hit.')
      setTone('warning')
    } else {
      setMessage('Miss.')
      setTone('neutral')
    }
  }

  const reset = () => {
    setShips(placeFleet())
    setShots({})
    setMessage('A new fleet is hiding.')
    setTone('neutral')
  }

  return (
    <GameShell title="Battleship" lede="Find the five ships. A hit marks the square. A sunk ship shows its whole length.">
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <p className="text-sm text-base-content/75">Shots {fired}</p>
          <div className="grid w-[min(100%,24rem)] grid-cols-10 gap-1" aria-label="Ocean">
            {Array.from({ length: SIZE }, (_, row) =>
              Array.from({ length: SIZE }, (_, col) => {
                const kind = appearance(shots, ships, row, col)
                return (
                  <button
                    key={`${row}-${col}`}
                    type="button"
                    aria-label={`Row ${row + 1}, column ${col + 1}, ${kind}`}
                    className={`grid aspect-square place-items-center rounded-sm text-sm font-bold ${
                      kind === 'sunk'
                        ? 'bg-error/25 text-error'
                        : kind === 'hit'
                          ? 'bg-warning/20 text-warning'
                          : kind === 'miss'
                            ? 'bg-black/20 text-base-content/70'
                            : 'bg-[#10261f]'
                    }`}
                    onClick={() => onFire(row, col)}
                  >
                    {kind === 'sunk' || kind === 'hit' ? '×' : kind === 'miss' ? '·' : ''}
                  </button>
                )
              }),
            )}
          </div>
          <ul className="grid w-full max-w-md grid-cols-1 gap-1 text-sm sm:grid-cols-2">
            {ships.map((ship) => (
              <li key={ship.id} className="flex justify-between rounded-xl bg-black/15 px-3 py-2">
                <span>
                  {ship.name} · {ship.size}
                </span>
                <span className={ship.sunk ? 'text-error' : 'text-success'}>{ship.sunk ? 'Sunk' : 'Afloat'}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
            New fleet
          </button>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

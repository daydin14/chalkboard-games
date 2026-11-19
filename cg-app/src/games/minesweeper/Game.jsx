import { useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { MINES, countFlags, createBoard, isWin, reveal, toggleFlag } from './logic'

const numberColor = ['', '#8ecae6', '#95d5b2', '#f4a261', '#c9b6f2', '#f2cc8f', '#f2a7b8', '#f6efe4', '#f6efe4']

export default function Minesweeper() {
  const [board, setBoard] = useState(() => createBoard())
  const [started, setStarted] = useState(false)
  const [status, setStatus] = useState('ready')
  const [flagMode, setFlagMode] = useState(false)

  const fresh = (row, col) => (started ? board : createBoard({ safe: { row, col } }))

  const onReveal = (row, col) => {
    if (status === 'dead' || status === 'won') return
    const current = fresh(row, col)
    if (flagMode) {
      setBoard(toggleFlag(current, row, col))
      setStarted(true)
      if (status === 'ready') setStatus('playing')
      return
    }
    const result = reveal(current, row, col)
    setBoard(result.board)
    setStarted(true)
    if (result.hitMine) setStatus('dead')
    else if (isWin(result.board)) setStatus('won')
    else setStatus('playing')
  }

  const onFlag = (row, col) => {
    if (status === 'dead' || status === 'won') return
    const current = fresh(row, col)
    setBoard(toggleFlag(current, row, col))
    setStarted(true)
    if (status === 'ready') setStatus('playing')
  }

  const reset = () => {
    setBoard(createBoard())
    setStarted(false)
    setStatus('ready')
    setFlagMode(false)
  }

  const flags = countFlags(board)
  let message = `${MINES - flags} mines left`
  let tone = 'neutral'
  if (status === 'ready') message = 'Tap a square. The first one is safe.'
  if (status === 'dead') {
    message = 'A mine went off.'
    tone = 'error'
  }
  if (status === 'won') {
    message = 'Field cleared.'
    tone = 'success'
  }

  return (
    <GameShell
      title="Minesweeper"
      lede="Open every safe square. Flag with the flag control, or right-click. Flagged squares stay covered."
    >
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <button
            type="button"
            className={`btn min-h-11 ${flagMode ? 'btn-warning' : 'btn-outline'}`}
            aria-pressed={flagMode}
            onClick={() => setFlagMode((value) => !value)}
          >
            {flagMode ? 'Flag mode on' : 'Flag mode'}
          </button>
          <div className="grid w-[min(100%,26rem)] grid-cols-10 gap-0.5" aria-label="Minefield">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const label = cell.revealed
                  ? cell.mine
                    ? 'Mine'
                    : cell.adjacent
                      ? `${cell.adjacent} nearby`
                      : 'Empty'
                  : cell.flagged
                    ? 'Flagged'
                    : 'Covered'
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    type="button"
                    aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}, ${label}`}
                    className={`grid aspect-square place-items-center rounded-sm text-xs font-bold sm:text-sm ${
                      cell.revealed ? 'bg-black/25' : 'bg-[#10261f] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    } ${cell.mine && cell.revealed ? 'text-error' : ''}`}
                    style={{ color: cell.revealed && !cell.mine ? numberColor[cell.adjacent] : undefined }}
                    onClick={() => onReveal(rowIndex, colIndex)}
                    onContextMenu={(event) => {
                      event.preventDefault()
                      onFlag(rowIndex, colIndex)
                    }}
                  >
                    {cell.revealed ? (cell.mine ? '●' : cell.adjacent || '') : cell.flagged ? '⚑' : ''}
                  </button>
                )
              }),
            )}
          </div>
          <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
            New field
          </button>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

import { useEffect, useRef, useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { BOX_COLS, BOX_ROWS, applyLine, chooseComputerMove, emptyLines, isOver, score } from './logic'

export default function Dots() {
  const [state, setState] = useState(emptyLines)
  const [turn, setTurn] = useState('you')
  const pending = useRef(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      clearTimeout(pending.current)
    }
  }, [])

  const runComputer = (fromState) => {
    pending.current = setTimeout(() => {
      if (!mounted.current || isOver(fromState)) return
      const move = chooseComputerMove(fromState)
      if (!move) {
        setTurn('you')
        return
      }
      const result = applyLine(fromState, move.kind, move.row, move.col, 'computer')
      if (!result) {
        setTurn('you')
        return
      }
      setState(result.state)
      if (isOver(result.state)) return
      if (result.completed.length > 0) runComputer(result.state)
      else setTurn('you')
    }, 420)
  }

  const draw = (kind, row, col) => {
    if (turn !== 'you' || isOver(state)) return
    const result = applyLine(state, kind, row, col, 'you')
    if (!result) return
    setState(result.state)
    if (isOver(result.state) || result.completed.length > 0) return
    setTurn('computer')
    runComputer(result.state)
  }

  const reset = () => {
    clearTimeout(pending.current)
    setState(emptyLines())
    setTurn('you')
  }

  const over = isOver(state)
  const yours = score(state, 'you')
  const theirs = score(state, 'computer')
  let message = turn === 'you' ? 'Your turn' : 'The board is drawing'
  let tone = 'neutral'
  if (over) {
    if (yours === theirs) message = 'The squares are split.'
    else message = yours > theirs ? 'You took more squares.' : 'The board took more squares.'
    tone = yours >= theirs ? 'success' : 'warning'
  }

  const tracks = `${Array.from({ length: BOX_COLS }, () => '0.7rem minmax(2.1rem, 1fr)').join(' ')} 0.7rem`

  return (
    <GameShell title="Dots & Boxes" lede="Draw a line between two dots. Close a square and you go again.">
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <p className="text-sm text-base-content/80">
            You {yours} · Board {theirs}
          </p>
          <div
            className="grid w-[min(100%,22rem)]"
            style={{ gridTemplateColumns: tracks, gridTemplateRows: tracks }}
          >
            {Array.from({ length: BOX_ROWS + 1 }, (_, row) =>
              Array.from({ length: BOX_COLS + 1 }, (_, col) => (
                <span
                  key={`dot-${row}-${col}`}
                  className="z-10 h-3 w-3 justify-self-center self-center rounded-full bg-primary"
                  style={{ gridColumn: col * 2 + 1, gridRow: row * 2 + 1 }}
                />
              )),
            )}
            {state.h.map((row, rowIndex) =>
              row.map((taken, colIndex) => (
                <button
                  key={`h-${rowIndex}-${colIndex}`}
                  type="button"
                  aria-label={`Horizontal line, row ${rowIndex + 1}, column ${colIndex + 1}`}
                  aria-pressed={taken}
                  disabled={taken || turn !== 'you' || over}
                  className="group relative z-0"
                  style={{ gridColumn: colIndex * 2 + 2, gridRow: rowIndex * 2 + 1 }}
                  onClick={() => draw('h', rowIndex, colIndex)}
                >
                  <span className={`mx-auto block h-1.5 w-[78%] rounded-full ${taken ? 'bg-primary' : 'bg-white/20 group-hover:bg-white/45'}`} />
                </button>
              )),
            )}
            {state.v.map((row, rowIndex) =>
              row.map((taken, colIndex) => (
                <button
                  key={`v-${rowIndex}-${colIndex}`}
                  type="button"
                  aria-label={`Vertical line, row ${rowIndex + 1}, column ${colIndex + 1}`}
                  aria-pressed={taken}
                  disabled={taken || turn !== 'you' || over}
                  className="group relative z-0"
                  style={{ gridColumn: colIndex * 2 + 1, gridRow: rowIndex * 2 + 2 }}
                  onClick={() => draw('v', rowIndex, colIndex)}
                >
                  <span className={`my-auto block h-[78%] w-1.5 rounded-full ${taken ? 'bg-primary' : 'bg-white/20 group-hover:bg-white/45'}`} />
                </button>
              )),
            )}
            {state.owners.map((row, rowIndex) =>
              row.map((owner, colIndex) => (
                <span
                  key={`box-${rowIndex}-${colIndex}`}
                  className={`m-1.5 rounded-md ${
                    owner === 'you' ? 'bg-primary/30' : owner === 'computer' ? 'bg-secondary/35' : ''
                  }`}
                  style={{ gridColumn: colIndex * 2 + 2, gridRow: rowIndex * 2 + 2 }}
                />
              )),
            )}
          </div>
          <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
            New game
          </button>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

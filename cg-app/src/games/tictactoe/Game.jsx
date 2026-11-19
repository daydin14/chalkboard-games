import { useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { isDraw, winnerOf } from './logic'

const empty = () => Array(9).fill(null)

export default function TicTacToe() {
  const [history, setHistory] = useState([empty()])
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ X: 0, O: 0 })
  const [roundScored, setRoundScored] = useState(false)

  const squares = history[step]
  const win = winnerOf(squares)
  const draw = isDraw(squares)
  const xNext = step % 2 === 0

  const play = (index) => {
    if (win || squares[index]) return
    const nextSquares = squares.slice()
    nextSquares[index] = xNext ? 'X' : 'O'
    const nextHistory = history.slice(0, step + 1).concat([nextSquares])
    setHistory(nextHistory)
    setStep(nextHistory.length - 1)
    const result = winnerOf(nextSquares)
    if (result && !roundScored) {
      setRoundScored(true)
      setScores((current) => ({ ...current, [result.player]: current[result.player] + 1 }))
    }
  }

  const reset = () => {
    setHistory([empty()])
    setStep(0)
    setRoundScored(false)
  }

  let message = `${xNext ? 'X' : 'O'} to play`
  let tone = 'neutral'
  if (win) {
    message = `${win.player} wins`
    tone = 'success'
  } else if (draw) {
    message = 'Draw'
    tone = 'warning'
  }

  return (
    <GameShell title="Tic Tac Toe" lede="Take turns. Use the move list to step back without starting the score over.">
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <div className="grid w-full max-w-xs grid-cols-3 gap-2">
            {squares.map((value, index) => {
              const winning = win?.line.includes(index)
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Square ${index + 1}${value ? `, ${value}` : ', empty'}`}
                  className={`grid aspect-square place-items-center rounded-2xl border bg-[#10261f] font-chalk text-5xl leading-none sm:text-6xl ${
                    winning ? 'border-primary text-primary' : 'border-white/10'
                  } ${value === 'O' ? 'text-secondary' : 'text-primary'}`}
                  onClick={() => play(index)}
                >
                  {value}
                </button>
              )
            })}
          </div>
          <p className="text-sm text-base-content/80">
            X {scores.X} · O {scores.O}
          </p>
          <div className="flex w-full max-w-md gap-2 overflow-x-auto pb-1" aria-label="Move history">
            {history.map((_, move) => (
              <button
                key={move}
                type="button"
                aria-current={move === step ? 'step' : undefined}
                className={`btn btn-sm shrink-0 ${move === step ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setStep(move)}
              >
                {move === 0 ? 'Start' : `Move ${move}`}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
            New game
          </button>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

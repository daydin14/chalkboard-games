import { useEffect, useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { CHOICES, computerThrow, judge } from './logic'

const labels = { rock: 'Rock', paper: 'Paper', scissors: 'Scissors' }
const keys = { r: 'rock', p: 'paper', s: 'scissors' }
const copy = {
  win: 'You win this throw.',
  lose: 'The board wins this throw.',
  tie: 'Tie throw.',
}

export default function RockPaperScissors() {
  const [player, setPlayer] = useState(null)
  const [computer, setComputer] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ win: 0, lose: 0, tie: 0 })

  const play = (choice) => {
    const opponent = computerThrow()
    const outcome = judge(choice, opponent)
    setPlayer(choice)
    setComputer(opponent)
    setResult(outcome)
    setScore((current) => ({ ...current, [outcome]: current[outcome] + 1 }))
  }

  useEffect(() => {
    const onKey = (event) => {
      const choice = keys[event.key.toLowerCase()]
      if (!choice) return
      event.preventDefault()
      play(choice)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const tone = result === 'win' ? 'success' : result === 'lose' ? 'error' : 'neutral'

  return (
    <GameShell
      title="Rock Paper Scissors"
      lede="Throw with the buttons, or press R, P, or S. The board picks at the same moment."
    >
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={result ? tone : 'neutral'}>
            {result ? copy[result] : 'Choose a throw.'}
          </Status>
          <div className="grid w-full max-w-md grid-cols-3 gap-2">
            {CHOICES.map((choice) => (
              <button
                key={choice}
                type="button"
                className={`btn min-h-16 flex-col border-white/15 bg-black/15 text-primary hover:border-primary/50 ${
                  player === choice ? 'border-primary' : ''
                }`}
                onClick={() => play(choice)}
              >
                <span className="font-chalk text-3xl leading-none">{labels[choice]}</span>
                <kbd className="kbd kbd-xs mt-1">{choice[0].toUpperCase()}</kbd>
              </button>
            ))}
          </div>
          <div className="grid w-full max-w-md gap-2 text-center text-sm sm:grid-cols-2">
            <p className="rounded-2xl bg-black/15 px-3 py-3">
              You <span className="mt-1 block font-chalk text-3xl text-primary">{player ? labels[player] : '—'}</span>
            </p>
            <p className="rounded-2xl bg-black/15 px-3 py-3">
              Board <span className="mt-1 block font-chalk text-3xl text-secondary">{computer ? labels[computer] : '—'}</span>
            </p>
          </div>
          <p className="text-sm text-base-content/75">
            Wins {score.win} · Losses {score.lose} · Ties {score.tie}
          </p>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

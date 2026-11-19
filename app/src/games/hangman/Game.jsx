import { useEffect, useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { MAX_WRONG, applyGuess, createRound, pickWord } from './logic'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

function Gallows({ wrong, color }) {
  return (
    <svg viewBox="0 0 200 220" className="h-48 w-40 sm:h-56 sm:w-48" aria-hidden="true">
      <line x1="16" y1="200" x2="184" y2="200" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="52" y1="200" x2="52" y2="24" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="52" y1="24" x2="138" y2="24" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="138" y1="24" x2="138" y2="48" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {wrong > 0 && <circle cx="138" cy="68" r="18" stroke={color} strokeWidth="4" fill="none" />}
      {wrong > 1 && <line x1="138" y1="86" x2="138" y2="136" stroke={color} strokeWidth="4" strokeLinecap="round" />}
      {wrong > 2 && <line x1="138" y1="104" x2="112" y2="122" stroke={color} strokeWidth="4" strokeLinecap="round" />}
      {wrong > 3 && <line x1="138" y1="104" x2="164" y2="122" stroke={color} strokeWidth="4" strokeLinecap="round" />}
      {wrong > 4 && <line x1="138" y1="136" x2="114" y2="168" stroke={color} strokeWidth="4" strokeLinecap="round" />}
      {wrong > 5 && <line x1="138" y1="136" x2="162" y2="168" stroke={color} strokeWidth="4" strokeLinecap="round" />}
    </svg>
  )
}

export default function Hangman() {
  const [round, setRound] = useState(() => createRound(pickWord()))
  const [color, setColor] = useState('#f4e7b0')

  const guess = (letter) => setRound((current) => applyGuess(current, letter))

  const reset = () => setRound(createRound(pickWord(Math.random, round.word)))

  useEffect(() => {
    const onKey = (event) => {
      if (!/^[a-z]$/i.test(event.key)) return
      event.preventDefault()
      guess(event.key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const left = MAX_WRONG - round.wrong
  let message = `${left} ${left === 1 ? 'miss' : 'misses'} left`
  let tone = 'neutral'
  if (round.status === 'won') {
    message = 'You found the word.'
    tone = 'success'
  } else if (round.status === 'lost') {
    message = `The word was ${round.word}.`
    tone = 'error'
  }

  return (
    <GameShell title="Hangman" lede="Guess the word in six misses. A used letter cannot be played again.">
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <Gallows wrong={round.wrong} color={color} />
          <p className="flex max-w-full flex-wrap justify-center gap-x-3 gap-y-1" aria-label="Word">
            {[...round.word].map((letter, index) => {
              const known = round.guessed.includes(letter) || round.status === 'lost'
              return (
                <span
                  key={`${letter}-${index}`}
                  className={`font-chalk text-5xl leading-none sm:text-6xl ${
                    known && round.status === 'lost' && !round.guessed.includes(letter)
                      ? 'text-error'
                      : 'text-primary'
                  }`}
                >
                  {known ? letter : '_'}
                </span>
              )
            })}
          </p>
          <div className="grid w-full max-w-md grid-cols-7 gap-1.5">
            {ALPHABET.map((letter) => {
              const used = round.guessed.includes(letter)
              const correct = used && round.word.includes(letter)
              return (
                <button
                  key={letter}
                  type="button"
                  aria-label={letter}
                  disabled={used || round.status !== 'playing'}
                  className={`btn btn-sm min-h-11 px-0 uppercase ${
                    correct ? 'btn-success' : used ? 'btn-error' : 'btn-ghost border border-white/10'
                  }`}
                  onClick={() => guess(letter)}
                >
                  {letter}
                </button>
              )
            })}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              Chalk
              <input
                type="color"
                value={color}
                aria-label="Chalk color"
                className="h-10 w-12 cursor-pointer rounded-lg bg-transparent"
                onChange={(event) => setColor(event.target.value)}
              />
            </label>
            <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
              New word
            </button>
          </div>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

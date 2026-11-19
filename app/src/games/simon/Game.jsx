import { useCallback, useEffect, useRef, useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { COLORS, judgePress, nextColor } from './logic'

const KEYS = { r: 'red', g: 'green', y: 'yellow', b: 'blue', 1: 'red', 2: 'green', 3: 'yellow', 4: 'blue' }
const paint = {
  red: 'bg-[#e07a7a]',
  green: 'bg-[#8fbf7f]',
  yellow: 'bg-[#f0d56a]',
  blue: 'bg-[#7eb6d6]',
}

export default function Simon() {
  const [sequence, setSequence] = useState([])
  const [cursor, setCursor] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [active, setActive] = useState(null)
  const [pressed, setPressed] = useState(null)
  const [message, setMessage] = useState('Press start, then repeat the colors.')
  const [round, setRound] = useState(false)
  const timers = useRef(new Set())

  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => {
      timers.current.delete(id)
      fn()
    }, ms)
    timers.current.add(id)
  }, [])

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => clearTimeout(id))
    timers.current.clear()
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const play = useCallback(
    (nextSequence) => {
      clearTimers()
      setPhase('playback')
      setActive(null)
      setMessage('Watch the pattern')
      nextSequence.forEach((color, index) => {
        later(() => setActive(color), index * 680)
        later(() => setActive(null), index * 680 + 380)
      })
      later(() => {
        setPhase('input')
        setCursor(0)
        setMessage('Your turn')
      }, nextSequence.length * 680)
    },
    [clearTimers, later],
  )

  const start = useCallback(() => {
    clearTimers()
    const first = nextColor()
    setSequence([first])
    setCursor(0)
    setPressed(null)
    play([first])
  }, [clearTimers, play])

  const press = useCallback(
    (color) => {
      if (phase !== 'input') return
      setPressed(color)
      later(() => setPressed(null), 160)
      const result = judgePress(sequence, cursor, color)
      if (result === 'wrong') {
        setPhase('lost')
        setMessage('Missed it. Start again when you are ready.')
        return
      }
      if (result === 'continue') {
        setCursor((value) => value + 1)
        return
      }
      setMessage('That is the pattern. Adding a color.')
      setPhase('playback')
      later(() => {
        const added = nextColor()
        const next = [...sequence, added]
        setSequence(next)
        play(next)
      }, 640)
    },
    [phase, sequence, cursor, later, play],
  )

  useEffect(() => {
    const onKey = (event) => {
      const color = KEYS[event.key.toLowerCase()]
      if (!color) return
      event.preventDefault()
      press(color)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [press])

  const tone = phase === 'lost' ? 'error' : phase === 'input' ? 'success' : 'neutral'

  return (
    <GameShell title="Simon Says" lede="Repeat the flashes. Keys are R, G, Y, and B. Start always begins a fresh pattern.">
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>
            {message}
            {sequence.length > 0 && phase !== 'idle' ? ` · ${sequence.length} colors` : ''}
          </Status>
          <div className={`grid grid-cols-2 gap-3 ${round ? '' : ''}`}>
            {COLORS.map((color) => {
              const lit = active === color || pressed === color
              return (
                <button
                  key={color}
                  type="button"
                  aria-label={color}
                  aria-disabled={phase !== 'input'}
                  className={`h-24 w-24 border border-black/20 sm:h-32 sm:w-32 ${paint[color]} ${
                    round ? 'rounded-full' : 'rounded-2xl'
                  } ${lit ? 'brightness-125 ring-4 ring-white/80' : 'brightness-90'} ${
                    phase === 'input' ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onClick={() => press(color)}
                />
              )
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" className="btn btn-primary min-h-11" onClick={start}>
              {phase === 'idle' ? 'Start' : 'Start over'}
            </button>
            <button type="button" className="btn btn-ghost min-h-11 border border-white/15" onClick={() => setRound((value) => !value)} aria-pressed={round}>
              {round ? 'Square pads' : 'Round pads'}
            </button>
          </div>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

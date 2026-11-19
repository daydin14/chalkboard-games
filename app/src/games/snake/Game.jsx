import { useEffect, useRef, useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { COLS, DIRS, ROWS, isOpposite, spawnFood, startingSnake, step } from './logic'

export default function Snake() {
  const [snake, setSnake] = useState(startingSnake)
  const [food, setFood] = useState(() => spawnFood(startingSnake()))
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('playing')

  const snakeRef = useRef(snake)
  const foodRef = useRef(food)
  const statusRef = useRef(status)
  const committed = useRef(DIRS.ArrowRight)
  const queued = useRef(DIRS.ArrowRight)
  const queueRef = useRef(() => {})

  useEffect(() => {
    snakeRef.current = snake
  }, [snake])
  useEffect(() => {
    foodRef.current = food
  }, [food])
  useEffect(() => {
    statusRef.current = status
  }, [status])

  useEffect(() => {
    const queue = (next) => {
      if (statusRef.current === 'dead' || statusRef.current === 'won') return
      if (isOpposite(next, committed.current)) return
      queued.current = next
    }
    queueRef.current = queue

    const onKey = (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault()
        setStatus((current) => (current === 'playing' ? 'paused' : current === 'paused' ? 'playing' : current))
        return
      }
      if (!DIRS[event.key]) return
      event.preventDefault()
      queue(DIRS[event.key])
    }

    let start = null
    const onTouchStart = (event) => {
      start = { x: event.touches[0].clientX, y: event.touches[0].clientY }
    }
    const onTouchEnd = (event) => {
      if (!start) return
      const dx = event.changedTouches[0].clientX - start.x
      const dy = event.changedTouches[0].clientY - start.y
      start = null
      if (Math.hypot(dx, dy) < 24) return
      if (Math.abs(dx) > Math.abs(dy)) queue(dx > 0 ? DIRS.ArrowRight : DIRS.ArrowLeft)
      else queue(dy > 0 ? DIRS.ArrowDown : DIRS.ArrowUp)
    }

    const id = setInterval(() => {
      if (statusRef.current !== 'playing') return
      const dir = queued.current
      if (isOpposite(dir, committed.current)) return
      const result = step(snakeRef.current, dir, foodRef.current)
      committed.current = dir
      if (result.dead) {
        setStatus('dead')
        return
      }
      setSnake(result.snake)
      if (!result.ate) return
      setScore((current) => current + 1)
      const nextFood = spawnFood(result.snake)
      if (!nextFood) setStatus('won')
      else setFood(nextFood)
    }, 160)

    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      clearInterval(id)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  useEffect(() => {
    const onHide = () => {
      if (document.hidden) setStatus((current) => (current === 'playing' ? 'paused' : current))
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [])

  const reset = () => {
    const start = startingSnake()
    committed.current = DIRS.ArrowRight
    queued.current = DIRS.ArrowRight
    setSnake(start)
    setFood(spawnFood(start))
    setScore(0)
    setStatus('playing')
  }

  const cells = new Map(snake.map((segment, index) => [`${segment.row},${segment.col}`, index === 0 ? 'head' : 'body']))
  if (food) cells.set(`${food.row},${food.col}`, 'food')

  let message = `Score ${score}`
  let tone = 'neutral'
  if (status === 'paused') message = `Paused · score ${score}`
  if (status === 'dead') {
    message = `The snake stopped · score ${score}`
    tone = 'error'
  }
  if (status === 'won') {
    message = 'The board is full.'
    tone = 'success'
  }

  const pad = (label, dir) => (
    <button type="button" aria-label={label} className="btn btn-square btn-ghost border border-white/10" onClick={() => queueRef.current(dir)}>
      {label === 'Up' ? '↑' : label === 'Down' ? '↓' : label === 'Left' ? '←' : '→'}
    </button>
  )

  return (
    <GameShell
      title="Snake"
      lede="Arrows, swipe, or the pad. Space pauses. Turning straight back into yourself does nothing."
    >
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <div
            className="grid w-[min(100%,24rem)] gap-px rounded-xl bg-black/25 p-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            role="img"
            aria-label={`Snake, score ${score}`}
          >
            {Array.from({ length: ROWS * COLS }, (_, index) => {
              const row = Math.floor(index / COLS)
              const col = index % COLS
              const kind = cells.get(`${row},${col}`)
              return (
                <span
                  key={index}
                  className={`aspect-square rounded-[2px] ${
                    kind === 'head' ? 'bg-primary' : kind === 'body' ? 'bg-accent' : kind === 'food' ? 'bg-secondary' : 'bg-white/5'
                  }`}
                />
              )
            })}
          </div>
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Direction">
            <span />
            {pad('Up', DIRS.ArrowUp)}
            <span />
            {pad('Left', DIRS.ArrowLeft)}
            <button
              type="button"
              className="btn btn-square btn-ghost border border-white/10"
              aria-label={status === 'paused' ? 'Resume' : 'Pause'}
              onClick={() => setStatus((current) => (current === 'playing' ? 'paused' : current === 'paused' ? 'playing' : current))}
            >
              {status === 'paused' ? '▶' : '❚❚'}
            </button>
            {pad('Right', DIRS.ArrowRight)}
            <span />
            {pad('Down', DIRS.ArrowDown)}
            <span />
          </div>
          <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
            New game
          </button>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

import { useEffect, useRef, useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { createDeck } from './logic'

export default function Memory() {
  const [cards, setCards] = useState(createDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const won = matched.length === cards.length

  const reset = () => {
    clearTimeout(timer.current)
    setCards(createDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setLock(false)
  }

  const flip = (index) => {
    if (lock || won || matched.includes(index) || flipped.includes(index)) return
    const next = [...flipped, index]
    setFlipped(next)
    if (next.length < 2) return
    setMoves((count) => count + 1)
    setLock(true)
    const [first, second] = next
    if (cards[first].symbol === cards[second].symbol) {
      setMatched((current) => [...current, first, second])
      setFlipped([])
      setLock(false)
      return
    }
    timer.current = setTimeout(() => {
      setFlipped([])
      setLock(false)
    }, 700)
  }

  const tone = won ? 'success' : 'neutral'
  const message = won ? `All pairs found in ${moves} moves.` : `${moves} ${moves === 1 ? 'move' : 'moves'}`

  return (
    <GameShell title="Memory" lede="Turn two cards. Matches stay up. A third card waits until the pair settles.">
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <div className="grid w-full max-w-md grid-cols-4 gap-2">
            {cards.map((card, index) => {
              const faceUp = flipped.includes(index) || matched.includes(index)
              return (
                <button
                  key={card.key}
                  type="button"
                  aria-label={faceUp ? card.symbol : `Hidden card ${index + 1}`}
                  aria-pressed={faceUp}
                  className={`grid aspect-[3/4] place-items-center rounded-2xl border font-chalk text-4xl transition-transform sm:text-5xl ${
                    faceUp
                      ? 'scale-100 border-primary/50 bg-primary/12 text-primary'
                      : 'scale-[0.98] border-white/10 bg-[#10261f] text-base-content/35'
                  }`}
                  onClick={() => flip(index)}
                >
                  {faceUp ? card.symbol : '·'}
                </button>
              )
            })}
          </div>
          <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
            New game
          </button>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

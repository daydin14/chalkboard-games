import { useState } from 'react'
import { BoardFrame, GameShell, Status } from '../../components/ui'
import { COLS, createBoard, drop, findWin, isDraw } from './logic'

const names = { red: 'Red', yellow: 'Yellow' }

export default function Connect4() {
  const [board, setBoard] = useState(createBoard)
  const [player, setPlayer] = useState('red')
  const [note, setNote] = useState('')

  const win = findWin(board)
  const draw = isDraw(board)

  const onDrop = (col) => {
    if (win || draw) return
    const result = drop(board, col, player)
    if (!result) {
      setNote('That column is full.')
      return
    }
    setNote('')
    setBoard(result.board)
    if (!findWin(result.board) && !isDraw(result.board)) {
      setPlayer((current) => (current === 'red' ? 'yellow' : 'red'))
    }
  }

  const reset = () => {
    setBoard(createBoard())
    setPlayer('red')
    setNote('')
  }

  let message = `${names[player]} to play`
  let tone = 'neutral'
  if (note && !win && !draw) {
    message = `${note} ${names[player]} still plays.`
    tone = 'warning'
  }
  if (win) {
    message = `${names[win.player]} connects four`
    tone = 'success'
  } else if (draw) {
    message = 'The board is full. Draw.'
    tone = 'warning'
  }

  const winning = new Set(win ? win.cells.map(([row, col]) => `${row},${col}`) : [])

  return (
    <GameShell title="Connect 4" lede="Tap a column to drop a disc. A full column does not spend your turn.">
      <BoardFrame>
        <div className="flex flex-col items-center gap-4">
          <Status tone={tone}>{message}</Status>
          <div className="grid w-full max-w-md grid-cols-7 gap-1.5 rounded-2xl bg-[#10261f] p-2 sm:gap-2 sm:p-3">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  type="button"
                  aria-label={`Column ${colIndex + 1}, row ${rowIndex + 1}${cell ? `, ${names[cell]}` : ', empty'}`}
                  className={`grid aspect-square place-items-center rounded-full bg-[#0c221b] shadow-inner ${
                    winning.has(`${rowIndex},${colIndex}`) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => onDrop(colIndex)}
                >
                  {cell && (
                    <span
                      className={`piece-in block h-[78%] w-[78%] rounded-full ${
                        cell === 'red' ? 'bg-[#e07a7a]' : 'bg-[#f0d56a]'
                      }`}
                    />
                  )}
                </button>
              )),
            )}
          </div>
          <div className="flex items-center gap-4 text-sm" aria-hidden="true">
            {['red', 'yellow'].map((color) => (
              <span key={color} className="inline-flex items-center gap-2">
                <span className={`h-4 w-4 rounded-full ${color === 'red' ? 'bg-[#e07a7a]' : 'bg-[#f0d56a]'}`} />
                {names[color]}
              </span>
            ))}
          </div>
          <p className="sr-only">Seven columns. Use the discs in each column to drop.</p>
          <button type="button" className="btn btn-primary min-h-11" onClick={reset}>
            New game
          </button>
          <span className="sr-only">{COLS} columns</span>
        </div>
      </BoardFrame>
    </GameShell>
  )
}

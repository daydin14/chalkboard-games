import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import RockPaperScissors from './games/rps/Game'
import TicTacToe from './games/tictactoe/Game'
import Hangman from './games/hangman/Game'
import Connect4 from './games/connect4/Game'
import Memory from './games/memory/Game'
import Minesweeper from './games/minesweeper/Game'
import Snake from './games/snake/Game'
import Simon from './games/simon/Game'
import Dots from './games/dots/Game'
import Battleship from './games/battleship/Game'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-content"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/connect4" element={<Connect4 />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/minesweeper" element={<Minesweeper />} />
            <Route path="/snake" element={<Snake />} />
            <Route path="/simon-says" element={<Simon />} />
            <Route path="/dots" element={<Dots />} />
            <Route path="/battle-ship" element={<Battleship />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

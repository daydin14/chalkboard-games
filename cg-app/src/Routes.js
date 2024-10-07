// Dependencies
import React from 'react'
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import RockPaperScissors from './pages/RockPaperScissor';
import TicTacToe from './pages/TicTacToe';
import Hangman from './pages/Hangman';
import Connect4 from './pages/Connect4';

import DotsGamePage from './pages/DotsGamePage';
import MemoryGamePage from './pages/MemoryGamePage';
import SnakeGamePage from './pages/SnakeGamePage';
import MinesweeperGamePage from './pages/MinesweeperGamePage';
import SimonSaysGamePage from './pages/SimonSaysGamePage';
import CheckersGamePage from './pages/CheckersGamePage';
import SudokuGamePage from './pages/SudokuGamePage';
import WordSearchGamePage from './pages/WordSearchGamePage';
import BattleshipGamePage from './pages/BattleShipGamePage';
import ChessGamePage from './pages/ChessGamePage';
import Sandbox from './pages/Sandbox';

// Routes
const pages = [
    { path: '/', component: <Home /> },
    { path: '/rock-paper-scissors', component: <RockPaperScissors /> },
    { path: '/tic-tac-toe', component: <TicTacToe /> },
    { path: '/hangman', component: <Hangman /> },
    { path: '/connect4', component: <Connect4 /> },

    { path: '/dots', component: <DotsGamePage /> },
    { path: '/memory', component: <MemoryGamePage /> },
    { path: '/snake', component: <SnakeGamePage /> },
    { path: '/minesweeper', component: <MinesweeperGamePage /> },
    { path: '/simon-says', component: <SimonSaysGamePage /> },
    { path: '/checkers', component: <CheckersGamePage /> },
    { path: '/sudoku', component: <SudokuGamePage /> },
    { path: '/word-search', component: <WordSearchGamePage /> },
    { path: '/battle-ship', component: <BattleshipGamePage /> },
    { path: '/chess', component: <ChessGamePage /> }
]

// Conditionally add the Sandbox page in development mode
if (process.env.NODE_ENV === 'development') {
    pages.push({ path: '/sandbox', component: <Sandbox /> });
}

const AppRoutes = () => {
    return (
        <>
            <Routes>
                {pages.map((page) => (
                    page.path === '/'
                        ? <Route exact path={page.path} element={page.component} />
                        : <Route path={page.path} element={page.component} />
                ))}
            </Routes>
        </>
    )
}

export default AppRoutes

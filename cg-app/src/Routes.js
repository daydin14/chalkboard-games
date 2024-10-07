// Dependencies
import React from 'react'
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Battleship from './pages/BattleShip';
import Connect4 from './pages/Connect4';
import Dots from './pages/Dots';
import Hangman from './pages/Hangman';
import MemoryMatching from './pages/MemoryMatching';
import Minesweeper from './pages/Minesweeper';
import RockPaperScissors from './pages/RockPaperScissor';
import SimonSays from './pages/SimonSays';
import Snake from './pages/Snake';
import TicTacToe from './pages/TicTacToe';

import Sandbox from './pages/Sandbox';

// Routes
const pages = [
    { path: '/', component: <Home /> },
    { path: '/battle-ship', component: <Battleship /> },
    { path: '/connect4', component: <Connect4 /> },
    { path: '/dots', component: <Dots /> },
    { path: '/hangman', component: <Hangman /> },
    { path: '/memory', component: <MemoryMatching /> },
    { path: '/minesweeper', component: <Minesweeper /> },
    { path: '/rock-paper-scissors', component: <RockPaperScissors /> },
    { path: '/simon-says', component: <SimonSays /> },
    { path: '/snake', component: <Snake /> },
    { path: '/tic-tac-toe', component: <TicTacToe /> },
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
                        ? <Route key={page.path} exact path={page.path} element={page.component} />
                        : <Route key={page.path} path={page.path} element={page.component} />
                ))}
            </Routes>
        </>
    )
}

export default AppRoutes

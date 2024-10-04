// Dependencies
import React from 'react'
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import HangmanPage from './pages/HangmanPage';
import Connect4Page from './pages/Connect4Page';
import DotsGamePage from './pages/DotsGamePage';
import MemoryGamePage from './pages/MemoryGamePage';
import SnakeGamePage from './pages/SnakeGamePage';
import Sandbox from './pages/Sandbox';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/tic-tac-toe" element={<TicTacToe />} />
                <Route path="/hangman" element={<HangmanPage />} />
                <Route path="/connect4" element={<Connect4Page />} />
                <Route path="/dots" element={<DotsGamePage />} />
                <Route path="/memory" element={<MemoryGamePage />} />
                <Route path="/snake" element={<SnakeGamePage />} />
                {process.env.NODE_ENV === 'development' && (
                    <Route path="/sandbox" element={<Sandbox />} />
                )}
            </Routes>
        </>
    )
}

export default AppRoutes

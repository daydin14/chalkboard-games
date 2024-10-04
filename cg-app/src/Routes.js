// Dependencies
import React from 'react'
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import HangmanPage from './pages/HangmanPage';
import Sandbox from './pages/Sandbox';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/tic-tac-toe" element={<TicTacToe />} />
                <Route path="/hangman" element={<HangmanPage />} />
                {process.env.NODE_ENV === 'development' && (
                    <Route path="/sandbox" element={<Sandbox />} />
                )}
            </Routes>
        </>
    )
}

export default AppRoutes

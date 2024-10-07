// Dependencies
import React from 'react';

// Components
import Game from '../components/games/hangman/Game';

function Hangman() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-center">Hangman Game</h1>
            <h4 className="text-lg mb-2 text-center">Can you guess the word with 6 tries?</h4>
            <Game />
        </>
    );
}

export default Hangman;
import React from 'react';
import Hangman from '../components/games/hangman/Hangman';

function HangmanPage() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-center">Hangman Game</h1>
            <h4 className="text-lg mb-2 text-center">Can you guess the word with 6 tries?</h4>
            <Hangman />
        </>
    );
}

export default HangmanPage;
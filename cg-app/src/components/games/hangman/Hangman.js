// Dependencies
import React, { useState } from 'react';

// Components
import Word from './Word';
import Keyboard from './Keyboard';
import HangmanDrawing from './HangmanDrawing';

const words = ['react', 'javascript', 'hangman', 'coding'];

function Hangman() {
    const [word] = useState(words[Math.floor(Math.random() * words.length)]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);

    const handleLetterClick = (letter) => {
        if (word.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else {
            setIncorrectGuesses(incorrectGuesses + 1);
        }
    };

    const isGameOver = incorrectGuesses >= 6;
    const isGameWon = word.split('').every((letter) => guessedLetters.includes(letter));

    return (
        <div className="hangman">
            <HangmanDrawing incorrectGuesses={incorrectGuesses} />
            <Word word={word} guessedLetters={guessedLetters} />
            <Keyboard onLetterClick={handleLetterClick} guessedLetters={guessedLetters} />
            {isGameOver && <div className="game-over">Game Over! The word was {word}.</div>}
            {isGameWon && <div className="game-won">Congratulations! You guessed the word.</div>}
        </div>
    );
}

export default Hangman;
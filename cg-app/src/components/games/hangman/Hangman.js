// Dependencies
import React, { useState } from 'react';

// Components
import Word from './Word';
import Keyboard from './Keyboard';
import HangmanDrawing from './HangmanDrawing';

const words = ['react', 'javascript', 'hangman', 'coding'];

function Hangman() {
    const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [color, setColor] = useState('black');

    const handleLetterClick = (letter) => {
        if (word.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else {
            setIncorrectGuesses(incorrectGuesses + 1);
        }
    };

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const resetGame = () => {
        setWord(words[Math.floor(Math.random() * words.length)]);
        setGuessedLetters([]);
        setIncorrectGuesses(0);
    };

    const isGameOver = incorrectGuesses >= 6;
    const isGameWon = word.split('').every((letter) => guessedLetters.includes(letter));

    return (
        <div className="flex flex-col items-center justify-center">
            <HangmanDrawing incorrectGuesses={incorrectGuesses} color={color} />
            <Word word={word} guessedLetters={guessedLetters} />
            <Keyboard onLetterClick={handleLetterClick} guessedLetters={guessedLetters} onColorChange={handleColorChange} disabled={isGameOver || isGameWon} />
            {isGameOver && <div className="text-red-500 text-xl mt-4">Game Over! The word was {word}.</div>}
            {isGameWon && <div className="text-green-500 text-xl mt-4">Congratulations! You guessed the word.</div>}
            {(isGameOver || isGameWon) && (
                <button className={`mt-4 px-4 py-2 text-white rounded ${isGameWon ? 'bg-blue-500' : 'bg-red-500'}`} onClick={resetGame}>
                    Reset Game
                </button>
            )}
        </div>
    );
}

export default Hangman;
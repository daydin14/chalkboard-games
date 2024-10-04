import React from 'react';

function Keyboard({ onLetterClick, guessedLetters }) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return (
        <div className="keyboard">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    disabled={guessedLetters.includes(letter)}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}

export default Keyboard;
import React from 'react';

function Word({ word, guessedLetters }) {
    return (
        <div className="flex space-x-10 mb-6">
            {word.split('').map((letter, index) => (
                <span key={index} className="letter text-6xl font-mono">
                    {guessedLetters.includes(letter) ? letter : '_'}
                </span>
            ))}
        </div>
    );
}

export default Word;
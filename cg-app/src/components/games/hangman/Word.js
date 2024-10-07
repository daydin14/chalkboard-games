// Dependencies
import React from 'react';

// Hooks
import useIsMobile from '../../../hooks/useIsMobile';

function Word({ word, guessedLetters }) {
    const isMobile = useIsMobile();

    return (
        <div className={`flex ${isMobile ? 'space-x-4 mb-4' : 'space-x-10 mb-6'}`}>
            {word.split('').map((letter, index) => (
                <span key={index} className={`letter ${isMobile ? 'text-4xl' : 'text-6xl'} font-mono`}>
                    {guessedLetters.includes(letter) ? letter : '_'}
                </span>
            ))}
        </div>
    );
}

export default Word;
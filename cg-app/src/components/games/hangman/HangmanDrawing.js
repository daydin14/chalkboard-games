import React from 'react';

function HangmanDrawing({ incorrectGuesses }) {
    const stages = [
        // Add ASCII art or SVG drawings for each stage of the hangman
        '',
        'O',
        'O\n|',
        'O\n/|',
        'O\n/|\\',
        'O\n/|\\\n/',
        'O\n/|\\\n/ \\',
    ];

    return (
        <pre className="hangman-drawing">
            {stages[incorrectGuesses]}
        </pre>
    );
}

export default HangmanDrawing;
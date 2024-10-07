// Dependencies
import React, { useState, useEffect } from 'react';

function Keyboard({ onLetterClick, guessedLetters, onColorChange, disabled }) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const [color, setColor] = useState('black');

    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setColor(newColor);
        onColorChange(newColor); // Call the onColorChange prop
    };

    const handleKeyPress = (event) => {
        const letter = event.key.toLowerCase();
        if (alphabet.includes(letter) && !guessedLetters.includes(letter) && !disabled) {
            onLetterClick(letter);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [guessedLetters, disabled]);

    return (
        <div className="grid grid-cols-7 gap-2">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    disabled={guessedLetters.includes(letter) || disabled}
                    className={`p-4 border rounded ${guessedLetters.includes(letter) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                >
                    {letter}
                </button>
            ))}
            <br />
            <div className="p-0 border rounded bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center">
                <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    className="w-full h-full cursor-pointer"
                    style={{ appearance: 'none', padding: 0, border: 'none', background: 'none' }}
                />
            </div>
        </div>
    );
}

export default Keyboard;
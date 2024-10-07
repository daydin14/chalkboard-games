// Dependencies
import React, { useState, useEffect, useCallback } from 'react';

// Components
import Board from './Board';

const COLORS = ['red', 'green', 'blue', 'yellow'];

function Game() {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [activeColor, setActiveColor] = useState(null);
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [message, setMessage] = useState('Press Start to Play');
    const [clickedColor, setClickedColor] = useState(null);

    const addColorToSequence = useCallback(() => {
        const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        setSequence((prevSequence) => [...prevSequence, newColor]);
        setMessage('Watch the sequence...');
        playSequence([...sequence, newColor]);
    }, [sequence]);

    const playSequence = useCallback((sequence) => {
        sequence.forEach((color, index) => {
            setTimeout(() => {
                setActiveColor(color);
                setTimeout(() => setActiveColor(null), 500);
            }, (index + 1) * 1000);
        });
        setTimeout(() => {
            setIsUserTurn(true);
            setMessage('Your turn...');
        }, sequence.length * 1000 + 500);
    }, []);

    useEffect(() => {
        if (userSequence.length === sequence.length && isUserTurn) {
            if (userSequence.every((color, index) => color === sequence[index])) {
                setMessage('Correct! Next round...');
                setTimeout(() => {
                    setUserSequence([]);
                    setIsUserTurn(false);
                    addColorToSequence();
                }, 1000);
            } else {
                setMessage('Game Over! Press Start to Play Again');
            }
        }
    }, [userSequence, sequence, isUserTurn, addColorToSequence]);

    const handleButtonClick = (color) => {
        if (isUserTurn) {
            setClickedColor(color);
            setUserSequence([...userSequence, color]);
            setTimeout(() => setClickedColor(null), 300); // Reset the clicked color after 300ms
        }
    };

    const handleStart = () => {
        setSequence([]);
        setUserSequence([]);
        setIsUserTurn(false);
        setMessage('Watch the sequence...');
        addColorToSequence();
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Board colors={COLORS} onButtonClick={handleButtonClick} activeColor={activeColor} clickedColor={clickedColor} />
            <div className="mt-4 text-xl">{message}</div>
            <button
                onClick={handleStart}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Start
            </button>
        </div>
    );
}

export default Game;
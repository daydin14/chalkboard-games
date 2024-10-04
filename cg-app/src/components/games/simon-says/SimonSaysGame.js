import React, { useState, useEffect } from 'react';
import Board from './Board';

const COLORS = ['red', 'green', 'blue', 'yellow'];

function SimonSaysGame() {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [activeColor, setActiveColor] = useState(null);
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [message, setMessage] = useState('Press Start to Play');

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
    }, [userSequence]);

    const addColorToSequence = () => {
        const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        setSequence([...sequence, newColor]);
        setMessage('Watch the sequence...');
        playSequence([...sequence, newColor]);
    };

    const playSequence = (sequence) => {
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
    };

    const handleButtonClick = (color) => {
        if (isUserTurn) {
            setUserSequence([...userSequence, color]);
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
        <div className="simon-says-game">
            <h1>Simon Says Game</h1>
            <Board colors={COLORS} onButtonClick={handleButtonClick} activeColor={activeColor} />
            <div className="message">{message}</div>
            <button onClick={handleStart}>Start</button>
        </div>
    );
}

export default SimonSaysGame;
// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import Card from './Card';

const initialCards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function Game() {
    const [cards, setCards] = useState(shuffle([...initialCards]));
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedIndices, setMatchedIndices] = useState([]);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
            }
            setTimeout(() => setFlippedIndices([]), 1000);
        }
    }, [flippedIndices, cards, matchedIndices]);

    const handleCardClick = (index) => {
        if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
            setFlippedIndices([...flippedIndices, index]);
        }
    };

    const resetGame = () => {
        setCards(shuffle([...initialCards]));
        setFlippedIndices([]);
        setMatchedIndices([]);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={resetGame}
                className="mb-4 p-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition-colors duration-200"
            >
                Reset Game
            </button>
            <div className="grid grid-cols-4 gap-4">
                {cards.map((value, index) => (
                    <Card
                        key={index}
                        value={value}
                        isFlipped={flippedIndices.includes(index) || matchedIndices.includes(index)}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Game;
import React, { useState } from 'react';
import Board from './Board';

const words = ['REACT', 'JAVASCRIPT', 'HTML', 'CSS', 'NODE', 'REDUX'];
const boardSize = 10;

function generateBoard(words, size) {
    const board = Array.from({ length: size }, () => Array(size).fill(''));
    // Place words on the board (simplified for this example)
    words.forEach((word, index) => {
        for (let i = 0; i < word.length; i++) {
            board[index][i] = word[i];
        }
    });
    // Fill the rest of the board with random letters
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (!board[row][col]) {
                board[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
    return board;
}

function WordSearchGame() {
    const [board] = useState(generateBoard(words, boardSize));
    const [highlightedCells, setHighlightedCells] = useState([]);

    const handleCellClick = (row, col) => {
        setHighlightedCells([...highlightedCells, [row, col]]);
    };

    return (
        <div className="word-search-game">
            <h1>Word Search Game</h1>
            <Board board={board} highlightedCells={highlightedCells} onCellClick={handleCellClick} />
        </div>
    );
}

export default WordSearchGame;
import React, { useState } from 'react';
import Board from './Board';

const ROWS = 6;
const COLS = 7;

function Connect4() {
    const [board, setBoard] = useState(Array(ROWS).fill(Array(COLS).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('Red');
    const [winner, setWinner] = useState(null);

    const handleCellClick = (colIndex) => {
        if (winner) return;

        const newBoard = board.map(row => row.slice());
        for (let rowIndex = ROWS - 1; rowIndex >= 0; rowIndex--) {
            if (!newBoard[rowIndex][colIndex]) {
                newBoard[rowIndex][colIndex] = currentPlayer;
                break;
            }
        }

        setBoard(newBoard);
        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else {
            setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        }
    };

    const calculateWinner = (board) => {
        const checkDirection = (row, col, rowDir, colDir) => {
            let count = 0;
            let player = board[row][col];
            for (let i = 0; i < 4; i++) {
                const newRow = row + i * rowDir;
                const newCol = col + i * colDir;
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === player) {
                    count++;
                } else {
                    break;
                }
            }
            return count === 4 ? player : null;
        };

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (board[row][col]) {
                    if (checkDirection(row, col, 0, 1) || // Horizontal
                        checkDirection(row, col, 1, 0) || // Vertical
                        checkDirection(row, col, 1, 1) || // Diagonal down-right
                        checkDirection(row, col, 1, -1)) { // Diagonal down-left
                        return board[row][col];
                    }
                }
            }
        }
        return null;
    };

    return (
        <div className="connect4">
            <h1>Connect 4</h1>
            <Board board={board} onCellClick={handleCellClick} />
            {winner && <div className="winner">Winner: {winner}</div>}
            {!winner && <div className="current-player">Current Player: {currentPlayer}</div>}
        </div>
    );
}

export default Connect4;
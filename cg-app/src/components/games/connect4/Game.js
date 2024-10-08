// Dependencies
import React, { useState } from 'react';

// Components
import Board from './Board';

const ROWS = 6;
const COLS = 7;

const Game = () => {
    const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('Red');
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState([]);

    const handleCellClick = (colIndex) => {
        if (winner) return;

        const newBoard = board.map(row => [...row]);
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!newBoard[row][colIndex]) {
                newBoard[row][colIndex] = currentPlayer;
                break;
            }
        }

        setBoard(newBoard);
        const result = calculateWinner(newBoard);
        if (result) {
            setWinner(result.player);
            setWinningCells(result.cells);
        } else {
            setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        }
    };

    const calculateWinner = (board) => {
        const checkDirection = (row, col, rowDir, colDir) => {
            let count = 0;
            let player = board[row][col];
            const cells = [];
            for (let i = 0; i < 4; i++) {
                const newRow = row + i * rowDir;
                const newCol = col + i * colDir;
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === player) {
                    count++;
                    cells.push([newRow, newCol]);
                } else {
                    break;
                }
            }
            return count === 4 ? { player, cells } : null;
        };

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (board[row][col]) {
                    const result = checkDirection(row, col, 0, 1) || // Horizontal
                        checkDirection(row, col, 1, 0) || // Vertical
                        checkDirection(row, col, 1, 1) || // Diagonal down-right
                        checkDirection(row, col, 1, -1);  // Diagonal down-left
                    if (result) {
                        return result;
                    }
                }
            }
        }
        return null;
    };

    const resetGame = () => {
        setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
        setCurrentPlayer('Red');
        setWinner(null);
        setWinningCells([]);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <button className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-200" onClick={resetGame}>
                Reset Game
            </button>
            <Board board={board} onCellClick={handleCellClick} winningCells={winningCells} />
            {winner && <div className="mt-4 p-2 bg-green-500 text-white font-bold rounded">Winner: {winner}</div>}
        </div>
    );
};

export default Game;
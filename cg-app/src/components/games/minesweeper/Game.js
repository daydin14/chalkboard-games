// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import Board from './Board';

const ROWS = 10;
const COLS = 10;
const MINES = 10;

function Game() {
    const [board, setBoard] = useState(createBoard());
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setBoard(createBoard());
    }, []);

    const handleCellClick = (row, col) => {
        if (gameOver) return;

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        if (newBoard[row][col].isMine) {
            revealBoard(newBoard);
            setGameOver(true);
            alert('Game Over');
        } else {
            revealCell(newBoard, row, col);
        }
        setBoard(newBoard);
    };

    const handleCellRightClick = (row, col) => {
        if (gameOver) return;

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setBoard(newBoard);
    };

    const resetGame = () => {
        setBoard(createBoard());
        setGameOver(false);
    };

    return (
        <div className="flex flex-col items-center">
            <Board board={board} onCellClick={handleCellClick} onCellRightClick={handleCellRightClick} />
            <button
                onClick={resetGame}
                className="mt-4 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors duration-200"
            >
                Reset Game
            </button>
        </div>
    );
}

function createBoard() {
    let board = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighbor: 0,
        }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }

    // Calculate neighbors
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (!board[row][col].isMine) {
                board[row][col].neighbor = getNeighborCount(board, row, col);
            }
        }
    }

    return board;
}

function getNeighborCount(board, row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    return directions.reduce((count, [dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol].isMine) {
            count++;
        }
        return count;
    }, 0);
}

function revealBoard(board) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            board[row][col].isRevealed = true;
        }
    }
}

function revealCell(board, row, col) {
    if (board[row][col].isRevealed || board[row][col].isFlagged) return;

    board[row][col].isRevealed = true;
    if (board[row][col].neighbor === 0) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                revealCell(board, newRow, newCol);
            }
        });
    }
}

export default Game;
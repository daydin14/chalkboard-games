import React, { useState } from 'react';
import Board from './Board';

const initialBoard = Array.from({ length: 10 }, () => Array(10).fill(''));

function BattleshipGame() {
    const [board, setBoard] = useState(initialBoard);
    const [ships, setShips] = useState([
        { size: 5, positions: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] },
        { size: 4, positions: [[2, 0], [2, 1], [2, 2], [2, 3]] },
        { size: 3, positions: [[4, 0], [4, 1], [4, 2]] },
        { size: 3, positions: [[6, 0], [6, 1], [6, 2]] },
        { size: 2, positions: [[8, 0], [8, 1]] },
    ]);

    const handleCellClick = (row, col) => {
        const newBoard = board.map((row) => row.slice());
        if (newBoard[row][col] === '') {
            newBoard[row][col] = ships.some((ship) =>
                ship.positions.some(([r, c]) => r === row && c === col)
            )
                ? 'hit'
                : 'miss';
            setBoard(newBoard);
        }
    };

    return (
        <div className="battleship-game">
            <h1>Battleship Game</h1>
            <Board board={board} onCellClick={handleCellClick} />
        </div>
    );
}

export default BattleshipGame;
import React, { useState } from "react";
import Board from "./Board";

const initialBoard = [
    // Example initial board with some cells filled and others empty
    [
        { value: 5, readOnly: true },
        { value: 3, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 7, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
    ],
    [
        { value: 6, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 1, readOnly: true },
        { value: 9, readOnly: true },
        { value: 5, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
    ],
    [
        { value: "", readOnly: false },
        { value: 9, readOnly: true },
        { value: 8, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 6, readOnly: true },
        { value: "", readOnly: false },
    ],
    [
        { value: 8, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 6, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 3, readOnly: true },
    ],
    [
        { value: 4, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 8, readOnly: true },
        { value: "", readOnly: false },
        { value: 3, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 1, readOnly: true },
    ],
    [
        { value: 7, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 2, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 6, readOnly: true },
    ],
    [
        { value: "", readOnly: false },
        { value: 6, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 2, readOnly: true },
        { value: 8, readOnly: true },
        { value: "", readOnly: false },
    ],
    [
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 4, readOnly: true },
        { value: 1, readOnly: true },
        { value: 9, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 5, readOnly: true },
    ],
    [
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 8, readOnly: true },
        { value: "", readOnly: false },
        { value: "", readOnly: false },
        { value: 7, readOnly: true },
        { value: 9, readOnly: true },
    ],
];

function SudokuGame() {
    const [board, setBoard] = useState(initialBoard);

    const handleCellChange = (row, col, value) => {
        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        newBoard[row][col].value = value;
        setBoard(newBoard);
    };

    return (
        <div className="sudoku-game">
            <h1>Sudoku Game</h1>
            <Board board={board} onCellChange={handleCellChange} />
        </div>
    );
}

export default SudokuGame;

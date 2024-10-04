import React, { useState } from "react";
import Board from "./Board";

const initialBoard = [
    [
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
    ],
    [
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
    ],
    [
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "red", isKing: false } },
        { color: "white" },
    ],
    [
        { color: "white" },
        { color: "black" },
        { color: "white" },
        { color: "black" },
        { color: "white" },
        { color: "black" },
        { color: "white" },
        { color: "black" },
    ],
    [
        { color: "black" },
        { color: "white" },
        { color: "black" },
        { color: "white" },
        { color: "black" },
        { color: "white" },
        { color: "black" },
        { color: "white" },
    ],
    [
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
    ],
    [
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
    ],
    [
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
        { color: "white" },
        { color: "black", piece: { color: "black", isKing: false } },
    ],
];

function CheckersGame() {
    const [board, setBoard] = useState(initialBoard);
    const [selectedCell, setSelectedCell] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("red");

    const handleCellClick = (row, col) => {
        const cell = board[row][col];
        if (selectedCell) {
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            const [selectedRow, selectedCol] = selectedCell;
            newBoard[row][col].piece = newBoard[selectedRow][selectedCol].piece;
            newBoard[selectedRow][selectedCol].piece = null;
            setBoard(newBoard);
            setSelectedCell(null);
            setCurrentPlayer(currentPlayer === "red" ? "black" : "red");
        } else if (cell.piece && cell.piece.color === currentPlayer) {
            setSelectedCell([row, col]);
        }
    };

    return (
        <div className="checkers-game">
            <h1>Checkers Game</h1>
            <Board board={board} onCellClick={handleCellClick} />
            <div className="current-player">Current Player: {currentPlayer}</div>
        </div>
    );
}

export default CheckersGame;

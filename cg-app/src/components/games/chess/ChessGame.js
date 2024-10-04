import React, { useState } from "react";
import Board from "./Board";

const initialBoard = [
    // Simplified initial board setup
    [
        { piece: { type: "rook", color: "black" }, color: "black" },
        { piece: { type: "knight", color: "black" }, color: "white" },
        { piece: { type: "bishop", color: "black" }, color: "black" },
        { piece: { type: "queen", color: "black" }, color: "white" },
        { piece: { type: "king", color: "black" }, color: "black" },
        { piece: { type: "bishop", color: "black" }, color: "white" },
        { piece: { type: "knight", color: "black" }, color: "black" },
        { piece: { type: "rook", color: "black" }, color: "white" },
    ],
    [
        { piece: { type: "pawn", color: "black" }, color: "white" },
        { piece: { type: "pawn", color: "black" }, color: "black" },
        { piece: { type: "pawn", color: "black" }, color: "white" },
        { piece: { type: "pawn", color: "black" }, color: "black" },
        { piece: { type: "pawn", color: "black" }, color: "white" },
        { piece: { type: "pawn", color: "black" }, color: "black" },
        { piece: { type: "pawn", color: "black" }, color: "white" },
        { piece: { type: "pawn", color: "black" }, color: "black" },
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
        { color: "black" },
        { color: "white" },
        { color: "black" },
        { color: "white" },
        { color: "black" },
        { color: "white" },
        { color: "black" },
    ],
    [
        { piece: { type: "pawn", color: "white" }, color: "black" },
        { piece: { type: "pawn", color: "white" }, color: "white" },
        { piece: { type: "pawn", color: "white" }, color: "black" },
        { piece: { type: "pawn", color: "white" }, color: "white" },
        { piece: { type: "pawn", color: "white" }, color: "black" },
        { piece: { type: "pawn", color: "white" }, color: "white" },
        { piece: { type: "pawn", color: "white" }, color: "black" },
        { piece: { type: "pawn", color: "white" }, color: "white" },
    ],
    [
        { piece: { type: "rook", color: "white" }, color: "white" },
        { piece: { type: "knight", color: "white" }, color: "black" },
        { piece: { type: "bishop", color: "white" }, color: "white" },
        { piece: { type: "queen", color: "white" }, color: "black" },
        { piece: { type: "king", color: "white" }, color: "white" },
        { piece: { type: "bishop", color: "white" }, color: "black" },
        { piece: { type: "knight", color: "white" }, color: "white" },
        { piece: { type: "rook", color: "white" }, color: "black" },
    ],
];

function ChessGame() {
    const [board, setBoard] = useState(initialBoard);
    const [selectedCell, setSelectedCell] = useState(null);

    const handleCellClick = (row, col) => {
        if (selectedCell) {
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            const [selectedRow, selectedCol] = selectedCell;
            newBoard[row][col].piece = newBoard[selectedRow][selectedCol].piece;
            newBoard[selectedRow][selectedCol].piece = null;
            setBoard(newBoard);
            setSelectedCell(null);
        } else if (board[row][col].piece) {
            setSelectedCell([row, col]);
        }
    };

    return (
        <div className="chess-game">
            <h1>Chess Game</h1>
            <Board board={board} onCellClick={handleCellClick} />
        </div>
    );
}

export default ChessGame;

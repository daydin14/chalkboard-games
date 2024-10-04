import React from 'react';
import Cell from './Cell';

function Board({ board, highlightedCells, onCellClick }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            value={cell}
                            isHighlighted={highlightedCells.some(([r, c]) => r === rowIndex && c === colIndex)}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
// Dependencies
import React from 'react';

// Components
import Cell from './Cell';

function Board({ board, onCellClick, winningCells }) {
    return (
        <div className="relative grid grid-rows-6 gap-1 bg-blue-700 p-2 rounded-lg">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7 gap-1">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            value={cell}
                            onClick={() => onCellClick(colIndex)}
                            isWinningCell={winningCells.some(([r, c]) => r === rowIndex && c === colIndex)}
                        />
                    ))}
                </div>
            ))}
            {winningCells.length > 0 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                        x1={`${winningCells[0][1] * 14 + 7}%`}
                        y1={`${winningCells[0][0] * 16.67 + 8.33}%`}
                        x2={`${winningCells[3][1] * 14 + 7}%`}
                        y2={`${winningCells[3][0] * 16.67 + 8.33}%`}
                        stroke="black"
                        strokeWidth="4"
                    />
                </svg>
            )}
        </div>
    );
}

export default Board;
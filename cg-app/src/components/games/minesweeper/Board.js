// Dependencies
import React from 'react';

// Components
import Cell from './Cell';

function Board({ board, onCellClick, onCellRightClick }) {
    return (
        <div className="grid gap-1">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            value={cell}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                            onRightClick={() => onCellRightClick(rowIndex, colIndex)}
                            className="w-8 h-8 border border-gray-400"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
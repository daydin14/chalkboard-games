// Dependencies
import React from 'react';

// Components
import Cell from './Cell';

function Board({ board }) {
    return (
        <div className="grid grid-rows-auto">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <Cell key={colIndex} type={cell} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
import React from 'react';
import Cell from './Cell';

function Board({ board }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <Cell key={colIndex} type={cell} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
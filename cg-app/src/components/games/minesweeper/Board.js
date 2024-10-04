import React from 'react';
import Cell from './Cell';

function Board({ board, onCellClick, onCellRightClick }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            value={cell}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                            onRightClick={() => onCellRightClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
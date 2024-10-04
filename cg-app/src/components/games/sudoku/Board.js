import React from 'react';
import Cell from './Cell';

function Board({ board, onCellChange }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            value={cell.value}
                            onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                            readOnly={cell.readOnly}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
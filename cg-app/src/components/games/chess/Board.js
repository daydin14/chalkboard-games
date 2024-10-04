import React from 'react';
import Cell from './Cell';

function Board({ board, onCellClick }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            piece={cell.piece}
                            color={cell.color}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
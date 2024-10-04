import React from 'react';
import Dot from './Dot';
import Line from './Line';
import Box from './Box';

function Board({ board, onLineClick }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <React.Fragment key={colIndex}>
                            <Dot />
                            {cell.horizontal && (
                                <Line
                                    orientation="horizontal"
                                    onClick={() => onLineClick(rowIndex, colIndex, 'horizontal')}
                                />
                            )}
                            {cell.box && <Box owner={cell.box} />}
                        </React.Fragment>
                    ))}
                    <Dot />
                </div>
            ))}
            <div className="board-row">
                {board[0].map((_, colIndex) => (
                    <React.Fragment key={colIndex}>
                        <Dot />
                        <Line
                            orientation="horizontal"
                            onClick={() => onLineClick(board.length, colIndex, 'horizontal')}
                        />
                    </React.Fragment>
                ))}
                <Dot />
            </div>
        </div>
    );
}

export default Board;
// Dependencies
import React from 'react';

// Components
import Square from './Square';

function Board({ squares, onClick }) {
    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => onClick(i)} />;
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="flex gap-2">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="flex gap-2">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;
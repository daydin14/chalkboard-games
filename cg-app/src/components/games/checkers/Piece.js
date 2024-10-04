import React from 'react';

function Piece({ color, isKing }) {
    return (
        <div className={`piece ${color} ${isKing ? 'king' : ''}`}></div>
    );
}

export default Piece;
import React from 'react';
import Piece from './Piece';

function Cell({ piece, color, onClick }) {
    return (
        <div className={`cell ${color}`} onClick={onClick}>
            {piece && <Piece type={piece.type} color={piece.color} />}
        </div>
    );
}

export default Cell;
import React from 'react';
import Piece from './Piece';

function Cell({ color, piece, onClick }) {
    return (
        <div className={`cell ${color}`} onClick={onClick}>
            {piece && <Piece color={piece.color} isKing={piece.isKing} />}
        </div>
    );
}

export default Cell;
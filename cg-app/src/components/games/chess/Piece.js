import React from 'react';

function Piece({ type, color }) {
    return (
        <div className={`piece ${color}`}>
            {type}
        </div>
    );
}

export default Piece;
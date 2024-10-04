import React from 'react';

function Cell({ value, isHighlighted, onClick }) {
    return (
        <div className={`cell ${isHighlighted ? 'highlighted' : ''}`} onClick={onClick}>
            {value}
        </div>
    );
}

export default Cell;
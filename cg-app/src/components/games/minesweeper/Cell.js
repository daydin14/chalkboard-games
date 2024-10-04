import React from 'react';

function Cell({ value, onClick, onRightClick }) {
    return (
        <div
            className={`cell ${value.isRevealed ? 'revealed' : ''}`}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onRightClick();
            }}
        >
            {value.isRevealed ? (value.isMine ? '💣' : value.neighbor) : value.isFlagged ? '🚩' : ''}
        </div>
    );
}

export default Cell;
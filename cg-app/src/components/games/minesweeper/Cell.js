// Dependencies
import React from 'react';

function Cell({ value, onClick, onRightClick }) {
    return (
        <div
            className={`
                ${value.isRevealed ? 'revealed' : ''} 
                ${value.isRevealed ? 'bg-gray-600' : 'bg-gray-800'} 
                ${value.isFlagged ? 'text-red-500' : ''} 
                flex items-center justify-center border border-gray-500
                `}
            style={{ width: '40px', height: '40px' }}
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
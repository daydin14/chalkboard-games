// Dependencies
import React from 'react';

function Cell({ value, onClick, isWinningCell }) {
    return (
        <div
            className={`w-12 h-12 flex items-center justify-center border border-gray-300 bg-blue-500 rounded-full ${isWinningCell ? 'ring-4 ring-green-500' : ''}`}
            onClick={onClick}
        >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${value === 'Red' ? 'bg-red-500' : value === 'Yellow' ? 'bg-yellow-500' : 'bg-white'}`}>
            </div>
        </div>
    );
}

export default Cell;
// Dependencies
import React from 'react';

function Square({ value, onClick }) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded w-48 h-48 flex items-center justify-center text-6xl"
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default Square;
// Dependencies
import React from 'react';

// Hooks
import useIsMobile from '../../../hooks/useIsMobile';

function Square({ value, onClick }) {
    const isMobile = useIsMobile();

    return (
        <button
            className={`${isMobile
                    ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 h-24 flex items-center justify-center text-3xl'
                    : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded w-48 h-48 flex items-center justify-center text-6xl'
                }`}
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default Square;
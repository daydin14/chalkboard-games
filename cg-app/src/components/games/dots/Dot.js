import React from 'react';

const Dot = ({ id, x, y, zIndex }) => {
    return (
        <div
            className="absolute h-4 w-4 bg-gray-500 rounded-full z-50"
            style={{ zIndex, left: `${x}px`, top: `${y}px` }}
            data-box={id}
        ></div>
    );
};

export default Dot;
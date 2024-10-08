import React from 'react';

const Line = ({ id, line1, line2, x, y, zIndex, type }) => {
    const isHorizontal = type === 'lineh';
    return (
        <div
            className={`absolute ${isHorizontal ? 'h-1 w-12' : 'w-1 h-12'} bg-whitesmoke cursor-pointer`}
            data-line-1={line1}
            data-line-2={line2}
            style={{ zIndex, left: `${x}px`, top: `${y}px` }}
            data-active="false"
        ></div>
    );
};

export default Line;
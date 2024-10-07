import React from 'react';

const Box = ({ id, x, y, zIndex }) => {
    return (
        <div
            className="absolute w-12 h-12 bg-white"
            data-id={id}
            style={{ zIndex, left: `${x}px`, top: `${y}px` }}
        ></div>
    );
};

export default Box;
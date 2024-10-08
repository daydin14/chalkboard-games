// Dependencies
import React, { useState } from 'react';

// Components
import Button from './Button';

function Board({ colors, onButtonClick, activeColor, clickedColor }) {
    const gridTemplateColumns = {
        gridTemplateColumns: 'repeat(2, 1fr)',
    };
    const [isCircle, setIsCircle] = useState(true);

    const toggleShape = () => {
        setIsCircle(!isCircle);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid gap-4" style={gridTemplateColumns}>
                {colors.map((color, index) => (
                    <Button
                        key={index}
                        color={color}
                        onClick={() => onButtonClick(color)}
                        isActive={activeColor === color}
                        isClicked={clickedColor === color}
                        isCircle={isCircle}
                        className="m-2"
                    />
                ))}
            </div>
            <button
                onClick={toggleShape}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
            >
                Toggle Shape
            </button>
        </div>
    );
}

export default Board;
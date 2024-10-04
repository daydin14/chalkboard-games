import React from 'react';
import Button from './Button';

function Board({ colors, onButtonClick, activeColor }) {
    return (
        <div className="board">
            {colors.map((color, index) => (
                <Button
                    key={index}
                    color={color}
                    onClick={() => onButtonClick(color)}
                    isActive={activeColor === color}
                />
            ))}
        </div>
    );
}

export default Board;
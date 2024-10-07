// Dependencies
import React from 'react';

function Cell({ type }) {
    return (
        <div
            className={`cell ${type} ${type === 'snake' ? 'bg-green-800' : 'bg-gray-200'}`}
            style={
                {
                    width: '20px',
                    height: '20px',
                    border: '1px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }>
            {/* Cell Display: */}
            {type === 'food' ? '🍎'
                : type === 'snake' ? '🐍' : null}
        </div>
    );
}

export default Cell;
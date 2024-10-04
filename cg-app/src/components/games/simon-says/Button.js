import React from 'react';

function Button({ color, onClick, isActive }) {
    return (
        <div
            className={`button ${color} ${isActive ? 'active' : ''}`}
            onClick={onClick}
        ></div>
    );
}

export default Button;
// Dependencies
import React from 'react';

const colorClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
};

const clickedColorClasses = {
    red: 'bg-red-300',
    green: 'bg-green-300',
    blue: 'bg-blue-300',
    yellow: 'bg-yellow-300',
};

function Button({ color, onClick, isActive, isClicked, isCircle }) {
    return (
        <div
            className={`
                ${isClicked ? clickedColorClasses[color] : colorClasses[color]} 
                ${isActive ? 'ring-4 ring-yellow-500' : 'ring-4 ring-gray-500'} 
                ${isCircle ? 'rounded-full' : 'rounded'} 
                w-28 h-28 m-4 
                cursor-pointer
            `}
            onClick={onClick}
        ></div>
    );
}

export default Button;
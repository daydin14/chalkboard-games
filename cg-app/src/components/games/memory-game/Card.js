import React from 'react';

function Card({ value, isFlipped, onClick }) {
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
            {isFlipped ? value : ''}
        </div>
    );
}

export default Card;
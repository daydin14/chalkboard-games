import React from 'react';

function Line({ orientation, onClick }) {
    return (
        <div className={`line ${orientation}`} onClick={onClick}></div>
    );
}

export default Line;
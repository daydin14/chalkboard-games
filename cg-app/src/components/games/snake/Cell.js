import React from 'react';

function Cell({ type }) {
    return <div className={`cell ${type}`}></div>;
}

export default Cell;
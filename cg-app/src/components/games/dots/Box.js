import React from 'react';

function Box({ owner }) {
    return (
        <div className={`box ${owner ? owner : ''}`}></div>
    );
}

export default Box;
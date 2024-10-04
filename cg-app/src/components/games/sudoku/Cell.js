import React from 'react';

function Cell({ value, onChange, readOnly }) {
    return (
        <input
            type="text"
            className="cell"
            value={value}
            onChange={onChange}
            readOnly={readOnly}
        />
    );
}

export default Cell;
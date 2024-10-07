// Depnedencies
import React from 'react';

// function Card({ value, isFlipped, onClick }) {
//     return (
//         <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
//             {isFlipped ? value : ''}
//         </div>
//     );
// }

function Card({ value, isFlipped, onClick }) {
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''} ${isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-4 rounded shadow-lg cursor-pointer flex items-center justify-center`} onClick={onClick} style={{ width: '100px', height: '150px', border: '1px solid #000', borderRadius: '10px' }}>
            {isFlipped ? (
                <div className="card-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {value}
                </div>
            ) : (
                <div className="card-back" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    ?
                </div>
            )}
        </div>
    );
}

export default Card;
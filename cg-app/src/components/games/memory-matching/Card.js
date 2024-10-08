// Depnedencies
import React from 'react';

// Hooks
import useIsMobile from '../../../hooks/useIsMobile';

function Card({ value, isFlipped, onClick }) {
    const isMobile = useIsMobile();

    return (
        <div
            className={`
                ${isFlipped ? 'flipped' : ''} 
                ${isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} 
                p-4 rounded shadow-lg cursor-pointer flex items-center justify-center
                ${isMobile ? 'mobile-card' : 'desktop-card'}
                `}
            onClick={onClick}
            style={
                {
                    width: isMobile ? '80px' : '100px',
                    height: isMobile ? '120px' : '150px',
                    border: '1px solid #000',
                    borderRadius: '10px'
                }
            }>
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
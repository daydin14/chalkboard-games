// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

const GamePanel = ({ name, description, link }) => {
    const getRandomColor = () => {
        const colors = [
            'from-red-500 to-yellow-500',
            'from-green-500 to-blue-500',
            'from-purple-500 to-pink-500',
            'from-indigo-500 to-teal-500',
            'from-orange-500 to-red-500',
            'from-yellow-500 to-green-500',
            'from-pink-500 to-purple-500',
            'from-teal-500 to-indigo-500',
            'from-blue-500 to-orange-500',
            'from-gray-500 to-gray-900',
            'from-cyan-500 to-lime-500',
            'from-amber-500 to-emerald-500',
            'from-fuchsia-500 to-rose-500',
            'from-lime-500 to-cyan-500',
            'from-emerald-500 to-amber-500',
            'from-rose-500 to-fuchsia-500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const gradientClass = getRandomColor();

    return (
        <div className={`p-4 border rounded shadow-lg hover:shadow-2xl transition-shadow duration-200 bg-gradient-to-r ${gradientClass} text-white`}>
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="mb-4">{description}</p>
            <Link to={link} className="inline-block px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-gray-200 transition-colors duration-200">
                Play {name}
            </Link>
        </div>
    );
};

export default GamePanel;
// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

const GamePanel = ({ name, description, link }) => {
    return (
        <div className="p-4 border rounded shadow-lg hover:shadow-2xl transition-shadow duration-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="mb-4">{description}</p>
            <Link to={link} className="inline-block px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-gray-200 transition-colors duration-200">
                Play {name}
            </Link>
        </div>
    );
};

export default GamePanel;
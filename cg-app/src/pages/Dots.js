// Dependencies
import React from 'react';

// Components
import Game from '../components/games/dots/Game';

function Dots() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4 text-center">Dots Game</h1>
            <h4 className="text-lg mb-2 text-center">Connect the dots to create boxes!</h4>
            <Game />
        </>
    );
}

export default Dots;
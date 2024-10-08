// Dependencies
import React from 'react';

// Components
import Game from '../components/games/memory-matching/Game';

function MemoryMatching() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4 text-center">Memory Game</h1>
            <h4 className="text-lg mb-2 text-center">Click on 2 cards to start matching!</h4>
            <Game />
        </>
    );
}

export default MemoryMatching;
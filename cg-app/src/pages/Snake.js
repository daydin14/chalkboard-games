// Dependencies
import React from 'react';

// Components
import Game from '../components/games/snake/Game';

// Hooks
import useIsMobile from '../hooks/useIsMobile';

function Snake() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-8 text-center">Snake Game</h1>
            <h4 className="text-lg mb-2 text-center">Grab as many apples as you can without touching the edges.</h4>
            {useIsMobile ? <h4 className="text-lg mb-2 text-center">Use the arrow keys to move.</h4> : <h4 className="text-lg mb-2 text-center">Use the arrow keys or swipe to move.</h4>}
            <Game />
        </>
    );
}

export default Snake;
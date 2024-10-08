// Dependencies
import React from 'react';

// Components
import Game from '../components/games/connect4/Game';

function Connect4Page() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4 text-center">Connect 4 Game</h1>
            <h4 className="text-lg mb-2 text-center">First to get 4 in a row wins!</h4>
            <Game />
        </>
    );
}

export default Connect4Page;
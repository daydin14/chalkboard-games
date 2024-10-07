// Dependencies
import React from 'react';

// Components
import Connect4 from '../components/games/connect4/Connect4';

function Connect4Page() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Connect 4 Game</h1>
            <Connect4 />
        </div>
    );
}

export default Connect4Page;
// Dependencies
import React from 'react';

// Components
import Game from '../components/games/rock-paper-scissor/Game';

function RockPaperScissors() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4 text-center">Rock, Paper, Scissors Game</h1>
            <h4 className="text-lg mb-2 text-center">Take a chance!</h4>
            <Game />
        </>
    );
}

export default RockPaperScissors;
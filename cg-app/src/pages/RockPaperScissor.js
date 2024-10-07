// Dependencies
import React from 'react';

// Components
import Game from '../components/games/rock-paper-scissor/Game';

function RockPaperScissors() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-8 text-center">Rock, Paper, Scissors Game</h1>
            <Game />
        </>
    );
}

export default RockPaperScissors;
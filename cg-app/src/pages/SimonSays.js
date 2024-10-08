// Dependencies
import React from 'react';

// Components
import Game from '../components/games/simon-says/Game';

function SimonSaysGamePage() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4 text-center">Simon Says Game</h1>
            <h4 className="text-lg mb-2 text-center">Repeat the pattern to win!</h4>
            <Game />
        </div>
    );
}

export default SimonSaysGamePage;
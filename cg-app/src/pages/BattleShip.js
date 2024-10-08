// Dependencies
import React from 'react';

// Components
import Game from '../components/games/battleship/Game';

function Battleship() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Battleship Game</h1>
            <h4 className="text-lg mb-2 text-center">Sink your opponent's ships!</h4>
            <Game />
        </div>
    );
}

export default Battleship;
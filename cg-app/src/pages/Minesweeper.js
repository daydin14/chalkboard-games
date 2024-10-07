// Dependencies
import React from 'react';

// Components
import Game from '../components/games/minesweeper/Game';

function Minesweeper() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-8 text-center">Minesweeper Game</h1>
            <h4 className="text-lg mb-2 text-center">Don't trip on a bomb!</h4>
            <Game />
        </>
    );
}

export default Minesweeper;
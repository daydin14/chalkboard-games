// Dependencies
import React from 'react'

// Components
import Game from '../components/games/tic-tac-toe/Game'

const TicTacToe = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-center">TicTacToe Game</h1>
            <h4 className="text-lg mb-4 text-center">First to get 3 in a row wins!</h4>
            <Game />
        </>
    )
}

export default TicTacToe

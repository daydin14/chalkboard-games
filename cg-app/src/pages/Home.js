// Dependencies
import React from 'react'

// Components
import GamePanel from '../components/dashboard/GamePanel'

const games = [
    { name: 'Rock Paper Scissors', description: 'A classic game of chance.', link: '/rock-paper-scissors' },
    { name: 'Tic-Tac-Toe', description: 'A classic game of Xs and Os.', link: '/tic-tac-toe' },
    { name: 'Hangman', description: 'Guess the word before you run out of attempts.', link: '/hangman' },
    { name: 'Connect 4', description: 'A two-player game of strategy.', link: '/connect4' },
    { name: 'Memory Matching', description: 'Match the pairs of cards.', link: '/memory' },
    { name: 'Minesweeper', description: 'Clear the minefield without detonating a mine.', link: '/minesweeper' },
    { name: 'Snake', description: 'Eat the apples and grow the snake.', link: '/snake' },
    { name: 'Simon Says', description: 'Repeat the pattern of colors.', link: '/simon-says' },

    // WIP Games
    // { name: 'Dots', description: 'Connect the dots to create squares.', link: '/dots' },
    // { name: 'Battle Ship', description: 'Sink your opponent\'s fleet.', link: '/battle-ship' },
];

const Home = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game, index) => (
                    <GamePanel key={index} name={game.name} description={game.description} link={game.link} />
                ))}
            </div>
        </>
    );
};

export default Home;
// Dependencies
import React from 'react'

// Components
import GamePanel from '../components/dashboard/GamePanel'

const games = [
    { name: 'Rock Paper Scissors', description: 'A classic game of chance.', link: '/rock-paper-scissors' },
    { name: 'Tic-Tac-Toe', description: 'A classic game of Xs and Os.', link: '/tic-tac-toe' },
    { name: 'Hangman', description: 'Guess the word before you run out of attempts.', link: '/hangman' },
    { name: 'Connect 4', description: 'A two-player game of strategy.', link: '/connect4' },

    // { name: 'Dots', description: 'Connect the dots to create squares.', link: '/dots' },
    // { name: 'Memory', description: 'Match the pairs of cards.', link: '/memory' },
    // { name: 'Snake', description: 'Eat the food and grow the snake.', link: '/snake' },
    // { name: 'Minesweeper', description: 'Clear the minefield without detonating a mine.', link: '/minesweeper' },
    // { name: 'Simon Says', description: 'Repeat the pattern of lights and sounds.', link: '/simon-says' },
    // { name: 'Checkers', description: 'Capture all of your opponent\'s pieces.', link: '/checkers' },
    // { name: 'Sudoku', description: 'Fill in the grid so that every row, column, and 3x3 box contains the digits 1-9.', link: '/sudoku' },
    // { name: 'Word Search', description: 'Find the words hidden in the grid.', link: '/word-search' },
    // { name: 'Battle Ship', description: 'Sink your opponent\'s fleet.', link: '/battle-ship' },
    // { name: 'Chess', description: 'Capture the king.', link: '/chess' }
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
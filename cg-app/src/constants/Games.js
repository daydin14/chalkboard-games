// Pages
import Home from '../pages/Home';
import Battleship from '../pages/BattleShip';
import Connect4 from '../pages/Connect4';
import Dots from '../pages/Dots';
import Hangman from '../pages/Hangman';
import MemoryMatching from '../pages/MemoryMatching';
import Minesweeper from '../pages/Minesweeper';
import RockPaperScissors from '../pages/RockPaperScissor';
import SimonSays from '../pages/SimonSays';
import Snake from '../pages/Snake';
import TicTacToe from '../pages/TicTacToe';

// Development Pages
import Sandbox from '../pages/Sandbox';

const Games = [
    {
        id: 0,
        title: "Home",
        description: "Welcome to Chalkboard Games.",
        link: "/",
        component: <Home />,
        environemnt: "production",
    },
    {
        id: 1,
        title: "Rock Paper Scissors",
        description: "A classic game of Rock Paper Scissors.",
        link: "/rock-paper-scissors",
        component: <RockPaperScissors />,
        environemnt: "production",
    },
    {
        id: 2,
        title: "Tic Tac Toe",
        description: "A classic game of Tic Tac Toe.",
        link: "/tic-tac-toe",
        component: <TicTacToe />,
        environemnt: "production",
    },
    {
        id: 3,
        title: "Hangman",
        description: "Guess the word before you run out of attempts.",
        link: "/hangman",
        component: <Hangman />,
        environemnt: "production",
    },
    {
        id: 4,
        title: "Connect 4",
        description: "A two-player game of Connect 4.",
        link: "/connect4",
        component: <Connect4 />,
        environemnt: "production",
    },
    {
        id: 5,
        title: "Memory",
        description: "Match the pairs of cards.",
        link: "/memory",
        component: <MemoryMatching />,
        environemnt: "production",
    },
    {
        id: 6,
        title: "Minesweeper",
        description: "Clear the minefield without detonating a mine.",
        link: "/minesweeper",
        component: <Minesweeper />,
        environemnt: "production",
    },
    {
        id: 7,
        title: "Snake",
        description: "Eat the apples and grow the snake.",
        link: "/snake",
        component: <Snake />,
        environemnt: "production",
    },
    {
        id: 8,
        title: "Simon Says",
        description: "Repeat the pattern of colors.",
        link: "/simon-says",
        component: <SimonSays />,
        environemnt: "production",
    },
    {
        id: 9,
        title: "Dots",
        description: "Connect the dots to create squares.",
        link: "/dots",
        component: <Dots />,
        environemnt: "development",
        // TODO: Finish Dots game
    },
    {
        id: 10,
        title: "Battle Ship",
        description: "Sink your opponent's fleet.",
        link: "/battle-ship",
        component: <Battleship />,
        environemnt: "development",
        // TODO: Finish Battle Ship game
    },
    ...(process.env.NODE_ENV === 'development' ? [{
        id: 999999999,
        title: "Sandbox",
        description: "A place to test new features.",
        link: "/sandbox",
        component: <Sandbox />,
        environemnt: "development",
    }] : [])
];

export default Games;
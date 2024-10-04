// Dependencies
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const links = [
    { path: "/", label: "Home" },
    { path: "/tic-tac-toe", label: "Tic Tac Toe" },
    { path: "/hangman", label: "Hangman" },
    { path: "/connect4", label: "Connect 4" },
    { path: "/dots", label: "Dots" },
    { path: "/memory", label: "Memory" },
    { path: "/snake", label: "Snake" },
    { path: "/minesweeper", label: "Minesweeper" },
    { path: "/simon-says", label: "Simon Says" },
    { path: "/checkers", label: "Checkers" },
    { path: "/rock-paper-scissors", label: "Rock Paper Scissors" },
    { path: "/sudoku", label: "Sudoku" },
];

// Conditionally add the Sandbox link in development mode
if (process.env.NODE_ENV === 'development') {
    links.push({ path: "/sandbox", label: "Sandbox" });
}

const NavMenu = () => {
    return (
        <>
            <nav>
                <ul>
                    {links.map((link) => (
                        <li key={link.path}>
                            <RouterLink to={link.path}>{link.label}</RouterLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default NavMenu

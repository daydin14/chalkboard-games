// Dependencies
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Navigation Links
const links = [
    // { path: "/", label: "Home" },
    { path: '/battle-ship', label: 'Battle Ship' },
    { path: "/connect4", label: "Connect4" },
    { path: "/dots", label: "Dots" },
    { path: "/hangman", label: "Hangman" },
    { path: "/memory", label: "Memory" },
    { path: "/minesweeper", label: "Minesweeper" },
    { path: "/rock-paper-scissors", label: "Rock-Paper-Scissors" },
    { path: "/simon-says", label: "Simon-Says" },
    { path: "/snake", label: "Snake" },
    { path: "/tic-tac-toe", label: "TicTacToe" },
];

// Conditionally add the Sandbox link in development mode
if (process.env.NODE_ENV === 'development') {
    links.push({ path: "/sandbox", label: "Sandbox" });
}

const NavMenu = () => {
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-2">
                    {links.map((link) => (
                        <li key={link.path}>
                            <RouterLink
                                to={link.path}
                                className="text-white hover:text-gray-400"
                            >
                                {link.label}
                            </RouterLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default NavMenu

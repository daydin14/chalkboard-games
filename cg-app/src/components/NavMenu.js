// Dependencies
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NavMenu = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/tic-tac-toe">Tic Tac Toe</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/hangman">Hangman</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/connect4">Connect 4</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/dots">Dots</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/memory">Memory</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/snake">Snake</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/minesweeper">Minesweeper</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/simon-says">Simon Says</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/checkers">Checkers</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/sandbox">Sandbox</RouterLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavMenu

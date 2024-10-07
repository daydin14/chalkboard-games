// Dependencies
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants
import Games from '../constants/Games';

const NavMenu = () => {
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-2">
                    {Games.filter(game => game.environemnt !== 'development' && game.link !== '/').map((link) => (
                        <li key={link.id}>
                            <RouterLink
                                to={link.link}
                                className="text-white hover:text-gray-400"
                            >
                                {link.title}
                            </RouterLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default NavMenu

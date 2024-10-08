// Dependencies
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants
import Games from '../constants/Games';

const NavMenu = ({ isMobile, isMenuOpen, toggleMenu }) => {
    return (
        <nav className={`bg-gray-800 p-4 ${isMobile ? 'fixed top-0 right-0 h-full transition-transform transform z-50' : 'flex space-x-2'} ${isMobile && isMenuOpen ? 'translate-x-0' : isMobile ? 'translate-x-full' : ''}`}>
            {isMobile && (
                <button className="text-white hover:text-gray-400 mb-4" onClick={toggleMenu}>
                    Close
                </button>
            )}
            <ul className={`${isMobile ? '' : 'flex space-x-2'}`}>
                {Games.filter(game => game.environemnt !== 'development' && game.link !== '/').map((link) => (
                    <li key={link.id} className={`${isMobile ? 'mt-2' : ''}`}>
                        <RouterLink
                            to={link.link}
                            className="text-white hover:text-gray-400 block"
                            onClick={isMobile ? toggleMenu : undefined}
                        >
                            {link.title}
                        </RouterLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavMenu;
// Dependencies
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Hooks
import useIsMobile from '../hooks/useIsMobile';

// Components
import NavMenu from './NavMenu';

const Header = () => {
    const isMobile = useIsMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <RouterLink to={'/'} className="text-white hover:text-gray-400">
                    <h1 className="text-3xl font-bold">Chalkboard Games</h1>
                </RouterLink>
                {isMobile ? (
                    <>
                        <button className="text-white hover:text-gray-400" onClick={toggleMenu}>
                            {isMenuOpen ? 'Close' : 'Menu'}
                        </button>
                        <NavMenu isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                    </>
                ) : (
                    <NavMenu />
                )}
            </header>
        </>
    );
};

export default Header;
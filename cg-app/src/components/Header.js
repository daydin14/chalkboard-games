// Dependencies
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

// Components
import NavMenu from './NavMenu'

const Header = () => {
    return (
        <>
            <header className="bg-gray-800 text-white p-4">
                <RouterLink to={'/'} className="text-white hover:text-gray-400">
                    <h1 className="text-3xl font-bold">Chalkboard Games</h1>
                </RouterLink>
                <NavMenu />
            </header>
        </>
    )
}

export default Header

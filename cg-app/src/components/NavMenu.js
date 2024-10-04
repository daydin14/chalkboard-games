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
                        <RouterLink to="/sandbox">Sandbox</RouterLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavMenu

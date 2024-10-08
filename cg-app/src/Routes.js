// Dependencies
import React from 'react'
import { Routes, Route } from 'react-router-dom';

// Constants
import Games from './constants/Games';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                {Games.map((page) => (
                    page.path === '/'
                        ? <Route key={page.id} exact path={page.link} element={page.component} />
                        : <Route key={page.id} path={page.link} element={page.component} />
                ))}
            </Routes>
        </>
    )
}

export default AppRoutes

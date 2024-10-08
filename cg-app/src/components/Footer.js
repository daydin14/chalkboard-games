// Dependencies
import React from 'react'

const Footer = () => {
    const author = "David Aydin";
    const title = "Chalkboard Games";
    const year = new Date().getFullYear();
    const rights = "All rights reserved";

    return (
        <>
            <footer className="bg-gray-800 text-white py-4">
                <p className="text-center">{title} &copy; {year} {rights}</p>
                <p className="text-center">Created by {author}</p>
            </footer>
        </>
    )
}

export default Footer

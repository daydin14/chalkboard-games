// Dependencies
import React from 'react'

const Footer = () => {
    const author = "Chalkboard Games";
    const year = new Date().getFullYear();
    const rights = "All rights reserved";
    const title = "David Aydin";

    return (
        <>
            <footer>
                <p>{title} &copy; {year} {rights}</p>
                <p>Created by {author}</p>
            </footer>
        </>
    )
}

export default Footer

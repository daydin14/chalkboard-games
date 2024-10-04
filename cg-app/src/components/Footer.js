// Dependencies
import React from 'react'

const Footer = () => {

    const year = new Date().getFullYear();
    const rights = "All rights reserved";
    const author = "Chalkboard Games";
    // const title = "Chalkboard Games";

    return (
        <>
            <footer>
                <p>&copy; {year} {rights}</p>
                <p>Created by {author}</p>
            </footer>
        </>
    )
}

export default Footer

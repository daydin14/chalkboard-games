// Dependencies
import React from 'react'

// Components
import GamePanel from '../components/dashboard/GamePanel'

// Constants
import Games from '../constants/Games';

const Home = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Games.filter(game => game.environemnt !== 'development' && game.link !== '/').map((game) => (
                    <GamePanel key={game.id} name={game.title} description={game.description} link={game.link} />
                ))}
            </div>
        </>
    );
};

export default Home;
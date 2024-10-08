// Dependencies
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Styles
import './assets/styles/App.css';

// Components
import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Router basename='/chalkboard-games'>
          <Header />
          <main className="flex-grow p-4">
            <Routes />
          </main>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;

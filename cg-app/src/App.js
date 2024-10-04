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
      <Router basename='/chalkboard-games'>
        <Header />
        <main>
          <Routes />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;

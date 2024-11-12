import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/add-recipe" element={<div>Add Recipe Page (Placeholder)</div>} />
          <Route path="/login" element={<div>Login Page (Placeholder)</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

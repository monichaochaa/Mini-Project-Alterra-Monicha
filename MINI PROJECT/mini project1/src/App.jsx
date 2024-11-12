import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register setUserData={setUserData} />} />
        <Route path="/login" element={<Login userData={userData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

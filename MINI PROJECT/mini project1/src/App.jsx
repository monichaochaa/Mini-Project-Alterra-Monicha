import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ListRecipe from './components/ListRecipe';
import FavRecipe from './components/FavRecipe';
import AddRecipe from './components/AddRecipe';
import Login from './components/Login';
import Register from './components/Register';


const App = () => {
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/list-recipe" element={<ListRecipe />} />
        <Route path="/fav-recipe" element={<FavRecipe recipes={recipes} />} />
        <Route path="/add-recipe" element={<AddRecipe onAddRecipe={handleAddRecipe} />} />
        <Route path="/register" element={<Register setUserData={setUserData} />} />
        <Route path="/login" element={<Login userData={userData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

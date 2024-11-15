import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ListRecipe from './components/ListRecipe';
import FavRecipe from './components/FavRecipe';
import AddRecipe from './components/AddRecipe';
import Login from './components/Login';
import Register from './components/Register';
import ChatBotAI from './components/ChatBotAI';
import DetailRecipe from './components/DetailRecipe';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Resep Sehat 1',
      image: 'https://via.placeholder.com/150',
      description: 'Detail singkat resep 1',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Resep Sehat 2',
      image: 'https://via.placeholder.com/150',
      description: 'Detail singkat resep 2',
      isFavorite: false,
    },
  ]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/list-recipe"
            element={<ListRecipe recipes={recipes} toggleFavorite={toggleFavorite} /> } 
          />
          <Route
            path="/fav-recipe"
            element={<FavRecipe recipes={recipes} />}
          />
          <Route
            path="/add-recipe"
            element={<AddRecipe onAddRecipe={handleAddRecipe} />}
          />
          <Route
            path="/detail-recipe/:id"
            element={<DetailRecipe recipes={recipes} />}
          />
          <Route path="/register" element={<Register setUserData={setUserData} />} />
          <Route path="/login" element={<Login userData={userData} />} />
          <Route path="/chatbot-ai" element={<ChatBotAI />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

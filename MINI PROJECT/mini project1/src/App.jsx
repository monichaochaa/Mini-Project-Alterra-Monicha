import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ListRecipe from "./components/ListRecipe";
import FavRecipe from "./components/FavRecipe";
import AddRecipe from "./components/AddRecipe";
import DetailRecipe from "./components/DetailRecipe";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatBotAI from "./components/ChatBotAI";
import axios from "axios";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userData, setUserData] = useState(null);

  // Ambil data dari API dan Local Storage
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products"
        );

        // Cek Local Storage untuk favorit
        const savedFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
        const updatedRecipes = response.data.map((recipe) => ({
          ...recipe,
          isFavorite: savedFavorites.some((fav) => fav.id === recipe.id),
        }));

        setRecipes(updatedRecipes);
        setFavoriteRecipes(savedFavorites);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  // Simpan favorit ke Local Storage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const toggleFavorite = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  
    setFavoriteRecipes((prevFavorites) => {
      const toggledRecipe = recipes.find((recipe) => recipe.id === id);
  
      if (toggledRecipe.isFavorite) {
        // Jika sudah favorit, hapus dari favorit
        return prevFavorites.filter((fav) => fav.id !== id);
      } else {
        // Jika belum favorit, tambahkan semua detail ke favorit
        const fullRecipe = recipes.find((recipe) => recipe.id === id);
        return [...prevFavorites, { ...fullRecipe, isFavorite: true }];
      }
    });
  };
  

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/list-recipe"
            element={<ListRecipe recipes={recipes} toggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/fav-recipe"
            element={<FavRecipe recipes={favoriteRecipes} />}
          />
          <Route path="/add-recipe" element={<AddRecipe onAddRecipe={handleAddRecipe} />} />
          <Route path="/detail-recipe/:id" element={<DetailRecipe recipes={recipes} toggleFavorite={toggleFavorite} />} />
          <Route path="/register" element={<Register setUserData={setUserData} />} />
          <Route path="/login" element={<Login userData={userData} />} />
          <Route path="/chatbot-ai" element={<ChatBotAI />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

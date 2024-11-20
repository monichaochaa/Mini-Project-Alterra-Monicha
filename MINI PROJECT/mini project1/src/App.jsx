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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userData, setUserData] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
    );
  };

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (savedUserData) {
      setUserData(savedUserData);
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleRegister = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setIsLoggedIn(true);
  };

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

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await axios.post("https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products", newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleDeleteRecipe = (id) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    setFavoriteRecipes((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
  };

  const toggleFavorite = async (id) => {
    const recipeToToggle = recipes.find((recipe) => recipe.id === id);
    const updatedRecipe = { ...recipeToToggle, isFavorite: !recipeToToggle.isFavorite };
  
    try {
      // Update status isFavorite di MockAPI
      await axios.put(`https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products/${id}`, updatedRecipe);
      
      // Update state lokal setelah berhasil memperbarui di MockAPI
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
  
      // Update state favoriteRecipes
      setFavoriteRecipes((prevFavorites) => {
        if (updatedRecipe.isFavorite) {
          return [...prevFavorites, updatedRecipe];
        } else {
          return prevFavorites.filter((fav) => fav.id !== id);
        }
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/list-recipe" element={<ListRecipe isLoggedIn={isLoggedIn} recipes={recipes} toggleFavorite={toggleFavorite} onDeleteRecipe={handleDeleteRecipe} />} />
          <Route path="/fav-recipe" element={<FavRecipe recipes={favoriteRecipes} />} />
          <Route path="/add-recipe" element={<AddRecipe onAddRecipe={handleAddRecipe} />} />
          <Route path="/detail-recipe/:id" element={<DetailRecipe recipes={recipes} onUpdateRecipe={handleUpdateRecipe} />} />
          <Route path="/register" element={<Register setUserData={setUserData} />} />
          <Route path="/chatbot-ai" element={<ChatBotAI />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

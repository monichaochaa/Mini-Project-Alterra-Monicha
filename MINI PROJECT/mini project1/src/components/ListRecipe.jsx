import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddRecipe from "./AddRecipe";
import axios from "axios";

const ListRecipe = ({ recipes, toggleFavorite, onAddRecipe, onDeleteRecipe }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products/${id}`);
      onDeleteRecipe(id);
      setDeleteMessage("Recipe deleted successfully!");
      setTimeout(() => setDeleteMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      setDeleteMessage("Failed to delete recipe.");
      setTimeout(() => setDeleteMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div>
      <button onClick={() => setShowAddForm(!showAddForm)} className="mb-4 p-2 bg-blue-500 text-white rounded">
        {showAddForm ? "Tutup Form Tambah Resep" : "Tambah Resep"}
      </button>

      {showAddForm && <AddRecipe onAddRecipe={onAddRecipe} />}

      {deleteMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md mb-4">
          {deleteMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 shadow">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="font-bold">{recipe.name}</h3>
            <p>{recipe.description}</p>
            <Link to={`/detail-recipe/${recipe.id}`} className="text-blue-500">
              Detail Resep
            </Link>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="text-xl"
            >
              {recipe.isFavorite ? "★" : "☆"}
            </button> 
            <br/>
            <button
              onClick={() => handleDelete(recipe.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRecipe;
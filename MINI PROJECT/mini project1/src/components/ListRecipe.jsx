import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddRecipe from "./AddRecipe";
import axios from "axios";

const ListRecipe = ({ recipes, toggleFavorite, onAddRecipe, onDeleteRecipe, unsavedRecipes, onDeleteUnsavedRecipe  }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products/${id}`);
      onDeleteRecipe(id);
      setNotification('Resep berhasil dihapus!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Gagal menghapus resep:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowAddForm(! showAddForm)} className="mb-4 p-2 bg-blue-500 text-white rounded">
        {showAddForm ? "Tutup Form Tambah Resep" : "Tambah Resep"}
      </button>

      {showAddForm && <AddRecipe onAddRecipe={onAddRecipe} />}

      {notification && (
        <div className="bg-green-500 text-white p-4 rounded-md mb-4">
          {notification}
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
            <h3>{recipe.name}</h3>
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
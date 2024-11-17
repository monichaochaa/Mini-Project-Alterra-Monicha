import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddRecipe from "./AddRecipe";

const ListRecipe = ({ recipes, toggleFavorite, onAddRecipe, onDeleteRecipe }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        {showAddForm ? 'Tutup Form Tambah Resep' : 'Tambah Resep'}
      </button>

      {showAddForm && <AddRecipe onAddRecipe={onAddRecipe} />}

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
            <div className="flex items-center mt-2">
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="text-xl mr-2"
              >
                {recipe.isFavorite ? "★" : "☆"} {/* Ikon favorit */}
              </button>
              <button
                onClick={() => onDeleteRecipe(recipe.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRecipe;

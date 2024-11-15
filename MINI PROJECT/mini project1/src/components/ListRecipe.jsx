import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListRecipe = () => {
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

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List Recipe</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-lg shadow-lg p-4 bg-white"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{recipe.name}</h2>
            <p className="text-gray-600 mb-2">{recipe.description}</p>
            <Link
              to={`/recipe/${recipe.id}`}
              className="text-blue-500 hover:underline"
            >
              Detail Resep
            </Link>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`ml-4 ${
                recipe.isFavorite ? 'text-yellow-500' : 'text-gray-400'
              }`}
              aria-label="Favorite"
            >
              ★
            </button>
          </div>
        ))}
      </div>
      <Link
        to="/add-recipe"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 inline-block"
      >
        Add Recipe
      </Link>
    </div>
  );
};

export default ListRecipe;

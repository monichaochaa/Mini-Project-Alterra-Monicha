import React from "react";
import { Link } from "react-router-dom";

const ListRecipe = ({ recipes, toggleFavorite }) => {
  if (!recipes || recipes.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 shadow">
          <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <Link to={`/detail-recipe/${recipe.id}`} className="text-blue-500">
            Detail Resep
          </Link>
          <button onClick={() => toggleFavorite(recipe.id)} className="text-xl">
          {recipe.isFavorite ? "★" : "☆"}
          </button>

        </div>
      ))}
    </div>
  );
};

export default ListRecipe;

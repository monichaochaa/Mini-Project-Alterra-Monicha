import React from "react";
import { useParams } from "react-router-dom";

const DetailRecipe = ({ recipes, toggleFavorite }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="w-96 h-64 object-cover mb-4" />
      <button
        onClick={() => toggleFavorite(recipe.id)} // Panggil toggleFavorite dari halaman detail
        className="text-2xl mb-4"
      >
        {recipe.isFavorite ? "★" : "☆"} {/* Ubah ikon sesuai status favorit */}
      </button>
      <div>
        <h2 className="text-xl font-semibold">Alat dan Bahan:</h2>
        <ul className="list-disc ml-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Langkah-Langkah:</h2>
        <ol className="list-decimal ml-6">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default DetailRecipe;

import React from "react";

const FavRecipe = ({ recipes }) => {
  // Filter resep yang disukai berdasarkan `isFavorite`
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  if (favoriteRecipes.length === 0) {
    return <div>No favorite recipes yet.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 shadow">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <div>
            <h4 className="font-semibold">Ingredients:</h4>
            <ul className="list-disc ml-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Steps:</h4>
            <ol className="list-decimal ml-4">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavRecipe;

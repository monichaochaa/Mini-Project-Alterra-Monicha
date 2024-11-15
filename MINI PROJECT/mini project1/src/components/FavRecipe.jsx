import React from 'react';

const FavRecipe = ({ recipes }) => {
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Recipes</h1>
      {favoriteRecipes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="border rounded-lg shadow-lg p-4 bg-white">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold">{recipe.name}</h2>
              <p className="text-gray-600 mb-2">{recipe.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Belum ada resep favorit. Tambahkan dari daftar resep!</p>
      )}
    </div>
  );
};

export default FavRecipe;

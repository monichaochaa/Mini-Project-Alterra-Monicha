import React, { useEffect } from "react";
import axios from "axios";

const FavRecipe = ({ recipes, setRecipes }) => {

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products");
        setRecipes(response.data); // Set data ke state recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, [setRecipes]);

   // Filter resep yang disukai berdasarkan `isFavorite
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  const toggleFavorite = async (recipe) => {
    const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };

    try {
      // Update status isFavorite di MockAPI
      await axios.put(`https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products/${recipe.id}`, updatedRecipe);
      
      // Update state lokal setelah berhasil memperbarui di MockAPI
      setRecipes((prevRecipes) =>
        prevRecipes.map((r) => (r.id === recipe.id ? updatedRecipe : r))
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  // Jika tidak ada resep favorit
  if (favoriteRecipes.length === 0) {
    return <div>No favorite recipes yet.</div>;
  }

  // Render daftar resep favorit
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
          {/* Tombol untuk menandai sebagai favorit */}
          <button onClick={() => toggleFavorite(recipe)} className="text-yellow-500">
            {recipe.isFavorite ? "★ Favorited" : "☆ Favorite"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavRecipe;

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DetailRecipe = ({ recipes, toggleFavorite, isFavPage, onDeleteRecipe, onUpdateRecipe }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(recipe.name);
  const [image, setImage] = useState(recipe.image);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [steps, setSteps] = useState(recipe.steps);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...recipe,
      name,
      image,
      ingredients,
      steps,
    };
    
  try {
    const response = await axios.put(
      `https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products/${recipe.id}`,
      updatedRecipe
    );
    
    onUpdateRecipe(response.data);
    setIsEditing(false);
  } catch (error) {
    console.error('Gagal memperbarui resep:', error);
  }
};

  return (
    <div className="p-4">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4">Edit Resep</h1>
          <div className="mb-4">
            <label className="block mb-2">Nama Resep:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">URL Gambar:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bahan:</label>
            {ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                value={ingredient}
                onChange={(e) => {
                  const updatedIngredients = [...ingredients];
                  updatedIngredients[index] = e.target.value;
                  setIngredients(updatedIngredients);
                }}
                className="border rounded w-full p-2 mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={() => setIngredients([...ingredients, ""])}
              className="text-blue-500 hover:underline"
            >
              Tambah Bahan
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Langkah-Langkah:</label>
            {steps.map((step, index) => (
              <input
                key={index}
                type="text"
                value={step}
                onChange={(e) => {
                  const updatedSteps = [...steps];
                  updatedSteps[index] = e.target.value;
                  setSteps(updatedSteps);
                }}
                className="border rounded w-full p-2 mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={() => setSteps([...steps, ""])}
              className="text-blue-500 hover:underline"
            >
              Tambah Langkah
            </button>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Simpan Perubahan
          </button>
          <button type="button" onClick={handleEditToggle} className="ml-2 text-red-500 hover:underline">
            Batal
          </button>
        </form>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
          <img src={recipe.image} alt={recipe.name} className="w -full h-auto mb-4" />
          <h2 className="text-xl font-semibold">Bahan:</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold">Langkah-Langkah:</h2>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <button onClick={handleEditToggle} className="bg-blue-500 text-white p-2 rounded mt-4">
            Edit Resep
          </button>
        </>
      )}
    </div>
  );
};

export default DetailRecipe;
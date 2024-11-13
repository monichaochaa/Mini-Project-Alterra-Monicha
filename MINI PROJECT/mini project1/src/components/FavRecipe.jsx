import React from 'react';
import { Link } from 'react-router-dom';

const FavRecipe = ({ recipes }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff9c4' }}>
      <h2>Favorit Resep</h2>
      <Link to="/add-recipe">
        <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Add Recipe
        </button>
      </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {recipes.map((recipe, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '200px', backgroundColor: '#ffe082' }}>
            <h3>{recipe.namaResep}</h3>
            <p><strong>Alat & Bahan:</strong> {recipe.alatBahan}</p>
            <p><strong>Langkah Masak:</strong> {recipe.langkahMasak}</p>
            {recipe.gambar && <img src={recipe.gambar} alt={recipe.namaResep} style={{ width: '100%', borderRadius: '5px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavRecipe;

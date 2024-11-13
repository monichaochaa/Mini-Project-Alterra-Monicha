import React, { useState } from 'react';

const AddRecipe = ({ onAddRecipe }) => {
  const [recipe, setRecipe] = useState({
    namaResep: '',
    alatBahan: '',
    langkahMasak: '',
    gambar: ''
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecipe(recipe); // Kirim data ke FavRecipe
    setRecipe({ namaResep: '', alatBahan: '', langkahMasak: '', gambar: '' }); // Reset form
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#b3e5fc' }}>
      <h2>Add Resep Baru</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Resep:</label>
          <input type="text" name="namaResep" value={recipe.namaResep} onChange={handleChange} />
        </div>
        <div>
          <label>Alat & Bahan:</label>
          <input type="text" name="alatBahan" value={recipe.alatBahan} onChange={handleChange} />
        </div>
        <div>
          <label>Langkah-langkah Masak:</label>
          <input type="text" name="langkahMasak" value={recipe.langkahMasak} onChange={handleChange} />
        </div>
        <div>
          <label>Gambar (URL):</label>
          <input type="text" name="gambar" value={recipe.gambar} onChange={handleChange} />
        </div>
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
};

export default AddRecipe;

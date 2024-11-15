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
    <div className="bg-green-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Tambah Resep Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-green-700">Nama Resep:</label>
          <input
            type="text"
            name="namaResep"
            value={recipe.namaResep}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-green-700">Alat & Bahan:</label>
          <input
            type="text"
            name="alatBahan"
            value={recipe.alatBahan}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-green-700">Langkah-langkah Masak:</label>
          <input
            type="text"
            name="langkahMasak"
            value={recipe.langkahMasak}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-green-700">Gambar (URL):</label>
          <input
            type="text"
            name="gambar"
            value={recipe.gambar}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Tambah Resep
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;

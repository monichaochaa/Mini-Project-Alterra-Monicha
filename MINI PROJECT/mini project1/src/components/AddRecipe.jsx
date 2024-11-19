import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = ({ onAddRecipe }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Nama resep dan deskripsi harus diisi.');
      return;
    }

    const isValidImageUrl = (url) => {
      const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;
      return pattern.test(url);
    };

    if (!isValidImageUrl(image)) {
      alert('URL gambar tidak valid. Harap masukkan URL gambar yang valid.');
      return;
    }

    const newRecipe = {
      name,
      description,
      ingredients: ingredients.split(',').map((item) => item.trim()),
      steps: steps.split('.').map((step) => step.trim()),
      image,
      isFavorite: false,
    };

    try {
      // Simpan data ke MockAPI
      const response = await axios.post(
        'https://6718b2887fc4c5ff8f4a9fa3.mockapi.io/products',
        newRecipe
      );
      
      // Pastikan onAddRecipe didefinisikan dan merupakan fungsi
      if (typeof onAddRecipe === 'function') {
        onAddRecipe(response.data); // Memperbarui data lokal dengan resep baru
      } else {
        console.error('onAddRecipe is not a function or is undefined');
      }

      alert('Recipe berhasil ditambahkan!');  
      
    } catch (error) {
      console.error('Gagal menambahkan resep ke MockAPI:', error);
    }
    
    // Reset form
    setName('');
    setDescription('');
    setIngredients('');
    setSteps('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-green-50 border border-green-200 rounded shadow-md">
      <h2 className="text-lg font-bold text-green-700 mb-4">Tambah Resep Baru</h2>

      <div className="mb-4">
        <label className="block text-green-800">Nama Resep:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring focus:ring-green-200"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-green-800">Deskripsi:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring focus:ring-green-200"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-green-800">Bahan (pisahkan dengan koma):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring focus:ring-green-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-green-800">Langkah-langkah (pisahkan dengan titik):</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring focus:ring-green-200"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-green-800">URL Gambar:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring focus:ring-green-200"
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
      >
        Tambahkan Resep
      </button>
    </form>
  );
};

export default AddRecipe;

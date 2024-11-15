import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DetailRecipe = ({ recipes, onSave, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  const [editableRecipe, setEditableRecipe] = useState(recipe || {});

  useEffect(() => {
    if (!recipe) {
      navigate('/list-recipe'); // Navigasi jika resep tidak ditemukan
    }
  }, [recipe, navigate]);

  const handleChange = (e) => {
    setEditableRecipe({ ...editableRecipe, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editableRecipe);
    navigate('/list-recipe');
  };

  const handleDelete = () => {
    onDelete(recipe.id);
    navigate('/list-recipe');
  };

  return recipe ? (
    <div>
      <h2>Detail Resep: {recipe.name}</h2>
      <label>Nama Resep:</label>
      <input
        type="text"
        name="name"
        value={editableRecipe.name || ''}
        onChange={handleChange}
        className="border p-1 mb-2"
      />
      <label>Deskripsi:</label>
      <textarea
        name="description"
        value={editableRecipe.description || ''}
        onChange={handleChange}
        className="border p-1 mb-2"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2">
        Simpan
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 ml-2">
        Hapus
      </button>
    </div>
  ) : (
    <p>Resep tidak ditemukan.</p>
  );
};

export default DetailRecipe;

import React from 'react';

const LandingPage = () => {
  const recipes = [
    { id: 1, title: 'Vegan Pancakes', category: 'Vegan', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Low Waste Salad', category: 'Low Waste', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Organic Stir Fry', category: 'Organic', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to EcoRecipe</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded hover:shadow-lg transition-shadow">
            <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover mb-2 rounded" />
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-500 p-4 text-white flex justify-between">
      <div className="font-bold text-xl">EcoRecipe</div>
      <div>
        <Link to="/" className="mx-2 hover:text-gray-200">Home</Link>
        <Link to="/list-recipe" className="mx-2 hover:text-gray-200">List Recipe</Link>
        <Link to="/fav-recipe" className="mx-2 hover:text-gray-200">Fav Recipe</Link>
        <Link to="/login" className="mx-2 hover:text-gray-200">Login</Link>
      </div>
    </nav>
  );
};

export default  Navbar;

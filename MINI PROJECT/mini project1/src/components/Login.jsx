import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLogin = () => {
    // Set login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ambil data pengguna yang sudah terdaftar dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Validasi login
    if (user && user.email === email && user.password === password) {
      alert("Login berhasil!");
      onLogin();
      navigate('/');
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-500">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Form Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Masukan email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Masukan password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <a href="#" className="text-sm text-teal-600 hover:underline block text-right mb-4">
          Lupa password?
        </a>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-200"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Belum punya akun?{' '}
          <Link to="/register" className="text-teal-600 hover:underline">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

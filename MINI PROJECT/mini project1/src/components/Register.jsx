import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUserData }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validasi password
      if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }
      
      // Simpan data pengguna ke state dan localStorage
      setUserData({ email, password });
      localStorage.setItem('user', JSON.stringify({ email, password }));
  
      // Setelah register, navigasi ke halaman login
      navigate('/login');
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-500">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-4 text-center">Form Registrasi</h2>
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
          <div className="mb-4">
            <input
              type="password"
              placeholder="Masukan ulang password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-200"
          >
            Daftar
          </button>
        </form>
      </div>
    );
  };
  
  export default Register;
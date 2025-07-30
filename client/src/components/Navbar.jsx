// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext}  from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MERN Blog</Link>
        
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          
          {currentUser ? (
            <>
              <Link to="/create" className="hover:text-gray-300">Create Post</Link>
              <button 
                onClick={logout}
                className="hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
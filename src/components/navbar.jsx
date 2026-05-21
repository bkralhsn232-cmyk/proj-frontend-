import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token'); 

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span>MOVIE</span>APP
      </Link>

      <div className="navbar-links">
        <Link to="/">Home 🏠</Link>
        <Link to="/about">About ℹ️</Link>
        
        {isLoggedIn ? (
          <>
            <Link to="/add-movie">Add Movie 🎬</Link>
            <button onClick={handleLogout} className="logout-btn">
              Log Out 🚪
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register 📝</Link>
            <Link to="/login">Login 🔐</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
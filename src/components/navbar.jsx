import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    backgroundColor: 'var(--bg)', // <--- ADD THIS
    borderBottom: '1px solid var(--border)' // <--- AND THIS
  };

  const linkStyle = {
    color: 'var(--text)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: '0.3s',
    marginLeft: '20px'
  };

  const logoStyle = {
    fontSize: '22px', 
    fontWeight: 'bold', 
    color: 'var(--accent)', 
    letterSpacing: '1px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        <span style={{ color: 'var(--text-h)', marginLeft: '5px' }}>MOVIE</span>APP
      </Link>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home 🏠</Link>
        <Link to="/about" style={linkStyle}>About ℹ️</Link>
        <Link to="/register" style={linkStyle}>Register 📝</Link>
        <Link to="/login" style={linkStyle}>Login 🔐</Link>
      </div>
    </nav>
  );
}

export default Navbar;
```javascript
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navStyle = {
    display: 'flex',
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px'
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
        <Link to="/" style={linkStyle}>الصفحة الرئيسية 🏠</Link>
        <Link to="/about" style={linkStyle}>معلومات ℹ️</Link>
        <Link to="/register" style={linkStyle}>إنشاء حساب 📝</Link>
        <Link to="/login" style={linkStyle}>تسجيل الدخول 🔐</Link>
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            background: 'var(--code-bg)',
            border: '1px solid var(--border)',
            color: 'var(--text-h)',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            fontWeight: '500',
            marginLeft: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

```
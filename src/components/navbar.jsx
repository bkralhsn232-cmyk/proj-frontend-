import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#1a202c',
    color: '#fff',
    fontFamily: 'sans-serif'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
        🎬 MovieBase
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        
        {user ? (
          <>
             <Link to="/add-Movie" style={{ color: '#fff', textDecoration: 'none' }}>
          ➕ Add Movie
        </Link>

            <span style={{ color: '#cbd5e0' }}>Welcome, <strong>{user.username}</strong></span>
            <button 
              onClick={logout} 
              style={{ background: '#e53e3e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('isLoggedIn', 'true'); 
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (userData) {
      localStorage.setItem('role', userData.role || 'user');
      localStorage.setItem('username', userData.username || 'Anonymous');
      localStorage.setItem('userId', userData._id || userData.id || '');
    }
    
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
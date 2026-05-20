import { createContext, useState, useEffect } from 'react';

// Create the context hub
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is already logged in when the app first loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login handler helper
  const login = (userData, token) => {
    localStorage.setItem('isLoggedIn', 'true'); // 🚀 Syncs with ProtectedRoute
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout handler helper
  const logout = () => {
    localStorage.removeItem('isLoggedIn'); // 🚀 Clears out the route guard flag
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
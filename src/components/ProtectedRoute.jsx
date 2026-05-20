import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import API from '../api/axios';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    API.get('/api/auth/me')
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>🎬 Checking authorization...</h2>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // 🚀 Checks both the boolean login flag AND verifies that a token exists in local memory
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('token');

  // If the user isn't authenticated at all, instantly boot them to the login screen
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If they are verified, seamlessly unlock and render the nested child pages (Catalog, Add Movie, etc.)
  return <Outlet />;
}
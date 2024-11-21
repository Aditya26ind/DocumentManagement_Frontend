import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log("protected route:", { isAuthenticated, loading });

  if (loading) {
    // Show a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to /auth');
    return <Navigate to="/auth" />;
  }

  return children; 
};

export default ProtectedRoute;
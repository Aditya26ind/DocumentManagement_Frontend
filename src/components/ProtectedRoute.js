import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth'; // Replace with your actual path to useAuth

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to /auth');
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
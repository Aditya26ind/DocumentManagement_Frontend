import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = async () => {
    try {
      // Remove the token
      Cookies.remove('access_token');

      // Redirect to the login page
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 16px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
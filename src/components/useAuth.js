import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/auth/check-auth', {
        withCredentials: true,
      });
      console.log('Authorization Response:', response.data);

      if (response.data && response.data.authenticated) {
        setIsAuthenticated(true);
      } 
    } catch (err) {
      console.error('Authorization Error:', err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Automatically check authentication when component mounts
  }, []);

  return { isAuthenticated, checkAuth };
};

export default useAuth;
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/check-auth`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      });

      console.log('Authorization Response:', response.data);

      if (response.data && response.data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Authorization Error:', err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuth(); 
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
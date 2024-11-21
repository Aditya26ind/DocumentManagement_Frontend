import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const authenticated = await axios.post(
          `${API_BASE_URL}/auth/login`,
          { username, password },
          { withCredentials: true } // Include credentials for cookies
        );

        console.log('Login response:', authenticated);

        if (authenticated.data.detail) {
          setMessage('Login unsuccessful!');
        } else {
          Cookies.set('access_token', authenticated.data.access_token, { expires: 7, secure: true, sameSite: 'Lax' });
          setMessage('Login successful!');
          navigate('/search');
        }
      } else {
        await axios.post(
          `${API_BASE_URL}/auth/register`,
          { username, password },
          { withCredentials: true } // Include credentials for cookies
        );
        setMessage('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.detail || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 font-medium text-white rounded-l-md ${
              isLogin ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 font-medium text-white rounded-r-md ${
              !isLogin ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 font-medium text-white rounded-md ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

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
          setMessage('Login successful!');
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
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setIsLogin(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: isLogin ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            marginRight: '8px',
          }}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          style={{
            padding: '8px 16px',
            backgroundColor: !isLogin ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
          }}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }} disabled={isLoading}>
          {isLoading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthForm;
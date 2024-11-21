import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from '../components/Logout';
import Cookies from 'js-cookie';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/me', {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details.');
      }
    };

    fetchUser();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <Logout/>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
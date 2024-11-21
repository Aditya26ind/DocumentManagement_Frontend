import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logout from '../components/Logout';
import Cookies from 'js-cookie';

const DocumentDetails = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState('');
  const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/documents/${id}`,{
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        });
        setDocument(response.data);
      } catch (err) {
        setError('Failed to fetch document details.');
      }
    };

    fetchDocument();
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 font-medium text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <Logout />
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Document Details
        </h1>
        {document ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-800">Title:</strong>{' '}
              {document.title}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-800">Content:</strong>{' '}
              {document.content}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DocumentDetails;
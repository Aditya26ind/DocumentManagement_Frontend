import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentDetails = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/documents/${id}`);
        setDocument(response.data);
      } catch (err) {
        setError('Failed to fetch document details.');
      }
    };

    fetchDocument();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Document Details</h1>
      {document ? (
        <div>
          <p><strong>Title:</strong> {document.title}</p>
          <p><strong>Content:</strong> {document.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DocumentDetails;
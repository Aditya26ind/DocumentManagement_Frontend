import React from 'react';
import DocumentUpload from '../components/DocumentUpload';
import QueryForm from '../components/QueryForm';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Document Management System</h1>
      <DocumentUpload />
      <QueryForm />
      <div style={{ marginTop: '20px' }}>
        <Link to="/search" style={{ textDecoration: 'none', color: 'blue' }}>
          Go to Search Page
        </Link>
      </div>
    </div>
  );
};

export default Home;
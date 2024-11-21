import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AuthForm from './pages/AuthForm';
import Search from './pages/Search';
import ProtectedRoute from './components/ProtectedRoute';
import DocumentDetails from './pages/DocumentDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/" element={<Home /> }/>
        <Route path="/search" element={<Search />} />
        <Route path="/documents/:id" element={<DocumentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
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
        <Route path="/" element={<ProtectedRoute><Home /> </ProtectedRoute>}/>
        <Route path="/search" element={<ProtectedRoute><Search /> </ProtectedRoute>}/>
        <Route path="/documents/:id" element={<ProtectedRoute><DocumentDetails /> </ProtectedRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
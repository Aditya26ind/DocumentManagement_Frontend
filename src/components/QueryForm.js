import React, { useState } from 'react';
import { queryDocuments } from '../api';

const QueryForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setAnswer(''); // Clear previous answers

    if (!question) {
      setError('Please enter a question.');
      return;
    }

    try {
      const response = await queryDocuments(question);
      setAnswer(response.answer || 'No answer found.');
    } catch (error) {
      setError('Failed to fetch answer. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {answer && <p style={{ color: 'green' }}>Answer: {answer}</p>}
    </div>
  );
};

export default QueryForm;
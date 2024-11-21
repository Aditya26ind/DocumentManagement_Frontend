import React, { useState } from 'react';
import { searchDocuments } from '../api';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const handleSearch = async (e, newPage = 1) => {
    e.preventDefault();
    setError('');
    setResults([]);

    if (!query) {
      setError('Please enter a search query.');
      return;
    }

    try {
      const response = await searchDocuments(query);
      setResults(response.results || []);
      setTotalPages(Math.ceil(response.total / pageSize));
      setPage(newPage);
    } catch (error) {
      setError('Failed to fetch search results. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Search Documents</h2>
      <form onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
      </form>
    
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index} style={{ margin: '16px 0', listStyle: 'none', border: '1px solid #ccc', padding: '8px', borderRadius: '8px' }}>
            <h4>{result._source.title}</h4>
            <p>{result._source.content}</p>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div>
          <button
            disabled={page <= 1}
            onClick={(e) => handleSearch(e, page - 1)}
            style={{ padding: '8px 16px', marginRight: '8px' }}
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            onClick={(e) => handleSearch(e, page + 1)}
            style={{ padding: '8px 16px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
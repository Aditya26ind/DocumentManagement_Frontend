import React from 'react';
import SearchResults from '../components/SearchResults';
import Logout from '../components/Logout';

const Search = () => {
  return (
    <div>
      <Logout/>
      <h1>Search Documents</h1>
      <SearchResults />
    </div>
  );
};

export default Search;
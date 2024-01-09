// YourMainComponent.js

import React, { useState } from 'react';
import SearchBarFunctionality from './SearchBarFunctionality'

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [allResults] = useState([
    { id: 1, name: 'Result 1' },
    { id: 2, name: 'Result 2' },
    { id: 3, name: 'Result 3' },
    { id: 4, name: 'Another Result' },
    // Add more results as needed
  ]);

  const handleSearch = (query) => {
    // Simulate searching by filtering results based on the query
    const filteredResults = allResults.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase())
    );

    // Update searchResults state with the filtered results
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <SearchBarFunctionality onSearch={handleSearch} />
      <div>
        {/* Display search results */}
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          searchResults.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;

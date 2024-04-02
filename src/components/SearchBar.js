import React, { useState } from 'react';

const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearchChange(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search by product name or category..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};
export default SearchBar;

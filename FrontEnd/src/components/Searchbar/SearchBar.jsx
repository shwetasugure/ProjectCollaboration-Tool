import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={handleChange}
      className="search-bar"
    />
  );
};

export default SearchBar;

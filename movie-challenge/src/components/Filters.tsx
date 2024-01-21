import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ onFilterChange, selectedFilter }) => {
  const [sortByValue, setSortByValue] = useState('popularity.desc');

  const handleFilterChange = () => {
    onFilterChange({ ...selectedFilter, sortBy: sortByValue });
  };

  const handleSortByChange = () => {
    const newSortBy =
      sortByValue === 'vote_average.desc' ? 'vote_average.asc' : 'vote_average.desc';
    setSortByValue(newSortBy);
    onFilterChange({ ...selectedFilter, sortBy: newSortBy });
  };

  const handleClearFilters = () => {
    onFilterChange({ filterBy: '', orderBy: '', sortBy: 'popularity.desc' });
    setSortByValue('popularity.desc');
  };

  const handlePopularityChange = () => {
    const newSortBy =
      sortByValue === 'popularity.desc' ? 'popularity.asc' : 'popularity.desc';
    setSortByValue(newSortBy);
    onFilterChange({ ...selectedFilter, sortBy: newSortBy });
  };

  return (
    <section className='filters-container'>
      <button className="filter-button" onClick={handlePopularityChange}>
        Sort by Popularity
      </button>
      <button className="filter-button" onClick={handleSortByChange}>
        Sort by Rating
      </button>
      <button className="filter-button" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </section>
  );
};

export default Filters;

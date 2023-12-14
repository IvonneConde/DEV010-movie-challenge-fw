import React from 'react';
import './Filters.css';

const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    onFilterChange(selectedFilter);
  };

  return (
    <section className='filters-container'>
      <div className='filter-box'>
        <select id='popularitySelect' onChange={handleFilterChange}>
          <option value='popularity.desc'>Popularity - Desc</option>
          <option value='popularity.asc'>Popularity - Asc</option>
        </select>
      </div>

      <div className='filter-box'>
        <select id='ratingSelect' onChange={handleFilterChange}>
          <option value='vote_average.desc'>Rating - Desc</option>
          <option value='vote_average.asc'>Rating - Asc</option>
        </select>
      </div>

      <div className='filter-box'>
        <select id='releaseDateSelect' onChange={handleFilterChange}>
          <option value='release_date.desc'>Release date - Desc</option>
          <option value='release_date.asc'>Release Date - Asc</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;

import PropTypes from 'prop-types';
import { useState } from 'react';
import './Filters.css';

interface FiltersProps {
  onFilterChange: (newFilter: { sortBy: string, orderBy: string }) => void;
  selectedFilter: {
    sortBy: string;
    orderBy: string;
  };
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, selectedFilter }) => {
  const [sortByValue, setSortByValue] = useState('popularity.desc');

  // const handleFilterChange = () => {
  //   onFilterChange({ ...selectedFilter, sortBy: sortByValue });
  // };

  const handleSortByChange = () => {
    const newSortBy =
      sortByValue === 'vote_average.desc' ? 'vote_average.asc' : 'vote_average.desc';
    setSortByValue(newSortBy);
    onFilterChange({ ...selectedFilter, sortBy: newSortBy });
  };

  const handleClearFilters = () => {
    onFilterChange({ sortBy: 'popularity.desc', orderBy: '' });
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

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  selectedFilter: PropTypes.shape({
    sortBy: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }).isRequired,
};

export default Filters;

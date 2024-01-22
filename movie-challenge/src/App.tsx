import { useState, useEffect, useCallback } from 'react';  // Agregamos useCallback
import axios from 'axios';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import Pagination from './components/Pagination';
import Filters from './components/Filters';
import './App.css';

interface Movie {
  title: string;
  overview: string;
  posterUrl: string | null;
  poster_path: string | null;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState({
    sortBy: 'popularity',
    orderBy: 'desc',
  });

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = 'fb29ad88915a994643a2e17f230ac6f2';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  const fetchMovies = useCallback(async (searchKey: string, page: number = 1) => {
    const type = searchKey ? 'search' : 'discover';
    try {
      const response = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: page,
          include_adult: false,
          include_video: false,
          language: 'en-US',
          sort_by: `${selectedFilter.sortBy}.${selectedFilter.orderBy}`,
          with_companies: '41077',
        },
      });

      const moviesData = response.data.results.map((movie: Movie) => {
        const posterUrl = movie.poster_path
          ? `${URL_IMAGE}${movie.poster_path}`
          : null;

        return {
          ...movie,
          posterUrl: posterUrl,
        };
      });

      setMovies(moviesData);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [selectedFilter]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
    fetchMovies(searchKey, selectedPage.selected + 1);
  };

  const handleFilterChange = (newFilter: { sortBy: string }) => {
    if (newFilter && newFilter.sortBy) {
      const [sortBy, orderBy] = newFilter.sortBy.split('.');
      setSelectedFilter({ sortBy, orderBy });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMovies(searchKey, currentPage);
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, [searchKey, currentPage, fetchMovies]); 

  useEffect(() => {
    console.log('Movies after filters', movies);
  }, [movies]);

  return (
    <Router>
      <Header onSearch={setSearchKey} />
      <Routes>
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route
          path="/"
          element={
            <>
              <Filters
                onFilterChange={handleFilterChange}
                selectedFilter={selectedFilter}
              />
              <MovieGrid movies={movies} urlImage={URL_IMAGE} />
              <Pagination
                pageCount={5}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                key={currentPage}
              />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import Filters from './components/Filters';
// import ErrorBoundary from './ErrorBoundary';
import './App.css';
import Pagination from './components/Pagination';

function App() {
  //estados hook useState
  const [movies, setMovies] = useState([]); //Estado para la lista de peliculas
  const [searchKey, setSearchKey] = useState(''); //Estado para la busqueda
  const [currentPage, setCurrentPage] = useState(1); //Estado para la página actual
  const [totalPages, setTotalPages] = useState(0); //Esrado para el número de páginas
  const [selectedFilter, setSelectedFilter] = useState({  //Estado para filtros
    filterBy: 'popularity',
    orderBy: 'desc',
  });

  const API_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = 'fb29ad88915a994643a2e17f230ac6f2';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  const fetchMovies = async (searchKey, page = 1) => {
    const type = searchKey ? 'search' : 'discover';
    try {
      const response = await axios.get(`${API_URL}/${type}/movie`, {  //Solicitud a la API
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: page,
          include_adult: false,
          include_video: false,
          language: 'en-US',
          sort_by: `${selectedFilter.filterBy}.${selectedFilter.orderBy}`,
          with_companies: '41077'
        },
      });

      const moviesData = response.data.results.map(movie => {
        const posterUrl = movie.poster_path ? `${URL_IMAGE}${movie.poster_path}`: null;

        return {
          ...movie, 
          posterUrl: posterUrl,
        };
      });

      //Actualizamos el estado de las peliculas y el total de las páginas según la API
      setMovies(moviesData);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error); // manejamos los errores en caso de que falle la solicitud
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    fetchMovies(searchKey, selectedPage.selected + 1); // Agrega el parámetro de la página
  };
  

  const handleFilterChange = (newFilter) => {
    if (newFilter && newFilter.sortBy) {
      const [filterBy, orderBy] = newFilter.sortBy.split('.');
      setSelectedFilter({ filterBy, orderBy });
    }
  };
  

  useEffect(() => {  //se ejecuta cuando  cambia la palabra clave de búsqueda o filtros
    const fetchData = async () => {
    try {
      await fetchMovies(searchKey, currentPage);  //llamamos a la función para obtener las pelis según el filtro y la palabra clave
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  };
  
  fetchData ();

}, [searchKey, selectedFilter, currentPage]);

  useEffect(() => {
    console.log('Movies after filters', movies);
  }, [movies]);

  return (
    <Router>
      {/* <ErrorBoundary> */}
        <Header onSearch={setSearchKey} />
        <Routes>
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route
            path="/"
            element={
              <>
                <Filters onFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
                <MovieGrid movies={movies} urlImage={URL_IMAGE} />
                <Pagination
                  pageCount={5}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageChange}
                />
              </>
            }
          />
        </Routes>
      {/* </ErrorBoundary> */}
    </Router>
  );
}

export default App;

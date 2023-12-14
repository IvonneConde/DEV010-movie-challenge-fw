import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import Filters from './components/Filters';
import './App.css';

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
        },
      });

      //Actualizamos el estado de las peliculas y el total de las páginas según la API
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error); // manejamos los errores en caso de que falle la solicitud
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected +1);
    fetchMovies(searchKey, selectedPage.selected + 1);
  };

  const handleFilterChange = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
  };
  // const handleSearch = (key) => {
  //   setSearchKey(key);
  //   fetchMovies(key);
  // };

  useEffect(() => {  //se ejecuta cuando  cambia la palabra clave de búsqueda o filtros
    fetchMovies(searchKey);  //llamamos a la función para obtener las pelis según el filtro y la palabra clave
    console.log('Movies after filters', movies)
  }, [searchKey, selectedFilter]);

  return (
    <>
      <Header onSearch={setSearchKey} />
      <Filters onFilterChange={handleFilterChange} />
      <MovieGrid movies={movies} urlImage={URL_IMAGE} />
      <ReactPaginate
      pageCount={5}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={handlePageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
      breakLabel='...'
      nextLabel='>'
      // onPageChange={onPageChange}
      previousLabel='<'
      renderOnZeroPageCount={null}
      pageLinkClassName="page-num"
      previousLinkClassName="page-num"
      nextLinkClassName="page-num"
      />
    </>
  );
}

export default App;

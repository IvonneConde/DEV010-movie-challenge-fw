import './MovieGrid.css';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, urlImage }) => (
  <div className='grid-container'>
    {movies.map((movie) => (  //mapeo sobre el array de pelis para renderizar cada card
      <MovieCard key={movie.id} movie={movie} urlImage={urlImage} />  //renderizamos
    ))}
  </div>
);

export default MovieGrid;


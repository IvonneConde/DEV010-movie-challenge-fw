import './MovieGrid.css';
import MovieCard from './MovieCard';
import { Movie } from '../App'

interface MovieGridProps {
  movies: Movie[];
  urlImage: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, urlImage }) => {
  // Filtrar las películas que tienen póster
  const moviesWithPoster = movies.filter((movie) => movie.poster_path);

  return (
    <div className='grid-container'>
      {moviesWithPoster.map((movie) => (
        <MovieCard key={movie.id} movie={movie} urlImage={urlImage} />
      ))}
    </div>
  );
};

export default MovieGrid;

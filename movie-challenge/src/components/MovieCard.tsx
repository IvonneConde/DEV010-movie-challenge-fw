import './MovieCard.css';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MovieCard: React.FC<{ movie: Movie; urlImage: string }> = ({ movie, urlImage }) => (
  <div className='grid-item'>
    <Link to={`/movies/${movie.id}`}>
    <img 
    src={`${urlImage + movie.poster_path}`} 
    alt={movie.title} 
    height={600} 
    width="100%"
    style={{ objectFit: 'cover' }}
    onError={() => { //manejo de errores para pelis que no tienenn poster
    }} 
    />
    <h4 className='text-center'>{movie.title}</h4>
    </Link>
  </div>
);

export default MovieCard;


import './MovieCard.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, urlImage }) => (
  <div className='grid-item'>
    <Link to={`/movies/${movie.id}`}>
    <img 
    src={`${urlImage + movie.poster_path}`} 
    alt={movie.title} 
    height={600} 
    width="100%"
    style={{ objectFit: 'cover' }}
    onError={(e) => { //manejo de errores para pelis que no tienenn poster
    }} 
    />
    <h4 className='text-center'>{movie.title}</h4>
    </Link>
  </div>
);

export default MovieCard;


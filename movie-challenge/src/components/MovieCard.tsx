import './MovieCard.css';

const MovieCard = ({ movie, urlImage }) => (
  <div className='grid-item'>
    <img 
    src={`${urlImage + movie.poster_path}`} 
    alt={movie.title} 
    height={400} 
    width="100%"
    style={{ objectFit: 'cover' }}
    onError={(e) => { //manejo de errores para pelis que no tienenn poster
      // e.target.src = '/path/to/placeholder-image.jpg';
    }} 
    />
    <h4 className='text-center'>{movie.title}</h4>
  </div>
);

export default MovieCard;


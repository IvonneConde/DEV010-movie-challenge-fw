import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './MovieDetails.css';
import axios from 'axios';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: 'fb29ad88915a994643a2e17f230ac6f2', 
              language: 'en-US', 
            },
          }
        );

        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  const {
    title,
    poster_path,
    release_date,
    overview,
    genres,
    runtime,
    vote_average,
    vote_count,
  } = movieDetails;

  return (
    <div>
      <div className='button-container'>
        <Link to="/">
          <button className='back-button'>Back to movie list</button>
        </Link>
      </div>
      <section className='movie-details-container'>
        <div className='movie-details-content'>
          <div className='movie-details-poster'>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
          </div>
          <div className='movie-details-info'>
            <h1>{title}</h1>
            <p><strong>Release Date: </strong>{release_date}</p>
            <p><strong>Overview: </strong>{overview}</p>
            <p><strong>Genres: </strong>{genres.map((genre) => genre.name).join(', ')}</p>
            <p><strong>Runtime: </strong>{runtime} minutes</p>
            <p><strong>Vote Average: </strong>{vote_average}</p>
            <p><strong>Vote Count: </strong>{vote_count}</p>
          </div>
        </div>
      </section>
    </div>
  );
  
};

export default MovieDetails;

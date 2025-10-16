import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked movie:", movie.title);
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="movie-card"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <div className="poster">
        <img src={movie.poster} alt={movie.title} className="poster-img" />
        {movie.promoted && <span className="promoted">PROMOTED</span>}
      </div>
      <div className="details">
        <span className="rating">★ {movie.rating}</span>
        <span className="votes">{movie.votes}</span>
      </div>
      <div className="title">{movie.title}</div>
      <div className="genre">{movie.genre}</div>
    </div>
  );
}

export default MovieCard;

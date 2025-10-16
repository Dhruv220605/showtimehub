import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function MovieDetail({ movies }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = movies.find((m) => String(m.id) === id);

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-detail-card">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
      <div className="movie-detail-content">
        <img src={movie.poster} alt={movie.title} className="detail-poster" />
        <div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 700, margin: 0 }}>{movie.title}</h1>
          <p className="detail-genre"><b>Genre:</b> {movie.genre}</p>
          <p className="detail-rating">
            <b>Rating:</b> {movie.rating} <br />({movie.votes})
          </p>
          <button className="book-btn">Book tickets</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

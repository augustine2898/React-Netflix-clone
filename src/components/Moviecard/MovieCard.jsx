import { useState } from "react";
import { FaPlay, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/player/${movie.id}`}
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={`movie-poster ${isHovered ? "hidden" : "block"}`}
      />

      {/* Hover Content */}
      {isHovered && (
        <div className="hover-details">
          <video
            src={movie.trailer || ""}
            autoPlay
            muted
            loop
            className="movie-trailer"
          />
          <div className="movie-info">
            <span className="badge">Recently added</span>
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-meta">
              ⭐ {movie.vote_average} | 🕒 {movie.runtime} mins | HD
            </p>
            <p className="movie-genre">
              {movie.genre_ids.slice(0, 2).join(", ")}
            </p>
            <div className="action-buttons">
              <button className="play-btn">
                <FaPlay /> Play
              </button>
              <button className="like-btn">
                <FaThumbsUp />
              </button>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default MovieCard;

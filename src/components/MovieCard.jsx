import { FaHeart, FaPlay, FaStar } from 'react-icons/fa';
import { useMovieContext } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';
const MovieCard = ({ movie }) => {
  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
  const favorite = isFavorite(movie.id)

  const onFavoriteClick = (e) => {
    e.preventDefault()
    favorite ? removeFromFavorites(movie.id)
    : addToFavorites(movie)
  }

  const movieOverview = movie.overview?.substring(0, 80);
  const movieTitle = movie.title?.substring(0, 18);

  return (
    <div className="movie-card">
      <div className="movie-banner">
        <div className="overlay"></div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
          <button><FaHeart /></button>
        </div>
        <Link className="prev-btn" to={`https://www.themoviedb.org/movie/${movie.id}/watch`}><FaPlay className='ic' /></Link>
        <p className="movie-overview">{movieOverview.trim()}{(movieOverview.charAt(79) != "" && movieOverview.charAt(79) != ".") && "..."}</p>
      </div>
      <div className="movie-info">
        <div>
          <h3 className="movie-title">
            {movieTitle.trim()}{movieTitle.charAt(17) != "" && "..."}
          </h3>
          <p className="release-date">{movie.release_date?.split("-")[0]}{movie.first_air_date?.split("-")[0]}</p>
        </div>
        <div>
          <p className="lang">{movie.original_language}</p>
          <p className="rating"><FaStar /> {movie.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
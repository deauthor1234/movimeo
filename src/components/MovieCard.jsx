import { FaHeart, FaPlay } from 'react-icons/fa';
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

  return (
    <div className="movie-card">
      <div className="movie-banner">
        <div className="overlay"></div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
          <button><FaHeart /></button>
        </div>
        <Link className="prev-btn" to={`https://www.themoviedb.org/Zmovie/${movie.id}/watch`}><FaPlay className='ic' /></Link>
      </div>
      <div className="movie-info">
        <div>
          <h3 className="movie-title">{movie.title}{movie.name}</h3>
          <p className="release-date">{movie.release_date?.split("-")[0]}{movie.first_air_date?.split("-")[0]}</p>
        </div>
        <p className="lang">{movie.original_language}</p>
      </div>
    </div>
  )
}

export default MovieCard
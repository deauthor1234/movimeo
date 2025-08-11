import { FaHeart, FaArrowRight } from 'react-icons/fa';
import { useMovieContext } from '../contexts/MovieContext';

const HeaderCard = ({ movie, tag }) => {
  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
  const favorite = isFavorite(movie.id)

  const onFavoriteClick = (e) => {
    e.preventDefault()
    favorite ? removeFromFavorites(movie.id)
    : addToFavorites(movie)
  }

  const movieOverview = movie.overview?.substring(0, 180);

  return (
    <div className="header-card">
        <div className="header-movie-banner">
            <div className="overlay"></div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
            <div className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
              <button data-aos="zoom-in"><FaHeart /></button>
            </div>
            <div className="prev-btn">Preview <FaArrowRight /></div>
        </div>
        <div className="header-movie-info">
            <p className="movie-tag" data-aos="fade-right">{tag}</p>
            <h3 className="header-movie-title" data-aos="fade-left">{movie.title}{movie.name}</h3>
            <p className="header-overview" data-aos="fade-right">{movieOverview.trim()}{(movieOverview.charAt(179) != "" && movieOverview.charAt(179) != ".") && "..."}</p>
            <p className="header-release-date">{movie.release_date}{movie.first_air_date}</p>
        </div>
    </div>
  )
}

export default HeaderCard
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "./MovieCard"


const SearchResults = () => {
  const { searching, error, searchKeyword, searchedMovies } = useMovieContext()
  
  return (
    <>
      {searching && !error && (searchedMovies.length > 0) && <p className="search-results-heading">Search Results of "{searchKeyword}"</p>}
      {searching && !error && (searchedMovies.length == 0) && <p className="search-results-heading">No results Found. Try another Keyword</p>}
      {!error && searching && <div className="searched-movies-wrapper">
          {searchedMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>}
    </>
  )
}
export default SearchResults
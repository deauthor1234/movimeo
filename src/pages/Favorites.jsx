import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import ScrollToTop from "../components/ScrollToTop";

const Favorites = () => {
  const [show, setShow] = useState(false);
  const learnMore = () => {
    (!show) ? setShow(true) : setShow(false);
  } 

  const {favorites, setIsHome} = useMovieContext()

  //Updating isHome status
  useEffect(() => {
    setIsHome(false)
  }, [])
  
  favorites.length != 0 && console.log(true, favorites);
  
  if (favorites.length != 0) { 
    return (
      <section className="favorites">
        <div className="container">
            <div className="favorite-movies-wrapper">
              {favorites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
        </div>
        <ScrollToTop />
      </section>
    )
  } else {
    return (
      <section className="favorites">
        <div className="container">
          <div className="no-favorites">
            <h1>No Favorite Movies Yet</h1>
            <p>Start adding movies to your favorites and they will appear here. <span onClick={learnMore}>Learn more</span></p>
            {show && <p>Click the heart icon at the top-right corner of the movie image.</p>}
          </div>
        </div>
      </section>
    )
  }
}

export default Favorites
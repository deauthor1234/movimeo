import { useEffect } from "react"
import { useMovieContext } from '../contexts/MovieContext';
import { useMovies } from "../hooks/useMovies";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import BackBtn from "../components/BackBtn";
import MovieCatHeading from "../components/MovieCatHeading"
import MovieListings from "../components/MovieListings"

const Home = () => {
    const { loading, searching, error, setIsHome } = useMovieContext()
    
    const {popularMovies, updatedRecentMovies, topRatedMovies, upcomingMovies, headerMovies, airingMovies } = useMovies()

    //Updating isHome status
    useEffect((() => {
        setIsHome(true)
    }), []) 
    
    return (
        <section id="home">
            <ScrollToTop />
            {(!error && !searching) && <Header tag="Top Popular Movies" movies={headerMovies} />}  
            <div className="container_wrapper">
                <div className="container">
                    {searching && <BackBtn />}
                    {error && <div className={`error-message ${searching && "searching"}`}>{error}</div>}
                    {loading ? (
                    <div className="loading">Loading...</div>
                    ) : (
                    <div className="movie-categories">
                        <SearchResults />
                        {(!error && !searching) && <MovieCatHeading tag="POPULAR" />}
                        {(!error && !searching) && <MovieListings movies={popularMovies} />}

                        {(!error && !searching) && <MovieCatHeading tag="TOP RATED" />}
                        {(!error && !searching) && <MovieListings movies={topRatedMovies} />}

                        {(!error && !searching) && <Header tag="Airing Today" nameClass="other" movies={airingMovies} />}

                        {(!error && !searching) && <MovieCatHeading tag="THIS YEAR'S" />}
                        {(!error && !searching) &&<MovieListings movies={updatedRecentMovies} />}

                        {(!error && !searching) && (<MovieCatHeading tag="UPCOMING" />)}
                        {(!error && !searching) && (<MovieListings movies={upcomingMovies} />)}
                    </div>
                    )}
                </div>
            </div>
            {(!error && !searching && !loading) && <Footer />}
        </section>
    )
}
    

export default Home
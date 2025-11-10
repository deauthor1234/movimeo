import { useState, useEffect } from "react"
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getAiringMovies } from "../services/api"
import MovieCatHeading from "../components/MovieCatHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MovieCard from "../components/MovieCard";
import { useMovieContext } from '../contexts/MovieContext';
import { BiLeftArrowAlt } from "react-icons/bi";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [airingMovies, setAiringMovies] = useState([]);
    const {
        searchedMovies, loading, setLoading, searching, setSearching,
        searchKeyword, searchDep, setSearchDep, error, setError, setIsHome,
        isDarkTheme
    } = useMovieContext()

    //Updating isHome status
    useEffect(() => {
        setIsHome(true)
    }, [])

    //Fetching popular movies
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const apiPopularMovies = await getPopularMovies();
                setPopularMovies(apiPopularMovies) 
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }
        
        loadPopularMovies()
    }, [searchDep])
    
    //Fetching top rated movies
    useEffect(() => {
        const loadTopRatedMovies = async () => {
            setLoading(true)

            try {
                const apiTopRatedMovies = await getTopRatedMovies();
                setTopRatedMovies(apiTopRatedMovies)
                setError(null)
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }

        loadTopRatedMovies()
    }, [searchDep])

    //Fetching upcoming movies
    useEffect(() => {
        const loadUpcomingMovies = async () => {
            setLoading(true)

            try {
                const apiUpcomingMovies = await getUpcomingMovies();
                setUpcomingMovies(apiUpcomingMovies)
                setError(null)
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }

        loadUpcomingMovies()
    }, [searchDep])
 
    //Fetching airing movies
    useEffect(() => {
        const loadAiringMovies = async () => {
            setLoading(true)

            try {
                const apiAiringMovies = await getAiringMovies();
                setAiringMovies(apiAiringMovies.slice(0,9))
                setError(null)
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }

        loadAiringMovies()
    }, [searchDep])

    const headerMovies = popularMovies.slice(0,5);
    const recentMovies = [...popularMovies, ...topRatedMovies, ...upcomingMovies]
    const updatedRecentMovies = recentMovies.reverse().filter((movie) => movie.release_date?.split("-")[0] === "2025")
    
    return (
        <section id="home">
            <ScrollToTop />
            {(!error && !searching) && <Header tag="Top Popular Movies" movies={headerMovies} />}  
            <div className="container_wrapper">
                <div className="container">
                    {searching && <p className="back-btn" onClick={() => {
                        setSearching(false)
                        setError(null)
                        setSearchDep(searchDep + 1)
                    }}><BiLeftArrowAlt className="ic" /> Back to Home</p>}
                    {error && <div className={`error-message ${searching && "searching"}`}>{error}</div>}
                    {loading ? (
                    <div className="loading">Loading...</div>
                    ) : (
                    <div className="movie-categories">
                        {searching && !error && (searchedMovies.length > 0) && <p className="search-results-heading">Search Results of "{searchKeyword}"</p>}
                        {(searchedMovies.length == 0) && <p className="search-results-heading">No results Found. Try another Keyword</p>}
                        {!error && searching && <div className="searched-movies-wrapper">
                            {searchedMovies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </div>}
                        {(!error && !searching) && <MovieCatHeading tag="POPULAR" />}
                        {!searching && <Swiper modules={[Navigation, A11y]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            1320 : {slidesPerView: 4 },
                            910 : {slidesPerView: 3 },
                            768 : {slidesPerView: 2 }
                        }}
                        navigation
                        className="movie-cards-wrapper">
                            {popularMovies.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SwiperSlide>
                            ))}
                        </Swiper>}

                        {(!error && !searching) && <MovieCatHeading tag="TOP RATED" />}
                        {!searching && <Swiper modules={[Navigation, A11y]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            1320 : {slidesPerView: 4 },
                            910 : {slidesPerView: 3 },
                            768 : {slidesPerView: 2 }
                        }}
                        navigation
                        className="movie-cards-wrapper">
                            {topRatedMovies.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SwiperSlide>
                            ))}
                        </Swiper>}

                        {(!error, !searching) && <Header tag="Airing Today" nameClass="other" movies={airingMovies} />}

                        {(!error && !searching) && <MovieCatHeading tag="THIS YEAR'S" />}
                        {!searching && <Swiper modules={[Navigation, A11y]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            1320 : {slidesPerView: 4 },
                            910 : {slidesPerView: 3 },
                            768 : {slidesPerView: 2 }
                        }}
                        navigation
                        className="movie-cards-wrapper">
                            {updatedRecentMovies.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SwiperSlide>
                            ))}
                        </Swiper>}

                        {(!error && !searching) && <MovieCatHeading tag="UPCOMING" />}
                        {!searching && <Swiper modules={[Navigation, A11y]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            1320 : {slidesPerView: 4 },
                            910 : {slidesPerView: 3 },
                            768 : {slidesPerView: 2 }
                        }}
                        navigation
                        className="movie-cards-wrapper">
                            {upcomingMovies.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SwiperSlide>
                            ))}
                        </Swiper>}
                    </div>
                    )}
                </div>
            </div>
            {(!error && !searching && !loading) && <Footer />}
        </section>
    )
}
    

export default Home
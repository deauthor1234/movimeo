import { useState, useEffect } from "react"
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getAiringMovies } from "../services/api"
import MovieCatHeading from "../components/MovieCatHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MovieCard from "../components/MovieCard";
import { useMovieContext } from '../contexts/MovieContext';
import { BiLeftArrowAlt, BiLogoApple, BiLogoFacebook, BiLogoInstagram, BiLogoPlayStore, BiLogoTiktok, BiLogoTwitter, BiMovie } from "react-icons/bi";
import HeaderCard from "../components/HeaderCard";
import { NavLink } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [airingMovies, setAiringMovies] = useState([]);
    const {searchedMovies, loading, setLoading, searching, setSearching, searchKeyword, searchDep, setSearchDep, error, setError, setIsHome} = useMovieContext()

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
            {(!error && !searching) &&
                <header>
                    <Swiper modules={[Navigation, Pagination, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className="header-card-wrapper">
                        {headerMovies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <HeaderCard movie={movie} tag={'Top 5 Most Popular'} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </header>
            }  
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
                    {searching && !error && <p className="search-results-heading">Search Results of "{searchKeyword}"</p>}
                    {!error && searching && <div className="searched-movies-wrapper">
                        {searchedMovies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>}
                    {(!error && !searching) && <MovieCatHeading tag="POPULAR" />}
                    {!searching && <Swiper modules={[Navigation, A11y]}
                    spaceBetween={20}
                    slidesPerView={4}
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
                    slidesPerView={4}
                    navigation
                    className="movie-cards-wrapper">
                        {topRatedMovies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <MovieCard movie={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiper>}

                    {(!error, !searching) &&
                        <header className="other">
                            <Swiper modules={[Navigation, Pagination, A11y]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            className="header-card-wrapper">
                                {airingMovies.map((movie) => (
                                    <SwiperSlide key={movie.id}>
                                        <HeaderCard movie={movie} tag="Airing Today" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </header>
                    }

                    {(!error && !searching) && <MovieCatHeading tag="THIS YEAR'S" />}
                    {!searching && <Swiper modules={[Navigation, A11y]}
                    spaceBetween={20}
                    slidesPerView={4}
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
                    slidesPerView={4}
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
            {(!error && !searching && !loading) && <footer>
                <div className="container">
                    <div className="org-info">
                        <div className="navbar-brand">
                            <NavLink to="/"><BiMovie /> Movi<span>Meo</span></NavLink>
                        </div>
                        <p className="footer-des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia vitae magnam labore quasi, in libero!</p>
                        <div className="footer-ics">
                            <BiLogoInstagram />
                            <BiLogoTiktok />
                            <BiLogoFacebook />
                            <BiLogoTwitter />
                        </div>
                    </div>
                    <div className="footer-list">
                        <p className="footer-heading">Support</p>
                        <div>
                            <ul>
                                <li>FAQ</li>
                                <li>Help Center</li>
                                <li>Contact</li>
                                <li>Watch On TV</li>
                            </ul>
                            <ul>
                                <li>My Account</li>
                                <li>Company Support</li>
                                <li>API</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className="footer-heading">Download The App</p>
                        <div className="download-media">
                            <div className="download-btn"><BiLogoPlayStore /> Play Store</div>
                            <div className="download-btn"><BiLogoApple /> App Store</div>
                        </div>
                    </div>
                </div>
                <div className="container bottom-info">
                    <span>Copyright &copy; 2025, Movimeo, All Rights Reserved</span>
                    <span>Privacy Policy</span>
                </div>
            </footer>}
        </section>
    )
}
    

export default Home
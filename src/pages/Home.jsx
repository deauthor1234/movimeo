import { useEffect } from "react"
import MovieCatHeading from "../components/MovieCatHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MovieCard from "../components/MovieCard";
import { useMovieContext } from '../contexts/MovieContext';
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import BackBtn from "../components/BackBtn";
import { useMovies } from "../hooks/useMovies";

const Home = () => {
    const { loading, searching, error, setIsHome } = useMovieContext()
    const {popularMovies, updatedRecentMovies, headerMovies, topRatedMovies, upcomingMovies, airingMovies} = useMovies()

    //Updating isHome status
    useEffect(() => {
        setIsHome(true)
    }, [])
    
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
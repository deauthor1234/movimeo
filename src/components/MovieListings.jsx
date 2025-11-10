import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import MovieCard from "./MovieCard";

const MovieListings = ({ movies }) => {
    
    return (
        <Swiper modules={[Navigation, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
            1320 : {slidesPerView: 4 },
            910 : {slidesPerView: 3 },
            768 : {slidesPerView: 2 }
        }}
        navigation
        className="movie-cards-wrapper">
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <MovieCard movie={movie} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
export default MovieListings
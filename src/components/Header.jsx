import HeaderCard from "../components/HeaderCard";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";

const Header = ({ movies, tag, nameClass }) => {

    return <header className={nameClass}>
        <Swiper modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="header-card-wrapper">
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <HeaderCard movie={movie} tag={tag} />
                </SwiperSlide>
            ))}
        </Swiper>
    </header>
}
export default Header
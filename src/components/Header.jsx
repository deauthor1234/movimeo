import { SwiperSlide } from "swiper/react";
import HeaderCard from "../components/HeaderCard";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Swiper from "swiper";

const Header = ({ movies, tag, nameClass }) => {

    return <header className={nameClass}>
        <Swiper modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="header-card-wrapper">
            {{movies}.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <HeaderCard movie={movie} tag={tag} />
                </SwiperSlide>
            ))}
        </Swiper>
    </header>
}
export default Header
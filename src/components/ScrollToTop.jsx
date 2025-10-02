import { BiUpArrowAlt } from "react-icons/bi"
import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { animateScroll as scroll } from "react-scroll";

const ScrollToTop = () => {
    const [scrollableState, setScrollableState] = useState(false)
    const { loading, favorites } = useMovieContext()

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });
    };
    
    useEffect(() => {
        document.documentElement.scrollHeight > document.documentElement.clientHeight && setScrollableState(true)
    }, [loading, favorites])

    return (
        scrollableState && <div className="scroll-to-top-btn" onClick={scrollToTop} data-aos="fade-up">
            <BiUpArrowAlt className="btn-ic" />
        </div>
    )
}

export default ScrollToTop
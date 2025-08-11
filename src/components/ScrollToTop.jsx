import { BiUpArrowAlt } from "react-icons/bi"
import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

const ScrollToTop = () => {
    const [scrollableState, setScrollableState] = useState(false)
    const { loading, favorites } = useMovieContext()
    
    useEffect(() => {
        document.documentElement.scrollHeight > document.documentElement.clientHeight && setScrollableState(true)
    }, [loading, favorites])

    return (
        scrollableState && <div className="scroll-to-top-btn" onClick={() => scrollTo(0, 0)}>
            <BiUpArrowAlt className="btn-ic" />
        </div>
    )
}

export default ScrollToTop
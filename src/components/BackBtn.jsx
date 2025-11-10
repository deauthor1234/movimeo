import { BiLeftArrowAlt } from "react-icons/bi"
import { useMovieContext } from "../contexts/MovieContext"

const BackBtn = () => {
    const { setSearchDep, setError, setSearching } = useMovieContext()

    return (
        <p className="back-btn" onClick={() => {
            setSearching(false)
            setError(null)
            setSearchDep(searchDep + 1)
        }}>
            <BiLeftArrowAlt className="ic" /> Back to Home
        </p>
    )
}
export default BackBtn
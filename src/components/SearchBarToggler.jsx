import { BiSearch } from "react-icons/bi"
import { useMovieContext } from "../contexts/MovieContext"


const SearchBarToggler  = () => {
    const { searchBarClass, setSearchBarClass } = useMovieContext()
    
    return <div className="search-btn" onClick={() => (searchBarClass === "") ? setSearchBarClass(' show') : setSearchBarClass('')}>
        <BiSearch />
    </div>
}

export default SearchBarToggler
import { NavLink } from "react-router-dom"
import { searchMovies } from "../services/api"
import { BiMovie, BiSearch } from "react-icons/bi"
import { useMovieContext } from '../contexts/MovieContext';

const NavBar = () => {
    const linkClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    const {setSearchedMovies, loading, setLoading, setSearching, setSearchKeyword, searchInput, setSearchInput, setError, isHome} = useMovieContext()

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return
        if (loading) return
        setLoading(true);
        setSearching(true);

        try {
            const searchResults = await searchMovies(searchInput);
            setSearchedMovies(searchResults)
            setError(null)
            searchResults.length != 0 && await setSearchKeyword(searchInput)
        } catch(err) {
            console.log(err);
            setError('Failed to search for movies...')
        } finally {
            setLoading(false)
        }
    }

    return (
        <nav>
            <div className="navbar">
                <div className="navbar-brand">
                    <NavLink to="/"><BiMovie /> Movi<span>Meo</span></NavLink>
                </div>
                {isHome && <form onSubmit={handleSearch} className="search-form">
                    <BiSearch className="search-ic" />
                    <input type="text" name="search-query"  className="search-bar" placeholder="Search for movies..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} required />
                    <button type="submit" className="submit-btn">Search</button>
                </form>}
                <div className="navbar-links">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
                    <div className="animation start-home"></div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
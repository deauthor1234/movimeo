import { NavLink } from "react-router-dom"
import { searchMovies } from "../services/api"
import { BiMovie, BiSearch, BiSolidMoon, BiSolidSun } from "react-icons/bi"
import { useMovieContext } from '../contexts/MovieContext';
import { useState } from "react";

const NavBar = () => {
    const linkClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    const [searchBarClass, setSearchBarClass] = useState("");
    const {setSearchedMovies, loading, setLoading, setSearching, setSearchKeyword, searchInput, setSearchInput, setError, isHome, isDarkTheme, setIsDarkTheme} = useMovieContext()
    !isDarkTheme ? document.body.classList.add("light") : document.body.classList.remove("light")
    
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
            setError('Encountered an error while searching for movies...')
        } finally {
            setLoading(false)
        }
    }

    return (
        <nav className={!isDarkTheme && "light"}>
            <div className="navbar">
                <div className="navbar-brand" data-aos="fade-right">
                    <NavLink to="/"><BiMovie /> Movi<span>Meo</span></NavLink>
                </div>
                {isHome && <form onSubmit={handleSearch} className={`search-form${searchBarClass}`} data-aos="fade-up">
                    <BiSearch className="search-ic" />
                    <input type="text" name="search-query"  className="search-bar" placeholder="Search for movies..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} required />
                    <button type="submit" className="submit-btn">Search</button>
                </form>}
                <div className="nav-group">
                    <div className="other-links">
                        {isHome && <div className="search-btn" onClick={() => (searchBarClass === "") ? setSearchBarClass(' show') : setSearchBarClass('')}><BiSearch /></div>}
                        <div onClick={() => isDarkTheme ? setIsDarkTheme(false) : setIsDarkTheme(true)} className="themeToggle">
                            <div className="thumb">{isDarkTheme ? <BiSolidMoon className="moon" /> : <BiSolidSun className="sun" />}</div>
                        </div>
                    </div>
                    <div className="navbar-links">
                        <NavLink to="/" className={linkClass} data-aos="fade-up" data-aos-once="true">Home</NavLink>
                        <NavLink to="/favorites" className={linkClass} data-aos="fade-down">Favorites</NavLink>
                        <div className="animation start-home"></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
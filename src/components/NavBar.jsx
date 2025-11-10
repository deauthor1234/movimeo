import { NavLink } from "react-router-dom"
import { BiMovie, BiSearch, BiSolidHeart, BiSolidHome, BiSolidMoon, BiSolidSun } from "react-icons/bi"
import { useMovieContext } from '../contexts/MovieContext';
import { useState } from "react";
import SearchBar from "./SearchBar";

const NavBar = () => {
    const linkClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    const [searchBarClass, setSearchBarClass] = useState("");
    const { isHome, isDarkTheme, setIsDarkTheme } = useMovieContext()
    !isDarkTheme ? document.body.classList.add("light") : document.body.classList.remove("light")

    return (
        <nav className={!isDarkTheme && "light"}>
            <div className="navbar">
                <div className="navbar-brand" data-aos="fade-right">
                    <NavLink to="/"><BiMovie /> Movi<span>Meo</span></NavLink>
                </div>
                {isHome && <SearchBar prop={searchBarClass} />}
                <div className="nav-group">
                    <div className="other-links">
                        {isHome && <div className="search-btn" onClick={() => (searchBarClass === "") ? setSearchBarClass(' show') : setSearchBarClass('')}><BiSearch /></div>}
                        <div onClick={() => isDarkTheme ? setIsDarkTheme(false) : setIsDarkTheme(true)} className="themeToggle">
                            <div className="thumb">{isDarkTheme ? <BiSolidMoon className="moon" /> : <BiSolidSun className="sun" />}</div>
                        </div>
                    </div>
                    <div className="navbar-links">
                        <NavLink to="/" className={linkClass} data-aos="fade-up" data-aos-once="true"><span>Home</span><BiSolidHome /></NavLink>
                        <NavLink to="/favorites" className={linkClass} data-aos="fade-down"><span>Favorites</span><BiSolidHeart /></NavLink>
                        <div className="animation start-home"></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
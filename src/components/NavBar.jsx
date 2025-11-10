import { NavLink } from "react-router-dom"
import { BiSolidHeart, BiSolidHome} from "react-icons/bi"
import { useMovieContext } from '../contexts/MovieContext';
import SearchBar from "./SearchBar";
import ThemeToggler from "./ThemeToggler";
import SearchBarToggler from "./SearchBarToggler";
import Logo from "./Logo";

const NavBar = () => {
    const linkClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    const { isHome, isDarkTheme } = useMovieContext()

    return (
        <nav className={!isDarkTheme && "light"}>
            <div className="navbar">
                <Logo aosAnim="fade-down" />
                {isHome && <SearchBar />}
                <div className="nav-group">
                    <div className="other-links">
                        {isHome && <SearchBarToggler />}
                        <ThemeToggler />
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
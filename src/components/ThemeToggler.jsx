import { BiSolidMoon, BiSolidSun } from "react-icons/bi"
import { useMovieContext } from "../contexts/MovieContext"

const ThemeToggler = () => {
    const { isDarkTheme, setIsDarkTheme } = useMovieContext()
    
    !isDarkTheme ? document.body.classList.add("light") : document.body.classList.remove("light")

    return (
        <div onClick={() => setIsDarkTheme(!isDarkTheme)} className="themeToggle">
            <div className="thumb">{isDarkTheme ? <BiSolidMoon className="moon" /> : <BiSolidSun className="sun" />}</div>
        </div>
    )
}
export default ThemeToggler
import { BiMovie } from "react-icons/bi"
import { NavLink } from "react-router-dom"

const Logo = ({ aosAnim }) => {
    return <div className="navbar-brand" data-aos={aosAnim}>
        <NavLink to="/"><BiMovie /> Movi<span>Meo</span></NavLink>
    </div>
}

export default Logo
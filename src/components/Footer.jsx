import { BiLogoApple, BiLogoFacebook, BiLogoInstagram, BiLogoPlayStore, BiLogoTiktok, BiLogoTwitter, BiMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return <footer>
        <div className="container">
            <div className="org-info">
                <div className="navbar-brand">
                    <NavLink to="/"><BiMovie /> Movi<span>Meo</span></NavLink>
                </div>
                <p className="footer-des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia vitae magnam labore quasi, in libero!</p>
                <div className="footer-ics">
                    <i className="ic"><BiLogoInstagram /></i>
                    <i className="ic"><BiLogoTiktok /></i>
                    <i className="ic"><BiLogoFacebook /></i>
                    <i className="ic"><BiLogoTwitter /></i>
                </div>
            </div>
            <div className="footer-list">
                <p className="footer-heading">Support</p>
                <div>
                    <ul>
                        <li>FAQ</li>
                        <li>Help Center</li>
                        <li>Contact</li>
                        <li>Watch On TV</li>
                    </ul>
                    <ul>
                        <li>My Account</li>
                        <li>Company Support</li>
                        <li>API</li>
                    </ul>
                </div>
            </div>
            <div className="download-media-wrapper">
                <p className="footer-heading">Download The App</p>
                <div className="download-media">
                    <div className="download-btn"><BiLogoPlayStore /> Play Store</div>
                    <div className="download-btn"><BiLogoApple /> App Store</div>
                </div>
            </div>
        </div>
        <div className="container bottom-info">
            <span>Copyright &copy; 2025, Movimeo, All Rights Reserved</span>
            <span>Privacy Policy</span>
        </div>
    </footer>
}
export default Footer
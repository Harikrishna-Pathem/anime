import './Footer.css';
import logo from "../../images/logo.png";
import title from '../../images/title.png';



const Footer = () => {
    return (
        <>
            <div className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        {/* <img src={logo} alt="" /> */}
                        <p>
                           Your ultimate destination for authentic anime merchandise and Collectibles
                        </p>
                        {/* <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div> */}
                    </div>
                    <div className="footer-content-center">
                        <h2>Quick Links</h2>
                        <ul>
                            <li>New Arrivals</li>
                            <li>Best Sellers</li>
                            <li>Pre-Orders</li>
                            <li>Sale Items</li>
                        </ul>
                    </div>
                    <div className="footer-content-center">
                        <h2>Support</h2>
                        <ul>
                            <li>Contact Us</li>
                            <li>Shopping Info</li>
                            <li>Returns</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>Legal</h2>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Cookies Policy</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="footer-copyright">
                    Copyright 2025 Anime.com- All Right Reserved
                </p>
            </div>
        </>
    );
};

export default Footer;
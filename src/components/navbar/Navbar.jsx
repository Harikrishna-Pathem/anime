import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import title from "../../images/title.png";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const breakpoint = 768;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return (
    <>
      <nav className="navbar">
        {/* ===== Left: Logo Section ===== */}
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <img src={title} alt="Title" className="title" />
        </div>

        {/* ===== Center: Search (Desktop) ===== */}
        <div className={`navbar-center ${searchOpen ? "active" : ""}`}>
          <input
            type="text"
            placeholder="Search for anime figures, characters, collections..."
          />
          <span className="search-icon">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </span>
        </div>

        {/* ===== Right: Icons ===== */}
        <div className="navbar-right">
          {/* Search Icon */}
          {isMobile && (
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <line
                  x1="14.5"
                  y1="14.5"
                  x2="21"
                  y2="21"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          )}

          {/* Cart / Example Icon */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 24C22.335 24 21 25.335 21 27C21 27.7956 21.3161 28.5587 21.8787 29.1213C22.4413 29.6839 23.2044 30 24 30C24.7956 30 25.5587 29.6839 26.1213 29.1213C26.6839 28.5587 27 27.7956 27 27C27 26.2044 26.6839 25.4413 26.1213 24.8787C25.5587 24.3161 24.7956 24 24 24ZM0 0V3H3L8.4 14.385L6.36 18.06C6.135 18.48 6 18.975 6 19.5C6 20.2956 6.31607 21.0587 6.87868 21.6213C7.44129 22.1839 8.20435 22.5 9 22.5H27V19.5H9.63C9.53054 19.5 9.43516 19.4605 9.36483 19.3902C9.29451 19.3198 9.255 19.2245 9.255 19.125C9.255 19.05 9.27 18.99 9.3 18.945L10.65 16.5H21.825C22.95 16.5 23.94 15.87 24.45 14.955L29.82 5.25C29.925 5.01 30 4.755 30 4.5C30 4.10218 29.842 3.72064 29.5607 3.43934C29.2794 3.15804 28.8978 3 28.5 3H6.315L4.905 0M9 24C7.335 24 6 25.335 6 27C6 27.7956 6.31607 28.5587 6.87868 29.1213C7.44129 29.6839 8.20435 30 9 30C9.79565 30 10.5587 29.6839 11.1213 29.1213C11.6839 28.5587 12 27.7956 12 27C12 26.2044 11.6839 25.4413 11.1213 24.8787C10.5587 24.3161 9.79565 24 9 24Z"
              fill="black"
            />
          </svg>

          {/* Menu Toggle Button (Mobile) */}
          {isMobile && (
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          )}
        </div>

        <div className="navbar-signin">
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        </div>
      </nav>

      {/* ===== Secondary Navbar ===== */}
      <div className={`navbar2 ${menuOpen ? "open" : ""}`}>
        <ul className="navbar-links">
          <li>Anime Collection</li>
          <li>Characters</li>
          <li>Bundles</li>
          <li>Featured</li>
          <li>Reviews</li>
          <li>Discounts</li>
          <li>My Wishlist</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

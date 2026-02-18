import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon"><img src="/NatureHeaven.png" alt="" /></div>
          <div className="logo-text">
            <h1 className="logo-name">Nature</h1>
            <span className="logo-tagline">Heaven Holidays</span>
          </div>
        </div>

        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <a href="/" onClick={closeMenu} className="nav-link">
            <span>Home</span>
          </a>
          <a href="#explore" onClick={closeMenu} className="nav-link">
            <span>Explore</span>
          </a>
          <a href="#itinerary" onClick={closeMenu} className="nav-link">
            <span>Itinerary</span>
          </a>
          <Link to="/booking" onClick={closeMenu} className="nav-link">
           <span>Book Now</span>
          </Link>
          <Link to="/admin" onClick={closeMenu} className="nav-link admin-link">
            <span>Admin Login</span>
          </Link>

          <div className="nav-backdrop" onClick={closeMenu}></div>
        </nav>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
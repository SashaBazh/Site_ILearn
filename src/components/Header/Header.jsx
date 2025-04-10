import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen width is less than 800px
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      if (window.innerWidth >= 800) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-img">
          <img src="./assets/icons/logo.svg" alt="Ministry Logo" />
        </div>
      </div>

      {/* Mobile menu toggle */}
      {isMobile && (
        <div className="burger-menu-icon" onClick={toggleMobileMenu}>
          <img
            src="./assets/icons/menu.svg"
            alt="Menu"
            className="menu-icon"
          />
        </div>
      )}

      {/* Mobile menu */}
      <div className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""} ${isMobile ? "mobile" : ""}`}>
        {isMobileMenuOpen && isMobile && (
          <div className="close-btn" onClick={toggleMobileMenu}>
            &times;
          </div>
        )}
        <ul className="nav-links">
          <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">Why Learn?</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li className="vertical-bar"></li>
          <li>
            <a href="#" className="arabic-text">
              عربي
            </a>
          </li>
          <button className="search-btn">
            <img
              src="./assets/icons/search.svg"
              alt="Search"
              className="search-icon"
            />
          </button>
          <button className="login-btn">
            <img
              src="./assets/icons/login.svg"
              alt="Login"
              className="login-icon"
            />
          </button>
          <li className="vertical-bar"></li>
          <button className="menu-toggle">
            <img
              src="./assets/icons/menu.svg"
              alt="Menu"
              className="menu-icon"
            />
          </button>
        </ul>
      </div>
    </header>
  );
};

export default Header;

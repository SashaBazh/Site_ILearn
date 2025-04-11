import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Check if screen width is less than 800px
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      if (window.innerWidth >= 800) {
        // Изменить здесь: используйте функцию из пропсов вместо setState
        // setIsMobileMenuOpen(false);
        if (isMobileMenuOpen) {
          toggleMobileMenu();
        }
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
  }, [isMobileMenuOpen, toggleMobileMenu]);

  // Toggle mobile menu

  // Toggle login modal
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    if (isMobileMenuOpen) {
      // Используйте функцию из пропсов
      toggleMobileMenu();
    }
  };

  // Switch between login and register modes
  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
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
        {isMobileMenuOpen && isMobile && (
          <div className="mobile-menu-overlay"></div>
        )}
        <div
          className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""} ${
            isMobile ? "mobile" : ""
          }`}
        >
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
            <button className="login-btn" onClick={toggleLoginModal}>
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

      {/* Login/Register Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={toggleLoginModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isLoginMode ? "Login" : "Register"}</h2>
              <button className="close-modal" onClick={toggleLoginModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  {isLoginMode ? "Login" : "Register"}
                </button>
              </form>
              <div className="auth-switch">
                <p>
                  {isLoginMode
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button className="switch-btn" onClick={toggleAuthMode}>
                    {isLoginMode ? "Register" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

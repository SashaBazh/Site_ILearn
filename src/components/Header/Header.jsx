import React, { useState, useEffect } from "react";
import "./Header.css";
import { login, register } from "../../api/auth";

const Header = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      if (window.innerWidth >= 800) {
        if (isMobileMenuOpen) {
          toggleMobileMenu();
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen, toggleMobileMenu]);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setErrorMessage("");
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrorMessage("");
    setEmail("");
    setPassword("");
    if (!isLoginMode) {
      setName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isLoginMode) {
        await login(email, password);
        toggleLoginModal();
      } else {
        await register(name, email, password);
        setIsLoginMode(true);
        setErrorMessage("Registration successful! Please log in.");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-img">
            <img src="./assets/icons/logo.svg" alt="Ministry Logo" />
          </div>
        </div>

        {isMobile && (
          <div className="burger-menu-icon" onClick={toggleMobileMenu}>
            <img
              src="./assets/icons/menu.svg"
              alt="Menu"
              className="menu-icon"
            />
          </div>
        )}

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
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                {!isLoginMode && (
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : isLoginMode
                    ? "Login"
                    : "Register"}
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

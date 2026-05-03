import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);
  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="logo">AI Kitchen Ecosystem</h1>
      </div>

      <button
        type="button"
        className="header__menuButton"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((v) => !v)}
      >
        <span className="header__menuIcon" aria-hidden="true" />
      </button>

      <nav className={`nav items-center ${isMenuOpen ? "is-open" : ""}`} aria-label="Main">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/cooking-assistant" className={isActive("/cooking-assistant")}>
          Cooking Assistant
        </Link>
        <Link to="/nutritional-guidance" className={isActive("/nutritional-guidance")}>
          Nutritional Guidance
        </Link>
        <Link to="/food-expiry" className={isActive("/food-expiry")}>
          Expiry Predictor
        </Link>
        <Link to="/smart-shopping" className={isActive("/smart-shopping")}>
          Smart Shopping
        </Link>

        <div className="header__auth">
          {user ? (
            <>
              <span className="header__hello">Hello, {user.name}</span>
              <button type="button" onClick={handleLogout} className="header__authButton">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={`header__authButtonLink ${isActive("/login")}`}>
              Login
            </Link>
          )}
        </div>
      </nav>

      {isMenuOpen ? <div className="header__backdrop" onClick={() => setIsMenuOpen(false)} /> : null}
    </header>
  );
}

export default Header;

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import ThemeToggle from "../ThemeToggle/ThemeToggle";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();

    setMenuOpen(false);

    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/logo.png" alt="Jigyasa" className="navbar-logo-image" />
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        <Link to="/explore">Explore</Link>

        <Link to="/about">About</Link>

        <Link to="/help">Help</Link>
      </div>

      <div className="navbar-actions">
        <ThemeToggle />

        {!isAuthenticated ? (
          <>
            <button className="navbar-login" onClick={() => navigate("/login")}>
              Login
            </button>

            <button
              className="navbar-get-started"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </>
        ) : (
          <>
            <button
              className="navbar-dashboard"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

            <div className="navbar-profile">
              <button
                className="profile-button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="profile-avatar">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>

                <span>{user?.name}</span>

                <span>▾</span>
              </button>

              {menuOpen && (
                <div className="profile-menu">
                  <button onClick={() => navigate("/profile")}>Profile</button>

                  <button onClick={() => navigate("/settings")}>
                    Settings
                  </button>

                  <button onClick={() => navigate("/help")}>Help</button>

                  <hr />

                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

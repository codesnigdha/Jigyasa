import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =====================================================
     LOGO
  ===================================================== */

  const logo = isDark ? "/dark-logo.png" : "/light-logo.png";

  /* =====================================================
     CLOSE MENUS
  ===================================================== */

  const closeMenus = () => {
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const handleNavigation = (path) => {
    closeMenus();
    navigate(path);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    closeMenus();

    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  /* =====================================================
     NAV LINK CLASS
  ===================================================== */

  const navLinkClass = ({ isActive }) =>
    `navbar-link ${isActive ? "active" : ""}`;

  /* =====================================================
     USER INFORMATION
  ===================================================== */

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* =================================================
            LOGO
        ================================================= */}

        <NavLink
          to="/"
          className="navbar-logo"
          onClick={closeMenus}
          aria-label="Jigyasa Home"
        >
          <img src={logo} alt="Jigyasa" className="navbar-logo-image" />
        </NavLink>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="navbar-links" aria-label="Main navigation">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/explore" className={navLinkClass}>
            Explore
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/help" className={navLinkClass}>
            Help
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="navbar-actions">
          {/* =================================================
              THEME TOGGLE
          ================================================= */}

          <button
            type="button"
            className="navbar-theme-button"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* =================================================
              LOGGED OUT
          ================================================= */}

          {!isAuthenticated ? (
            <>
              <button
                type="button"
                className="navbar-login"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </button>

              <button
                type="button"
                className="navbar-get-started"
                onClick={() => handleNavigation("/signup")}
              >
                Get Started
              </button>
            </>
          ) : (
            /* =================================================
               LOGGED IN
            ================================================= */

            <div className="navbar-profile">
              <button
                type="button"
                className="profile-button"
                onClick={() => setProfileOpen((previous) => !previous)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <span className="profile-avatar">{userInitial}</span>

                <span className="profile-name">{userName}</span>

                <span
                  className={`profile-chevron ${profileOpen ? "rotate" : ""}`}
                >
                  ▾
                </span>
              </button>

              {/* =================================================
                  PROFILE DROPDOWN
              ================================================= */}

              {profileOpen && (
                <div className="profile-menu" role="menu">
                  {/* PROFILE HEADER */}

                  <div className="profile-menu-header">
                    <div className="profile-menu-avatar">{userInitial}</div>

                    <div className="profile-menu-user">
                      <strong>{userName}</strong>

                      <span>{userEmail}</span>
                    </div>
                  </div>

                  <div className="profile-menu-divider" />

                  {/* DASHBOARD */}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    <span>Dashboard</span>
                  </button>

                  {/* ABOUT */}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNavigation("/about")}
                  >
                    <span>About Jigyasa</span>
                  </button>

                  <div className="profile-menu-divider" />

                  {/* LOGOUT */}

                  <button
                    type="button"
                    role="menuitem"
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className="navbar-mobile-button"
          onClick={() => setMobileOpen((previous) => !previous)}
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
        >
          <span className={mobileOpen ? "bar open" : "bar"} />

          <span className={mobileOpen ? "bar open" : "bar"} />

          <span className={mobileOpen ? "bar open" : "bar"} />
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileOpen && (
        <div className="navbar-mobile-menu">
          {/* HOME */}

          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          {/* EXPLORE */}

          <NavLink
            to="/explore"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            Explore
          </NavLink>

          {/* ABOUT */}

          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>

          {/* HELP */}

          <NavLink
            to="/help"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            Help
          </NavLink>

          {/* DASHBOARD */}

          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              Dashboard
            </NavLink>
          )}

          <div className="mobile-divider" />

          {/* =================================================
              MOBILE THEME
          ================================================= */}

          <button
            type="button"
            className="mobile-theme-button"
            onClick={toggleTheme}
            aria-pressed={isDark}
          >
            <span>{isDark ? "☀️" : "🌙"}</span>

            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* =================================================
              MOBILE LOGGED OUT
          ================================================= */}

          {!isAuthenticated ? (
            <>
              <button
                type="button"
                className="mobile-login"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </button>

              <button
                type="button"
                className="mobile-signup"
                onClick={() => handleNavigation("/signup")}
              >
                Get Started
              </button>
            </>
          ) : (
            /* =================================================
               MOBILE LOGGED IN
            ================================================= */

            <>
              <div className="mobile-user">
                <div className="profile-avatar">{userInitial}</div>

                <div>
                  <strong>{userName}</strong>

                  <span>{userEmail}</span>
                </div>
              </div>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;

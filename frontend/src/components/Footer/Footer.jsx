import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const { isAuthenticated } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="footer-container">
        {/* =================================================
            BRAND
        ================================================= */}

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/logo.png" alt="Jigyasa" className="footer-logo-image" />
          </Link>

          <p className="footer-description">
            An AI-powered learning platform designed to make academic and
            technology-related learning simpler, clearer and more accessible.
          </p>

          <div className="footer-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>

        {/* =================================================
            EXPLORE
        ================================================= */}

        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/">Home</Link>

          <Link to="/explore">Explore Topics</Link>

          <Link to="/ai-assistant">AI Assistant</Link>

          <Link to="/about">About Jigyasa</Link>
        </div>

        {/* =================================================
            SUPPORT
        ================================================= */}

        <div className="footer-column">
          <h3>Support</h3>

          <Link to="/help">Help Center</Link>

          <Link to="/about">About</Link>

          <Link to="/privacy">Privacy</Link>

          <Link to="/terms">Terms</Link>
        </div>

        {/* =================================================
            CTA
        ================================================= */}

        <div className="footer-cta">
          <span className="footer-cta-label">
            {isAuthenticated ? "KEEP LEARNING" : "START LEARNING"}
          </span>

          <h3>
            {isAuthenticated ? (
              <>
                Continue your
                <br />
                learning journey.
              </>
            ) : (
              <>
                Your curiosity
                <br />
                starts here.
              </>
            )}
          </h3>

          <p>
            {isAuthenticated
              ? "Ask Jigyasa, explore new topics and keep building your knowledge."
              : "Create your account and begin exploring with Jigyasa."}
          </p>

          <Link
            to={isAuthenticated ? "/ai-assistant" : "/signup"}
            className="footer-cta-button"
          >
            {isAuthenticated ? "Ask Jigyasa" : "Get Started"}

            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </Link>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {currentYear} Jigyasa. All rights reserved.</p>

          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy</Link>

            <Link to="/terms">Terms</Link>

            <Link to="/help">Help</Link>
          </div>

          <button
            type="button"
            className="footer-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

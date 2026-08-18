import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/logo.png" alt="Jigyasa" className="footer-logo-image" />
          </Link>

          <p className="footer-description">
            Learn beyond boundaries with intelligent, personalized and
            accessible learning experiences.
          </p>

          <div className="footer-socials">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GH
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              IN
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              IG
            </a>

            <a href="mailto:hello@jigyasa.com">@</a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/explore">Explore</Link>

          <Link to="/about">About</Link>

          <Link to="/help">Help</Link>
        </div>

        {/* LEARNING */}
        <div className="footer-column">
          <h3>Learning</h3>

          <Link to="/explore">Discover</Link>

          <Link to="/explore">AI Learning</Link>

          <Link to="/explore">Resources</Link>

          <Link to="/dashboard">Dashboard</Link>
        </div>

        {/* ACCOUNT */}
        <div className="footer-column">
          <h3>Account</h3>

          <Link to="/login">Login</Link>

          <Link to="/signup">Get Started</Link>

          <Link to="/profile">Profile</Link>

          <Link to="/settings">Settings</Link>
        </div>

        {/* CTA */}
        <div className="footer-cta">
          <span className="footer-cta-label">START LEARNING</span>

          <h3>
            Your curiosity
            <br />
            starts here.
          </h3>

          <Link to="/signup" className="footer-cta-button">
            Get Started
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* BOTTOM */}
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
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

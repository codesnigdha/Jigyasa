import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Target,
  X,
  Zap,
} from "lucide-react";

import "./Home.css";
import { useTheme } from "../../../context/ThemeContext";

function Home() {
  const navigate = useNavigate();

  // =====================================================
  // THEME
  // =====================================================

  const { isDark: darkMode, toggleTheme } = useTheme();

  // =====================================================
  // MOBILE MENU
  // =====================================================

  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const goToSignup = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  const scrollToFeatures = () => {
    setMenuOpen(false);

    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToHowItWorks = () => {
    setMenuOpen(false);

    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className={`home-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="home-navbar">
        <div className="home-navbar-inner">
          {/* LOGO */}

          <button
            type="button"
            className="home-logo"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img src="/logo.png" alt="Jigyasa" className="home-logo-image" />
          </button>

          {/* DESKTOP NAVIGATION */}

          <nav className="home-nav-links">
            <button
              type="button"
              onClick={() => window.scrollTo(0, 0)}
              className="active"
            >
              Home
            </button>

            <button type="button" onClick={scrollToFeatures}>
              Features
            </button>

            <button type="button" onClick={scrollToHowItWorks}>
              How It Works
            </button>
          </nav>

          {/* NAV ACTIONS */}

          <div className="home-nav-actions">
            <button
              type="button"
              className="home-theme-button"
              onClick={toggleTheme}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              className="home-login-button"
              onClick={goToLogin}
            >
              Sign In
            </button>

            <button
              type="button"
              className="home-signup-button"
              onClick={goToSignup}
            >
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="home-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}

        {menuOpen && (
          <div className="home-mobile-nav">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Home
            </button>

            <button type="button" onClick={scrollToFeatures}>
              Features
            </button>

            <button type="button" onClick={scrollToHowItWorks}>
              How It Works
            </button>

            <div className="mobile-nav-divider"></div>

            <button type="button" onClick={goToLogin}>
              Sign In
            </button>

            <button
              type="button"
              className="mobile-get-started"
              onClick={goToSignup}
            >
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <main>
        <section className="home-hero">
          <div className="home-hero-background"></div>

          <div className="home-hero-content">
            {/* LEFT */}

            <div className="home-hero-text">
              <div className="home-eyebrow">
                <Sparkles size={15} />
                AI-POWERED LEARNING
              </div>

              <h1>
                Learn smarter.
                <br />
                <span>Grow faster.</span>
              </h1>

              <p>
                Jigyasa is your intelligent learning companion. Explore
                concepts, understand difficult topics, practice your skills, and
                build knowledge with the power of AI.
              </p>

              <div className="home-hero-buttons">
                <button
                  type="button"
                  className="hero-primary-button"
                  onClick={goToSignup}
                >
                  Start Learning
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className="hero-secondary-button"
                  onClick={scrollToHowItWorks}
                >
                  Explore Jigyasa
                  <ChevronDown size={17} />
                </button>
              </div>

              <div className="home-trust-row">
                <div className="trust-item">
                  <CheckCircle2 size={16} />
                  Personalized
                </div>

                <div className="trust-item">
                  <CheckCircle2 size={16} />
                  AI-assisted
                </div>

                <div className="trust-item">
                  <CheckCircle2 size={16} />
                  Student-friendly
                </div>
              </div>
            </div>

            {/* RIGHT AI CARD */}

            <div className="home-hero-visual">
              <div className="hero-glow"></div>

              <div className="ai-card">
                <div className="ai-card-top">
                  <div className="ai-card-icon">
                    <Brain size={22} />
                  </div>

                  <div>
                    <strong>Jigyasa AI</strong>
                    <span>Your learning companion</span>
                  </div>

                  <div className="ai-status"></div>
                </div>

                <div className="ai-question">
                  <span>You</span>

                  <p>Explain recursion in a simple way.</p>
                </div>

                <div className="ai-answer">
                  <div className="ai-answer-header">
                    <div className="mini-ai-icon">J</div>

                    <span>Jigyasa</span>
                  </div>

                  <p>
                    Think of recursion as a function asking itself to solve a
                    smaller version of the same problem until it reaches a
                    simple stopping point.
                  </p>

                  <div className="ai-progress">
                    <div className="ai-progress-label">
                      <span>Understanding</span>
                      <strong>86%</strong>
                    </div>

                    <div className="progress-track">
                      <div className="progress-fill"></div>
                    </div>
                  </div>
                </div>

                <div className="ai-card-footer">
                  <span>Ready to learn</span>

                  <Zap size={15} />
                </div>
              </div>

              <div className="floating-card floating-card-one">
                <Target size={17} />
                <span>Track Progress</span>
              </div>

              <div className="floating-card floating-card-two">
                <BookOpen size={17} />
                <span>Learn Anything</span>
              </div>
            </div>
          </div>

          {/* SCROLL */}

          <button
            type="button"
            className="hero-scroll"
            onClick={scrollToFeatures}
          >
            <span>Scroll to explore</span>
            <ChevronDown size={16} />
          </button>
        </section>

        {/* =================================================
            FEATURES
        ================================================= */}

        <section className="home-section home-features-section" id="features">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-eyebrow">WHY JIGYASA</span>

              <h2>
                Everything you need
                <br />
                <span>to learn better.</span>
              </h2>

              <p>
                A focused learning environment designed around the way modern
                students learn.
              </p>
            </div>

            <div className="features-grid">
              {/* CARD 1 */}

              <article className="feature-card">
                <div className="feature-card-icon blue-icon">
                  <Brain size={23} />
                </div>

                <span className="feature-number">01</span>

                <h3>AI Learning Assistant</h3>

                <p>
                  Ask questions, simplify difficult concepts, and get
                  explanations that are easier to understand.
                </p>

                <div className="feature-link">
                  Learn smarter
                  <ArrowRight size={15} />
                </div>
              </article>

              {/* CARD 2 */}

              <article className="feature-card">
                <div className="feature-card-icon cyan-icon">
                  <BookOpen size={23} />
                </div>

                <span className="feature-number">02</span>

                <h3>Personalized Learning</h3>

                <p>
                  Learn at your own pace with content and assistance that adapts
                  to your learning needs.
                </p>

                <div className="feature-link">
                  Your pace
                  <ArrowRight size={15} />
                </div>
              </article>

              {/* CARD 3 */}

              <article className="feature-card">
                <div className="feature-card-icon purple-icon">
                  <Target size={23} />
                </div>

                <span className="feature-number">03</span>

                <h3>Track Your Progress</h3>

                <p>
                  Keep track of your learning journey, achievements, and areas
                  where you can improve.
                </p>

                <div className="feature-link">
                  Keep growing
                  <ArrowRight size={15} />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="home-section how-section" id="how-it-works">
          <div className="section-container">
            <div className="how-content">
              <div className="how-text">
                <span className="section-eyebrow">HOW IT WORKS</span>

                <h2>
                  Learning doesn't
                  <br />
                  have to be <span>complicated.</span>
                </h2>

                <p>
                  Jigyasa brings your learning tools together in one simple
                  experience. Ask, understand, practice, and improve.
                </p>

                <button
                  type="button"
                  className="how-button"
                  onClick={goToSignup}
                >
                  Create Your Account
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="steps-container">
                {/* STEP 1 */}

                <div className="learning-step">
                  <div className="step-number">01</div>

                  <div className="step-line"></div>

                  <div className="step-content">
                    <h3>Ask</h3>

                    <p>Ask Jigyasa questions about anything you're learning.</p>
                  </div>
                </div>

                {/* STEP 2 */}

                <div className="learning-step">
                  <div className="step-number">02</div>

                  <div className="step-line"></div>

                  <div className="step-content">
                    <h3>Understand</h3>

                    <p>
                      Get clear explanations designed around your level of
                      understanding.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}

                <div className="learning-step">
                  <div className="step-number">03</div>

                  <div className="step-content">
                    <h3>Improve</h3>

                    <p>
                      Practice what you learn and continue improving your
                      skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            CTA
        ================================================= */}

        <section className="home-cta-section">
          <div className="cta-pattern"></div>

          <div className="cta-content">
            <div className="cta-icon">
              <Sparkles size={23} />
            </div>

            <span className="section-eyebrow">YOUR JOURNEY STARTS HERE</span>

            <h2>
              Ready to learn
              <br />
              <span>something new?</span>
            </h2>

            <p>
              Create your free Jigyasa account and start building a smarter
              learning habit today.
            </p>

            <button type="button" className="cta-button" onClick={goToSignup}>
              Get Started
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="Jigyasa" className="home-footer-logo-image" />
            </div>

            <p>Learn beyond boundaries.</p>
          </div>

          <div className="footer-links">
            <button onClick={scrollToFeatures}>Features</button>

            <button onClick={scrollToHowItWorks}>How It Works</button>

            <button onClick={goToLogin}>Sign In</button>

            <button onClick={goToSignup}>Create Account</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Jigyasa. All rights reserved.</span>

          <span>Built for curious minds.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;

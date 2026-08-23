import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Home.css";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="home-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-hero">
        <div className="home-container home-hero-grid">
          {/* LEFT — HERO CONTENT */}

          <div className="home-hero-content">
            <span className="home-eyebrow">AI-POWERED LEARNING</span>

            <h1>
              Your curiosity
              <br />
              <span>deserves an answer.</span>
            </h1>

            <p>
              Learn concepts, explore ideas and understand difficult topics with
              Jigyasa, your intelligent learning companion.
            </p>

            <div className="home-hero-actions">
              <Link to="/explore" className="home-primary-button">
                Start Learning
                <span>→</span>
              </Link>

              <Link to="/ai-assistant" className="home-secondary-button">
                AI Assistant
                <span>→</span>
              </Link>
            </div>

            <div className="home-hero-note">
              <span className="home-note-dot"></span>
              Learn at your own pace with Jigyasa AI
            </div>
          </div>

          {/* RIGHT — ABSTRACT AI VISUAL */}

          <div className="home-abstract-visual">
            <div className="abstract-glow"></div>

            <div className="abstract-orbit orbit-one"></div>
            <div className="abstract-orbit orbit-two"></div>
            <div className="abstract-orbit orbit-three"></div>

            <div className="abstract-core">
              <div className="core-inner">
                <img src="/icon.png" alt="Jigyasa" className="core-logo" />
              </div>
            </div>

            {/* FLOATING ELEMENTS */}

            <div className="floating-element floating-one">
              <span className="floating-icon">✦</span>

              <div>
                <strong>Learn</strong>
                <small>Understand</small>
              </div>
            </div>

            <div className="floating-element floating-two">
              <span className="floating-icon">◇</span>

              <div>
                <strong>Explore</strong>
                <small>Discover</small>
              </div>
            </div>

            <div className="floating-element floating-three">
              <span className="floating-icon">?</span>

              <div>
                <strong>Ask</strong>
                <small>Anything</small>
              </div>
            </div>

            {/* DECORATIVE DOTS */}

            <span className="visual-dot dot-one"></span>
            <span className="visual-dot dot-two"></span>
            <span className="visual-dot dot-three"></span>
            <span className="visual-dot dot-four"></span>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY JIGYASA
      ===================================================== */}

      <section className="features-section">
        <div className="home-container">
          <div className="features-heading">
            <span className="home-eyebrow">WHY JIGYASA</span>

            <h2>
              Everything you need to
              <br />
              <span>learn with confidence.</span>
            </h2>

            <p>
              Jigyasa brings intelligent assistance and simple learning tools
              together in one place.
            </p>
          </div>

          {/* FEATURE CARDS */}

          <div className="features-grid">
            {/* =================================================
                CARD 1 — AI ASSISTANT
            ================================================= */}

            <Link
              to="/ai-assistant"
              className="feature-card"
              aria-label="Open AI Learning Assistant"
            >
              <span className="feature-number">01</span>

              <div className="feature-card-content">
                <h3>AI Learning Assistant</h3>

                <p>
                  Ask questions and get clear, easy-to-understand explanations
                  with Jigyasa AI.
                </p>
              </div>

              <span className="feature-arrow">→</span>
            </Link>

            {/* =================================================
                CARD 2 — EXPLORE
            ================================================= */}

            <Link
              to="/explore"
              className="feature-card"
              aria-label="Explore Topics"
            >
              <span className="feature-number">02</span>

              <div className="feature-card-content">
                <h3>Explore Topics</h3>

                <p>
                  Discover different subjects and explore concepts that match
                  your learning interests.
                </p>
              </div>

              <span className="feature-arrow">→</span>
            </Link>

            {/* =================================================
                CARD 3 — DASHBOARD
            ================================================= */}

            <Link
              to="/dashboard"
              className="feature-card"
              aria-label="Open Personalized Learning"
            >
              <span className="feature-number">03</span>

              <div className="feature-card-content">
                <h3>Personalized Learning</h3>

                <p>
                  Learn at your own pace with guidance designed around your
                  questions and learning needs.
                </p>
              </div>

              <span className="feature-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
    HOW IT WORKS
===================================================== */}

      <section className="how-section">
        <div className="home-container">
          {/* SECTION HEADER */}

          <div className="how-header">
            <div>
              <span className="home-eyebrow">HOW IT WORKS</span>

              <h2>
                Learn with
                <span> curiosity.</span>
              </h2>
            </div>

            <p>
              Start with a question, understand the answer, and keep exploring
              with Jigyasa.
            </p>
          </div>

          {/* STEPS */}

          <div className="steps">
            {/* =================================================
          STEP 1
      ================================================= */}

            <Link to="/ai-assistant" className="step">
              <div className="step-top">
                <span className="step-number">01</span>

                <span className="step-icon">?</span>
              </div>

              <div className="step-content">
                <span className="step-label">ASK JIGYASA</span>

                <h3>Ask</h3>

                <p>
                  Ask questions about concepts, subjects, programming,
                  technology and more.
                </p>
              </div>

              <span className="step-arrow">→</span>
            </Link>

            {/* =================================================
          STEP 2
      ================================================= */}

            <Link to="/ai-assistant" className="step">
              <div className="step-top">
                <span className="step-number">02</span>

                <span className="step-icon">✦</span>
              </div>

              <div className="step-content">
                <span className="step-label">GET CLARITY</span>

                <h3>Understand</h3>

                <p>
                  Get simple, structured explanations that make difficult
                  concepts easier to learn.
                </p>
              </div>

              <span className="step-arrow">→</span>
            </Link>

            {/* =================================================
          STEP 3
      ================================================= */}

            <Link to="/explore" className="step">
              <div className="step-top">
                <span className="step-number">03</span>

                <span className="step-icon">↗</span>
              </div>

              <div className="step-content">
                <span className="step-label">KEEP LEARNING</span>

                <h3>Explore</h3>

                <p>
                  Discover new topics, go deeper and continue learning at your
                  own pace.
                </p>
              </div>

              <span className="step-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPLORE TOPICS
      ===================================================== */}

      <section className="topics-section">
        <div className="home-container">
          <div className="topics-heading">
            <div>
              <span className="home-eyebrow">EXPLORE</span>

              <h2>
                Find something
                <span> interesting.</span>
              </h2>
            </div>

            <Link to="/explore" className="topics-link">
              Explore all →
            </Link>
          </div>

          <div className="topics-grid">
            {/* AI */}

            <Link to="/explore" className="topic-card topic-card-large">
              <span className="topic-number">01</span>

              <span className="topic-symbol">✦</span>

              <div>
                <h3>Artificial Intelligence</h3>

                <p>
                  Explore AI concepts and discover how intelligent systems work.
                </p>
              </div>

              <span className="topic-arrow">→</span>
            </Link>

            {/* MACHINE LEARNING */}

            <Link to="/explore" className="topic-card">
              <span className="topic-number">02</span>

              <span className="topic-symbol">◇</span>

              <h3>Machine Learning</h3>

              <p>Understand the fundamentals of machine learning.</p>

              <span className="topic-arrow">→</span>
            </Link>

            {/* PROGRAMMING */}

            <Link to="/explore" className="topic-card">
              <span className="topic-number">03</span>

              <span className="topic-symbol">{"</>"}</span>

              <h3>Programming</h3>

              <p>Improve your programming and problem-solving skills.</p>

              <span className="topic-arrow">→</span>
            </Link>

            {/* DATA SCIENCE */}

            <Link to="/explore" className="topic-card">
              <span className="topic-number">04</span>

              <span className="topic-symbol">◫</span>

              <h3>Data Science</h3>

              <p>Discover data, analysis and intelligent insights.</p>

              <span className="topic-arrow">→</span>
            </Link>

            {/* MATHEMATICS */}

            <Link to="/explore" className="topic-card">
              <span className="topic-number">05</span>

              <span className="topic-symbol">∑</span>

              <h3>Mathematics</h3>

              <p>Make mathematical concepts easier to understand.</p>

              <span className="topic-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="home-cta">
        <div className="home-container">
          <div className="home-cta-card">
            <span className="home-eyebrow">START LEARNING</span>

            <h2>
              Every question is
              <br />a chance to learn.
            </h2>

            <p>
              {isAuthenticated
                ? "Continue learning with Jigyasa, your AI-powered learning companion."
                : "Create your Jigyasa account and start exploring with your AI learning companion."}
            </p>

            <Link
              to={isAuthenticated ? "/ai-assistant" : "/signup"}
              className="home-cta-button"
            >
              {isAuthenticated ? "Ask Jigyasa" : "Get Started"}

              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

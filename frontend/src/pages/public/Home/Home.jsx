import { Link } from "react-router-dom";

import Features from "../../../components/Features/Features";

import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-hero">
        <div className="home-container home-hero-grid">
          {/* =================================================
              LEFT — HERO CONTENT
          ================================================= */}

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
              <Link to="/signup" className="home-primary-button">
                Start Learning
                <span>→</span>
              </Link>

              <Link to="/explore" className="home-secondary-button">
                Explore Topics
                <span>→</span>
              </Link>
            </div>

            <div className="home-hero-note">
              <span className="home-note-dot"></span>
              Learn at your own pace with Jigyasa AI
            </div>
          </div>

          {/* =================================================
              RIGHT — ABSTRACT AI VISUAL
          ================================================= */}

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
          FEATURES
      ===================================================== */}

      <Features />

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="how-section">
        <div className="home-container">
          <div className="home-section-heading">
            <span className="home-eyebrow">HOW IT WORKS</span>

            <h2>
              Ask.
              <span> Understand.</span>
              <br />
              Explore.
            </h2>

            <p>
              Jigyasa keeps learning simple. Start with a question and let your
              curiosity guide the rest.
            </p>
          </div>

          <div className="steps">
            {/* STEP 1 */}

            <div className="step">
              <div className="step-top">
                <span className="step-number">01</span>

                <span className="step-icon">?</span>
              </div>

              <h3>Ask</h3>

              <p>
                Ask Jigyasa anything you want to understand, from simple
                concepts to complex topics.
              </p>
            </div>

            {/* STEP 2 */}

            <div className="step">
              <div className="step-top">
                <span className="step-number">02</span>

                <span className="step-icon">✦</span>
              </div>

              <h3>Understand</h3>

              <p>
                Get clear explanations that make difficult concepts easier to
                understand.
              </p>
            </div>

            {/* STEP 3 */}

            <div className="step">
              <div className="step-top">
                <span className="step-number">03</span>

                <span className="step-icon">↗</span>
              </div>

              <h3>Explore</h3>

              <p>
                Go deeper, ask follow-up questions and discover new ideas as you
                continue learning.
              </p>
            </div>
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

            {/* ML */}

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
              Create your Jigyasa account and start exploring with your AI
              learning companion.
            </p>

            <Link to="/signup" className="home-cta-button">
              Get Started
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

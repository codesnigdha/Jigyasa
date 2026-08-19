import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">
        <div className="about-container about-hero-grid">
          <div className="about-hero-content">
            <span className="about-eyebrow">ABOUT JIGYASA</span>

            <h1>
              Curiosity is where
              <span> learning begins.</span>
            </h1>

            <p>
              Jigyasa is an AI-powered learning platform designed to make
              understanding simpler, more interactive and more accessible.
            </p>

            <div className="about-hero-actions">
              <Link to="/signup" className="about-primary-button">
                Start Learning
                <span>→</span>
              </Link>

              <Link to="/explore" className="about-secondary-button">
                Explore Jigyasa
              </Link>
            </div>
          </div>

          {/* =================================================
              VISUAL
          ================================================= */}

          <div className="about-hero-visual">
            <div className="about-orbit">
              <div className="orbit-ring orbit-ring-one"></div>
              <div className="orbit-ring orbit-ring-two"></div>

              <div className="abstract-core">
                <div className="core-inner">
                  <img
                    src="/icon2.png"
                    alt="Jigyasa"
                    className="ai-core-logo"
                  />
                </div>
              </div>

              <div className="orbit-dot orbit-dot-one"></div>
              <div className="orbit-dot orbit-dot-two"></div>
              <div className="orbit-dot orbit-dot-three"></div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS JIGYASA
      ===================================================== */}

      <section className="about-introduction">
        <div className="about-container">
          <div className="about-intro-grid">
            <div className="about-section-heading">
              <span className="about-eyebrow">OUR PURPOSE</span>

              <h2>
                Learning should feel
                <span> natural.</span>
              </h2>
            </div>

            <div className="about-intro-content">
              <p>
                Learning often becomes difficult when concepts are presented
                without context or when finding the right explanation takes too
                much time.
              </p>

              <p>
                Jigyasa brings an intelligent learning assistant into that
                process. Instead of simply giving answers, the platform is
                designed to help learners understand, explore and continue
                asking questions.
              </p>

              <p>
                Whether you are starting a new topic or trying to understand a
                difficult concept, Jigyasa provides a simple space to learn at
                your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE IDEA
      ===================================================== */}

      <section className="about-idea">
        <div className="about-container">
          <div className="about-idea-card">
            <div className="idea-symbol">✦</div>

            <div className="idea-content">
              <span className="about-eyebrow">THE IDEA</span>

              <h2>
                Ask questions.
                <br />
                Understand concepts.
                <br />
                Keep learning.
              </h2>

              <p>
                Jigyasa is built around a simple idea: curiosity should never
                stop because you cannot find the right explanation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT JIGYASA OFFERS
      ===================================================== */}

      <section className="about-values">
        <div className="about-container">
          <div className="about-section-heading centered">
            <span className="about-eyebrow">WHAT WE OFFER</span>

            <h2>
              Built around the
              <span> learner.</span>
            </h2>

            <p>
              Every part of Jigyasa is designed to make learning clearer and
              more engaging.
            </p>
          </div>

          <div className="about-values-grid">
            <article className="about-value-card">
              <div className="value-icon">✦</div>

              <span className="value-number">01</span>

              <h3>Intelligent Assistance</h3>

              <p>
                Ask questions naturally and receive explanations that help you
                understand the topic.
              </p>
            </article>

            <article className="about-value-card">
              <div className="value-icon">◇</div>

              <span className="value-number">02</span>

              <h3>Simple Exploration</h3>

              <p>
                Explore different subjects and discover concepts that spark your
                curiosity.
              </p>
            </article>

            <article className="about-value-card">
              <div className="value-icon">◎</div>

              <span className="value-number">03</span>

              <h3>Learn at Your Pace</h3>

              <p>
                Take your time, ask follow-up questions and build your
                understanding step by step.
              </p>
            </article>

            <article className="about-value-card">
              <div className="value-icon">↗</div>

              <span className="value-number">04</span>

              <h3>Continuous Growth</h3>

              <p>
                Keep exploring new ideas and turn every question into an
                opportunity to learn something new.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION
      ===================================================== */}

      <section className="about-vision">
        <div className="about-container">
          <div className="vision-grid">
            <div className="vision-number">01</div>

            <div className="vision-content">
              <span className="about-eyebrow">OUR VISION</span>

              <h2>
                Make learning more
                <span> curious, clear and accessible.</span>
              </h2>

              <p>
                We envision a learning environment where asking a question is
                the beginning of exploration rather than the end of a lesson.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="about-cta">
        <div className="about-container">
          <div className="about-cta-card">
            <span className="about-eyebrow">START WITH CURIOSITY</span>

            <h2>
              Have a question?
              <br />
              Start with Jigyasa.
            </h2>

            <p>
              Create your learning space and begin exploring with your AI
              learning assistant.
            </p>

            <Link to="/signup" className="about-cta-button">
              Get Started
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import QuickActions from "../../../components/AI/QuickActions/QuickActions";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userName = user?.name || "Learner";
  const firstName = userName.split(" ")[0];

  /* =====================================================
     OPEN AI ASSISTANT
  ===================================================== */

  const openAIAssistant = () => {
    navigate("/ai-assistant");
  };

  /* =====================================================
     TOPICS
  ===================================================== */

  const topics = [
    {
      number: "01",
      icon: "✦",
      title: "Artificial Intelligence",
      description: "Explore AI concepts and intelligent systems.",
    },
    {
      number: "02",
      icon: "◇",
      title: "Machine Learning",
      description: "Understand models, algorithms and ML basics.",
    },
    {
      number: "03",
      icon: "</>",
      title: "Programming",
      description: "Build stronger programming fundamentals.",
    },
    {
      number: "04",
      icon: "◫",
      title: "Data Science",
      description: "Discover data, insights and analytics.",
    },
  ];

  return (
    <main className="dashboard-page">
      <div className="dashboard-wrapper">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="dashboard-hero">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot"></span>
              YOUR LEARNING SPACE
            </div>

            <h1>
              Welcome back,
              <span>{firstName}.</span>
            </h1>

            <p>
              Continue your learning journey, explore new ideas, and ask Jigyasa
              anything you're curious about.
            </p>

            <div className="hero-actions">
              {/* =================================================
                  ASK JIGYASA
              ================================================= */}

              <button
                type="button"
                className="hero-primary-button"
                onClick={openAIAssistant}
              >
                <span>✦</span>

                <span>Ask Jigyasa AI</span>

                <span className="button-arrow">→</span>
              </button>

              {/* =================================================
                  EXPLORE
              ================================================= */}

              <button
                type="button"
                className="hero-secondary-button"
                onClick={() => navigate("/explore")}
              >
                <span>Explore topics</span>

                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            QUICK STATS
        ================================================= */}

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue">✦</div>

            <div className="stat-content">
              <strong>0</strong>
              <span>AI conversations</span>
            </div>

            <span className="stat-arrow">→</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">◇</div>

            <div className="stat-content">
              <strong>0</strong>
              <span>Topics explored</span>
            </div>

            <span className="stat-arrow">→</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon cyan">◷</div>

            <div className="stat-content">
              <strong>0 min</strong>
              <span>Learning time</span>
            </div>

            <span className="stat-arrow">→</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>

            <div className="stat-content">
              <strong>0%</strong>
              <span>Learning progress</span>
            </div>

            <span className="stat-arrow">→</span>
          </div>
        </section>

        {/* =================================================
            AI LEARNING ASSISTANT
        ================================================= */}

        <section className="ai-section" id="ai-learning">
          <div className="section-heading">
            <div>
              <span className="section-label">AI LEARNING ASSISTANT</span>

              <h2>Meet Jigyasa AI</h2>

              <p>
                Ask questions, upload documents or images, and get intelligent
                answers based on your content.
              </p>
            </div>

            <div className="ai-status">
              <span className="status-dot"></span>
              AI Ready
            </div>
          </div>

          {/* =================================================
              MULTIMODAL AI PREVIEW
          ================================================= */}

          <div className="ai-assistant-card">
            <div className="ai-assistant-card-content">
              <div className="ai-assistant-icon">✦</div>

              <div className="ai-assistant-text">
                <span className="ai-assistant-label">MULTIMODAL LEARNING</span>

                <h3>Ask Jigyasa about anything</h3>

                <p>
                  Upload an image, PDF, document or text. Jigyasa can analyze
                  your content and answer questions based on it.
                </p>

                <div className="ai-capabilities">
                  <span>
                    <span>🖼️</span>
                    Images
                  </span>

                  <span>
                    <span>📄</span>
                    Documents
                  </span>

                  <span>
                    <span>📝</span>
                    Text
                  </span>

                  <span>
                    <span>✦</span>
                    AI Analysis
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="ai-assistant-button"
              onClick={openAIAssistant}
            >
              <span>Open Jigyasa AI</span>

              <span>→</span>
            </button>
          </div>
        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="quick-section">
          <div className="section-heading compact">
            <div>
              <span className="section-label">QUICK ACTIONS</span>

              <h2>Learn your way</h2>
            </div>
          </div>

          <QuickActions />
        </section>

        {/* =================================================
            ACTIVITY GRID
        ================================================= */}

        <section className="activity-grid">
          {/* =================================================
              CONVERSATIONS
          ================================================= */}

          <div className="dashboard-card conversations-card">
            <div className="card-header">
              <div>
                <span className="card-label">RECENT ACTIVITY</span>

                <h3>Conversations</h3>
              </div>
            </div>

            <div className="conversation-list">
              <button
                type="button"
                className="conversation-item"
                onClick={openAIAssistant}
              >
                <div className="conversation-icon">✦</div>

                <div className="conversation-details">
                  <strong>Start a new conversation</strong>

                  <span>Ask Jigyasa anything and start learning.</span>
                </div>

                <span className="conversation-arrow">→</span>
              </button>

              <div className="conversation-item empty">
                <div className="conversation-icon muted">○</div>

                <div className="conversation-details">
                  <strong>No previous conversations</strong>

                  <span>Your AI conversations will appear here.</span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              LEARNING OVERVIEW
          ================================================= */}

          <div className="dashboard-card progress-card">
            <div className="card-header">
              <div>
                <span className="card-label">YOUR ACTIVITY</span>

                <h3>Learning Overview</h3>
              </div>

              <span className="progress-percent">0%</span>
            </div>

            <div className="progress-content">
              <div className="progress-circle">
                <div className="progress-circle-inner">
                  <strong>0%</strong>

                  <span>Progress</span>
                </div>
              </div>

              <div className="progress-stats">
                <div className="progress-stat">
                  <strong>0</strong>
                  <span>Topics explored</span>
                </div>

                <div className="progress-stat">
                  <strong>0</strong>
                  <span>AI conversations</span>
                </div>

                <div className="progress-stat">
                  <strong>0 min</strong>
                  <span>Learning time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            EXPLORE TOPICS
        ================================================= */}

        <section className="topics-section">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE</span>

              <h2>Where curiosity takes you</h2>

              <p>Pick a topic and let Jigyasa guide your learning.</p>
            </div>

            <button
              type="button"
              className="outline-button"
              onClick={() => navigate("/explore")}
            >
              <span>View all topics</span>

              <span>→</span>
            </button>
          </div>

          <div className="topic-grid">
            {topics.map((topic) => (
              <button
                type="button"
                className="topic-card"
                key={topic.number}
                onClick={() => navigate("/explore")}
              >
                <div className="topic-top">
                  <span className="topic-icon">{topic.icon}</span>

                  <span className="topic-number">{topic.number}</span>
                </div>

                <div className="topic-content">
                  <strong>{topic.title}</strong>

                  <small>{topic.description}</small>
                </div>

                <span className="topic-arrow">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="dashboard-cta">
          <div>
            <span className="section-label">KEEP LEARNING</span>

            <h2>Every question is a step forward.</h2>

            <p>
              Ask something you're curious about and let Jigyasa help you
              understand it.
            </p>
          </div>

          <button
            type="button"
            onClick={openAIAssistant}
            className="cta-button"
          >
            <span>Ask Jigyasa</span>

            <span>→</span>
          </button>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;

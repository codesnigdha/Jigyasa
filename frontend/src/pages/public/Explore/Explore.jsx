import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import "./Explore.css";

function Explore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Artificial Intelligence",
    "Programming",
    "Data Science",
    "Computer Science",
  ];

  const topics = [
    {
      id: 1,
      category: "Artificial Intelligence",
      number: "01",
      icon: "✦",
      title: "Artificial Intelligence",
      description:
        "Understand intelligent systems, AI concepts, applications and the ideas shaping modern technology.",
      level: "Beginner",
      lessons: "12 topics",
      featured: true,
    },
    {
      id: 2,
      category: "Artificial Intelligence",
      number: "02",
      icon: "◇",
      title: "Machine Learning",
      description:
        "Learn how machines discover patterns from data and make predictions.",
      level: "Beginner",
      lessons: "10 topics",
    },
    {
      id: 3,
      category: "Programming",
      number: "03",
      icon: "</>",
      title: "Programming",
      description:
        "Build strong programming fundamentals and improve your problem-solving skills.",
      level: "Beginner",
      lessons: "15 topics",
    },
    {
      id: 4,
      category: "Data Science",
      number: "04",
      icon: "◫",
      title: "Data Science",
      description:
        "Explore data analysis, visualization and the foundations of data-driven decision making.",
      level: "Intermediate",
      lessons: "9 topics",
    },
    {
      id: 5,
      category: "Computer Science",
      number: "05",
      icon: "⌘",
      title: "Computer Science",
      description:
        "Explore the core concepts behind computers, software and modern digital systems.",
      level: "Beginner",
      lessons: "14 topics",
    },
    {
      id: 6,
      category: "Programming",
      number: "06",
      icon: "JS",
      title: "JavaScript",
      description:
        "Understand JavaScript fundamentals, functions, objects and modern web development.",
      level: "Beginner",
      lessons: "18 topics",
    },
    {
      id: 7,
      category: "Data Science",
      number: "07",
      icon: "∑",
      title: "Statistics",
      description:
        "Build your understanding of probability, statistics and data interpretation.",
      level: "Intermediate",
      lessons: "11 topics",
    },
    {
      id: 8,
      category: "Computer Science",
      number: "08",
      icon: "01",
      title: "Algorithms",
      description:
        "Learn algorithms, complexity and structured approaches to solving problems.",
      level: "Intermediate",
      lessons: "13 topics",
    },
  ];

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesCategory =
        activeCategory === "All" || topic.category === activeCategory;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        topic.title.toLowerCase().includes(searchValue) ||
        topic.description.toLowerCase().includes(searchValue) ||
        topic.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="explore-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="explore-hero">
        <div className="explore-container">
          <div className="explore-hero-content">
            <span className="explore-eyebrow">DISCOVER • LEARN • GROW</span>

            <h1>
              Explore ideas.
              <br />
              <span>Expand your world.</span>
            </h1>

            <p>
              Discover concepts, explore new subjects and let Jigyasa help you
              understand what you're curious about.
            </p>
          </div>

          {/* SEARCH */}

          <div className="explore-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search topics, concepts or subjects..."
              aria-label="Search topics"
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

            <span className="search-shortcut">⌘ K</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY FILTER
      ===================================================== */}

      <section className="explore-filter-section">
        <div className="explore-container">
          <div className="category-scroll">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-button ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="explore-content">
        <div className="explore-container">
          {/* =================================================
              FEATURED
          ================================================= */}

          {activeCategory === "All" && !search && (
            <div className="featured-topic">
              <div className="featured-left">
                <div className="featured-top">
                  <span className="featured-label">FEATURED TOPIC</span>

                  <span className="featured-number">01</span>
                </div>

                <div className="featured-icon">✦</div>

                <h2>
                  Artificial
                  <br />
                  Intelligence
                </h2>

                <p>
                  Start your journey into AI. Understand the fundamental ideas
                  behind intelligent systems and discover how AI is changing the
                  world.
                </p>

                <Link to="/dashboard" className="featured-button">
                  Start exploring
                  <span>→</span>
                </Link>
              </div>

              <div className="featured-right">
                <div className="orbit orbit-one"></div>
                <div className="orbit orbit-two"></div>
                <div className="orbit orbit-three"></div>

                <div className="featured-center">
                  <span>✦</span>
                  <small>AI</small>
                </div>

                <div className="floating-node node-one">ML</div>

                <div className="floating-node node-two">NLP</div>

                <div className="floating-node node-three">CV</div>

                <div className="floating-node node-four">GEN AI</div>
              </div>
            </div>
          )}

          {/* =================================================
              TOPIC HEADER
          ================================================= */}

          <div className="topics-header">
            <div>
              <span className="explore-section-label">
                {activeCategory === "All"
                  ? "ALL TOPICS"
                  : activeCategory.toUpperCase()}
              </span>

              <h2>{search ? `Results for "${search}"` : "Keep exploring"}</h2>
            </div>

            <span className="topic-count">
              {filteredTopics.length}{" "}
              {filteredTopics.length === 1 ? "topic" : "topics"}
            </span>
          </div>

          {/* =================================================
              TOPIC GRID
          ================================================= */}

          {filteredTopics.length > 0 ? (
            <div className="topics-grid">
              {filteredTopics.map((topic) => (
                <article
                  key={topic.id}
                  className={`explore-topic-card ${
                    topic.featured ? "topic-featured-card" : ""
                  }`}
                >
                  <div className="topic-card-top">
                    <div className="topic-card-icon">{topic.icon}</div>

                    <span className="topic-card-number">{topic.number}</span>
                  </div>

                  <div className="topic-card-content">
                    <span className="topic-category">{topic.category}</span>

                    <h3>{topic.title}</h3>

                    <p>{topic.description}</p>
                  </div>

                  <div className="topic-card-bottom">
                    <div className="topic-meta">
                      <span>{topic.level}</span>

                      <span>{topic.lessons}</span>
                    </div>

                    <Link
                      to="/dashboard"
                      className="topic-arrow"
                      aria-label={`Explore ${topic.title}`}
                    >
                      →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* =================================================
               EMPTY SEARCH STATE
            ================================================= */

            <div className="explore-empty">
              <div className="empty-icon">?</div>

              <h3>No topics found</h3>

              <p>
                Try searching for another topic or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                View all topics
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          AI CTA
      ===================================================== */}

      <section className="explore-ai-cta">
        <div className="explore-container">
          <div className="explore-ai-card">
            <div className="explore-ai-content">
              <span className="explore-eyebrow">CAN'T FIND WHAT YOU NEED?</span>

              <h2>Just ask Jigyasa.</h2>

              <p>
                Don't know where to start? Ask your question and let Jigyasa
                guide you to the right topic.
              </p>

              <Link to="/dashboard" className="explore-ai-button">
                Ask Jigyasa AI
                <span>→</span>
              </Link>
            </div>

            <div className="explore-ai-symbol">
              <div className="ai-glow"></div>

              <div className="ai-symbol-core">✦</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Explore;

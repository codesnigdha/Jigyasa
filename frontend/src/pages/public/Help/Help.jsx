import { useState } from "react";
import { Link } from "react-router-dom";

import "./Help.css";

function Help() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState("");

  const categories = [
    {
      name: "General",
      icon: "✦",
    },
    {
      name: "Account",
      icon: "◎",
    },
    {
      name: "Learning",
      icon: "◇",
    },
    {
      name: "AI Assistant",
      icon: "✧",
    },
  ];

  const faqs = [
    {
      category: "General",
      question: "What is Jigyasa?",
      answer:
        "Jigyasa is an AI-powered learning platform designed to help you explore concepts, understand difficult topics and learn at your own pace.",
    },
    {
      category: "General",
      question: "Is Jigyasa free to use?",
      answer:
        "Jigyasa is designed to provide accessible learning assistance. Some features may depend on the version or configuration of the platform.",
    },
    {
      category: "Account",
      question: "How do I create an account?",
      answer:
        "Click the Sign Up option in the navigation bar and provide the required information. After registration, you can log in and access your learning dashboard.",
    },
    {
      category: "Account",
      question: "I forgot my password. What should I do?",
      answer:
        "Use the password recovery option on the login page if it is available for your account. You should always use a strong and unique password.",
    },
    {
      category: "Learning",
      question: "How can I start learning?",
      answer:
        "You can explore topics from the Explore page or go directly to your dashboard and ask Jigyasa AI about a concept you want to understand.",
    },
    {
      category: "Learning",
      question: "Can I ask questions about different subjects?",
      answer:
        "Yes. You can ask questions across a wide range of learning topics. For the best results, describe your question clearly and provide relevant context.",
    },
    {
      category: "AI Assistant",
      question: "How does Jigyasa AI help me?",
      answer:
        "Jigyasa AI can explain concepts, answer questions, simplify difficult ideas and guide your learning through interactive conversations.",
    },
    {
      category: "AI Assistant",
      question: "What should I ask Jigyasa AI?",
      answer:
        "You can ask it to explain a concept, give examples, compare two ideas, simplify a topic or help you understand a difficult subject.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = faq.category === activeCategory;

    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      faq.question.toLowerCase().includes(searchValue) ||
      faq.answer.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="help-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="help-hero">
        <div className="help-container">
          <div className="help-hero-content">
            <span className="help-eyebrow">SUPPORT CENTER</span>

            <h1>
              How can we
              <span> help?</span>
            </h1>

            <p>
              Find answers, learn how Jigyasa works or ask Jigyasa AI for help
              with your learning journey.
            </p>
          </div>

          {/* SEARCH */}

          <div className="help-search">
            <span className="help-search-icon">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for answers..."
              aria-label="Search help"
            />

            {search && (
              <button
                type="button"
                className="help-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          HELP CONTENT
      ===================================================== */}

      <section className="help-content">
        <div className="help-container">
          {/* =================================================
              CATEGORY CARDS
          ================================================= */}

          <div className="help-category-grid">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                className={`help-category-card ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                  setOpenFaq(null);
                }}
              >
                <span className="help-category-icon">{category.icon}</span>

                <span className="help-category-name">{category.name}</span>

                <span className="help-category-arrow">→</span>
              </button>
            ))}
          </div>

          {/* =================================================
              FAQ SECTION
          ================================================= */}

          <div className="faq-section">
            <div className="faq-heading">
              <div>
                <span className="help-section-label">
                  FREQUENTLY ASKED QUESTIONS
                </span>

                <h2>
                  {search ? `Search results` : `${activeCategory} questions`}
                </h2>
              </div>

              <span className="faq-count">
                {filteredFaqs.length}{" "}
                {filteredFaqs.length === 1 ? "question" : "questions"}
              </span>
            </div>

            {/* FAQ LIST */}

            {filteredFaqs.length > 0 ? (
              <div className="faq-list">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className={`faq-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-question-text">
                          {faq.question}
                        </span>

                        <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                      </button>

                      <div className={`faq-answer ${isOpen ? "show" : ""}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="help-empty">
                <div className="help-empty-icon">?</div>

                <h3>No answers found</h3>

                <p>Try using different keywords or ask Jigyasa AI directly.</p>

                <button type="button" onClick={() => setSearch("")}>
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              AI HELP CARD
          ================================================= */}

          <section className="help-ai-card">
            <div className="help-ai-content">
              <span className="help-eyebrow">STILL NEED HELP?</span>

              <h2>Ask Jigyasa AI.</h2>

              <p>
                Can't find the answer you're looking for? Ask your question
                directly and let Jigyasa help you understand it.
              </p>

              <Link to="/dashboard" className="help-ai-button">
                Ask Jigyasa
                <span>→</span>
              </Link>
            </div>

            <div className="help-ai-visual">
              <div className="help-orbit orbit-a"></div>

              <div className="help-orbit orbit-b"></div>

              <div className="help-ai-core">✦</div>
            </div>
          </section>

          {/* =================================================
              CONTACT
          ================================================= */}

          <section className="contact-section">
            <div className="contact-heading">
              <span className="help-section-label">CONTACT</span>

              <h2>We're here to help.</h2>

              <p>
                If you have a technical issue or need additional assistance,
                reach out to us.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">@</div>

                <div>
                  <span>EMAIL</span>

                  <h3>support@jigyasa.com</h3>

                  <p>Send us your questions or feedback.</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">?</div>

                <div>
                  <span>QUICK HELP</span>

                  <h3>Ask Jigyasa AI</h3>

                  <p>Get immediate assistance with learning.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Help;

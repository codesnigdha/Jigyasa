import "./Features.css";

function Features() {
  const features = [
    {
      id: "01",
      icon: "✦",
      title: "AI Learning Assistant",
      description:
        "Ask questions and get clear, easy-to-understand explanations with Jigyasa AI.",
    },
    {
      id: "02",
      icon: "◇",
      title: "Explore Topics",
      description:
        "Discover different subjects and explore concepts that match your learning interests.",
    },
    {
      id: "03",
      icon: "◎",
      title: "Personalized Learning",
      description:
        "Learn at your own pace with guidance designed around your questions and learning needs.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {/* =================================================
            SECTION HEADING
        ================================================= */}

        <div className="features-heading">
          <span className="features-label">WHY JIGYASA</span>

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

        {/* =================================================
            FEATURES
        ================================================= */}

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.id}>
              <div className="feature-top">
                <div className="feature-icon">{feature.icon}</div>

                <span className="feature-number">{feature.id}</span>
              </div>

              <div className="feature-content">
                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>

              <div className="feature-arrow">→</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

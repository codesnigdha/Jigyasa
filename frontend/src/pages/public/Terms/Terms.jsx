import { Link } from "react-router-dom";
import "./Terms.css";

function Terms() {
  return (
    <main className="terms-page">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="terms-hero">
        <div className="terms-container">
          <span className="terms-eyebrow">TERMS & CONDITIONS</span>

          <h1>
            Terms of
            <span> use.</span>
          </h1>

          <p>
            Please read these terms carefully before using Jigyasa. By accessing
            or using the platform, you agree to follow these terms.
          </p>

          <div className="terms-updated">Last updated: August 2026</div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <section className="terms-content-section">
        <div className="terms-container terms-layout">
          {/* SIDEBAR */}
          <aside className="terms-sidebar">
            <span>ON THIS PAGE</span>

            <a href="#acceptance">Acceptance of Terms</a>
            <a href="#use">Use of Jigyasa</a>
            <a href="#accounts">User Accounts</a>
            <a href="#content">User Content</a>
            <a href="#ai">AI Assistant</a>
            <a href="#intellectual">Intellectual Property</a>
            <a href="#privacy">Privacy</a>
            <a href="#availability">Availability</a>
            <a href="#changes">Changes to Terms</a>
            <a href="#contact">Contact</a>
          </aside>

          {/* MAIN CONTENT */}
          <div className="terms-content">
            <section id="acceptance">
              <span className="terms-number">01</span>
              <h2>Acceptance of Terms</h2>

              <p>
                By accessing or using Jigyasa, you acknowledge that you have
                read, understood and agreed to these Terms and Conditions.
              </p>

              <p>
                If you do not agree with any part of these terms, please do not
                use the platform.
              </p>
            </section>

            <section id="use">
              <span className="terms-number">02</span>
              <h2>Use of Jigyasa</h2>

              <p>
                Jigyasa is an educational platform designed to help users learn,
                explore academic concepts and understand technology-related
                topics.
              </p>

              <p>
                You agree to use Jigyasa only for lawful purposes and not to:
              </p>

              <ul>
                <li>Use the platform for illegal or harmful activities.</li>
                <li>Attempt to gain unauthorized access to the platform.</li>
                <li>
                  Interfere with the operation or security of the service.
                </li>
                <li>Submit content that is abusive, misleading or unlawful.</li>
              </ul>
            </section>

            <section id="accounts">
              <span className="terms-number">03</span>
              <h2>User Accounts</h2>

              <p>
                Some features of Jigyasa may require you to create an account.
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </p>

              <p>
                You are responsible for activities performed through your
                account and should notify us if you believe your account has
                been accessed without authorization.
              </p>
            </section>

            <section id="content">
              <span className="terms-number">04</span>
              <h2>User Content</h2>

              <p>
                You may provide questions, text, documents, images or other
                materials when using Jigyasa's learning features.
              </p>

              <p>
                You remain responsible for the content you submit and must
                ensure that you have the necessary rights to upload or share
                such content.
              </p>
            </section>

            <section id="ai">
              <span className="terms-number">05</span>
              <h2>AI Assistant</h2>

              <p>
                Jigyasa uses artificial intelligence to generate educational
                explanations, summaries and other responses.
              </p>

              <div className="terms-note">
                <strong>Important:</strong>
                <span>
                  AI-generated responses may contain inaccuracies. Always verify
                  important information using reliable sources, especially for
                  academic, technical, legal, financial or other important
                  decisions.
                </span>
              </div>

              <p>
                Jigyasa is intended as a learning aid and should not be
                considered a substitute for professional advice or authoritative
                educational resources.
              </p>
            </section>

            <section id="intellectual">
              <span className="terms-number">06</span>
              <h2>Intellectual Property</h2>

              <p>
                The Jigyasa name, logo, interface, design and original platform
                content are owned by Jigyasa or its respective licensors.
              </p>

              <p>
                You may not reproduce, modify, distribute or commercially
                exploit platform materials without appropriate permission.
              </p>
            </section>

            <section id="privacy">
              <span className="terms-number">07</span>
              <h2>Privacy</h2>

              <p>
                Your use of Jigyasa is also subject to our Privacy Policy, which
                explains how information may be collected, used and protected.
              </p>

              <Link to="/privacy" className="terms-inline-link">
                Read our Privacy Policy →
              </Link>
            </section>

            <section id="availability">
              <span className="terms-number">08</span>
              <h2>Service Availability</h2>

              <p>
                We aim to keep Jigyasa available and reliable, but we cannot
                guarantee that the platform will always be available without
                interruption.
              </p>

              <p>
                Features may occasionally be modified, updated, temporarily
                unavailable or discontinued.
              </p>
            </section>

            <section id="changes">
              <span className="terms-number">09</span>
              <h2>Changes to These Terms</h2>

              <p>
                We may update these Terms and Conditions when necessary to
                reflect changes to the platform, features or applicable
                requirements.
              </p>

              <p>
                Updated terms will be posted on this page along with the revised
                date.
              </p>
            </section>

            <section id="contact">
              <span className="terms-number">10</span>
              <h2>Contact</h2>

              <p>
                If you have questions about these Terms and Conditions, you can
                contact the Jigyasa team.
              </p>

              <a
                href="mailto:hello@jigyasa.com"
                className="terms-contact-button"
              >
                Contact Jigyasa
                <span>→</span>
              </a>
            </section>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="terms-cta">
        <div className="terms-container">
          <div className="terms-cta-card">
            <span className="terms-eyebrow">KEEP LEARNING</span>

            <h2>
              Learn with
              <span> curiosity.</span>
            </h2>

            <p>
              Explore topics, ask questions and continue your learning journey
              with Jigyasa.
            </p>

            <Link to="/explore" className="terms-cta-button">
              Explore Jigyasa
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Terms;

import { Link } from "react-router-dom";

import "./Privacy.css";

function Privacy() {
  return (
    <main className="privacy-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="privacy-hero">
        <div className="privacy-container">
          <span className="privacy-eyebrow">PRIVACY POLICY</span>

          <h1>
            Your privacy
            <span> matters.</span>
          </h1>

          <p>
            This Privacy Policy explains how Jigyasa handles information when
            you use our AI-powered learning platform.
          </p>

          <div className="privacy-updated">Last updated: August 2026</div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="privacy-content-section">
        <div className="privacy-container privacy-layout">
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="privacy-sidebar">
            <span>ON THIS PAGE</span>

            <a href="#information">Information We Collect</a>
            <a href="#usage">How We Use Information</a>
            <a href="#ai">AI & Conversations</a>
            <a href="#accounts">Account Information</a>
            <a href="#cookies">Cookies & Storage</a>
            <a href="#security">Data Security</a>
            <a href="#third-party">Third-Party Services</a>
            <a href="#children">Children's Privacy</a>
            <a href="#changes">Changes to Policy</a>
            <a href="#contact">Contact Us</a>
          </aside>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="privacy-content">
            {/* 01 */}

            <section id="information">
              <span className="privacy-number">01</span>

              <h2>Information We Collect</h2>

              <p>
                When you use Jigyasa, we may collect information that you
                voluntarily provide, such as your name, email address and
                account credentials.
              </p>

              <p>
                We may also collect information about how you interact with the
                platform, such as pages visited, features used and general usage
                information.
              </p>
            </section>

            {/* 02 */}

            <section id="usage">
              <span className="privacy-number">02</span>

              <h2>How We Use Information</h2>

              <p>
                Information collected through Jigyasa may be used to provide,
                maintain and improve the platform and its learning features.
              </p>

              <ul>
                <li>Provide access to your Jigyasa account.</li>

                <li>
                  Improve the learning experience and platform functionality.
                </li>

                <li>Respond to support requests and user inquiries.</li>

                <li>Maintain platform security and reliability.</li>
              </ul>
            </section>

            {/* 03 */}

            <section id="ai">
              <span className="privacy-number">03</span>

              <h2>AI & Conversations</h2>

              <p>
                Jigyasa provides AI-powered educational assistance. Questions
                and messages submitted to the AI assistant may be processed in
                order to generate responses and provide the requested learning
                assistance.
              </p>

              <div className="privacy-note">
                <strong>Important</strong>

                <span>
                  Avoid submitting passwords, payment information or other
                  highly sensitive personal information into AI conversations.
                </span>
              </div>

              <p>
                AI-generated responses are intended to support learning and may
                not always be accurate. Important information should be verified
                using reliable sources.
              </p>
            </section>

            {/* 04 */}

            <section id="accounts">
              <span className="privacy-number">04</span>

              <h2>Account Information</h2>

              <p>
                If you create a Jigyasa account, certain information is required
                to create and maintain that account.
              </p>

              <p>
                You are responsible for keeping your login credentials
                confidential and should contact us if you believe your account
                has been accessed without authorization.
              </p>
            </section>

            {/* 05 */}

            <section id="cookies">
              <span className="privacy-number">05</span>

              <h2>Cookies & Local Storage</h2>

              <p>
                Jigyasa may use browser storage technologies such as local
                storage or cookies to support functionality such as
                authentication, preferences and application state.
              </p>

              <p>
                These technologies help the platform remember information
                between sessions and provide a smoother experience.
              </p>
            </section>

            {/* 06 */}

            <section id="security">
              <span className="privacy-number">06</span>

              <h2>Data Security</h2>

              <p>
                We take reasonable measures to protect information associated
                with the platform and reduce the risk of unauthorized access,
                alteration or disclosure.
              </p>

              <p>
                However, no internet-based service can guarantee absolute
                security.
              </p>
            </section>

            {/* 07 */}

            <section id="third-party">
              <span className="privacy-number">07</span>

              <h2>Third-Party Services</h2>

              <p>
                Jigyasa may use third-party technologies and services to provide
                functionality such as authentication, AI processing, hosting,
                analytics or other platform features.
              </p>

              <p>
                Information processed by such services may be subject to their
                respective privacy policies and terms.
              </p>
            </section>

            {/* 08 */}

            <section id="children">
              <span className="privacy-number">08</span>

              <h2>Children's Privacy</h2>

              <p>
                Jigyasa is intended to provide educational assistance to
                learners. Users should provide information appropriate for their
                age and circumstances.
              </p>

              <p>
                If you believe that personal information belonging to a child
                has been provided to the platform improperly, please contact us
                so that the matter can be reviewed.
              </p>
            </section>

            {/* 09 */}

            <section id="changes">
              <span className="privacy-number">09</span>

              <h2>Changes to This Policy</h2>

              <p>
                We may update this Privacy Policy when changes are made to
                Jigyasa, its features or the way information is handled.
              </p>

              <p>
                Any updated version will be made available on this page along
                with the revised date.
              </p>
            </section>

            {/* 10 */}

            <section id="contact">
              <span className="privacy-number">10</span>

              <h2>Contact Us</h2>

              <p>
                If you have questions or concerns about this Privacy Policy, you
                can contact the Jigyasa team.
              </p>

              <a
                href="mailto:hello@jigyasa.com"
                className="privacy-contact-button"
              >
                Contact Jigyasa
                <span>→</span>
              </a>
            </section>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="privacy-cta">
        <div className="privacy-container">
          <div className="privacy-cta-card">
            <span className="privacy-eyebrow">LEARN WITH CONFIDENCE</span>

            <h2>
              Your curiosity
              <span> starts here.</span>
            </h2>

            <p>
              Explore topics, ask questions and continue your learning journey
              with Jigyasa.
            </p>

            <Link to="/explore" className="privacy-cta-button">
              Explore Jigyasa
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Privacy;

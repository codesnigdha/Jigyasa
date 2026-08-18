import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // =========================================================
  // UI STATE
  // =========================================================

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =========================================================
  // HANDLE LOGIN
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    // -------------------------------------------------------
    // BASIC VALIDATION
    // -------------------------------------------------------

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // -----------------------------------------------------
      // LOGIN API
      // -----------------------------------------------------

      const data = await loginUser({
        email,
        password,
      });

      // -----------------------------------------------------
      // SAVE ACCESS TOKEN
      // -----------------------------------------------------

      localStorage.setItem("access_token", data.access_token);

      // -----------------------------------------------------
      // SAVE USER
      // -----------------------------------------------------

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // -----------------------------------------------------
      // REDIRECT
      // -----------------------------------------------------

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (error.response?.status === 422) {
        setError("Please enter valid login details.");
      } else if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="login-page">
      {/* =====================================================
          LEFT BRANDING SECTION
      ===================================================== */}

      <section className="login-brand-section">
        {/* Decorative background */}
        <div className="login-grid-pattern"></div>

        <div className="login-brand-content">
          {/* =================================================
              LOGO
          ================================================= */}

          <button
            type="button"
            className="login-logo"
            onClick={() => navigate("/")}
            aria-label="Go to Jigyasa home"
          >
            <div className="login-logo-icon">J</div>

            <div className="login-logo-text">
              <strong>JIGYASA</strong>

              <span>AI-POWERED LEARNING</span>
            </div>
          </button>

          {/* =================================================
              BRANDING CONTENT
          ================================================= */}

          <div className="login-brand-main">
            <span className="login-brand-eyebrow">WELCOME BACK</span>

            <h2>
              Continue Your
              <br />
              <span>Learning Journey.</span>
            </h2>

            <p>
              Sign in to Jigyasa and continue exploring knowledge, building
              skills, and growing every day.
            </p>

            {/* =================================================
                FEATURES
            ================================================= */}

            <div className="login-features">
              <div className="login-feature">
                <div className="feature-icon">✦</div>

                <span>Personalized learning experience</span>
              </div>

              <div className="login-feature">
                <div className="feature-icon">◈</div>

                <span>AI-powered learning assistance</span>
              </div>

              <div className="login-feature">
                <div className="feature-icon">✓</div>

                <span>Track your learning progress</span>
              </div>
            </div>
          </div>

          {/* =================================================
              BRAND FOOTER
          ================================================= */}

          <div className="login-brand-footer">
            <span>JIGYASA</span>

            <span>Learn beyond boundaries.</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          RIGHT AUTHENTICATION SECTION
      ===================================================== */}

      <section className="login-auth-section">
        {/* =================================================
            THEME TOGGLE
        ================================================= */}

        <div className="login-theme-toggle">
          <ThemeToggle />
        </div>

        {/* =================================================
            AUTH CONTAINER
        ================================================= */}

        <div className="login-auth-container">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="login-header">
            <span className="auth-eyebrow">SIGN IN</span>

            <h1>Welcome back</h1>

            <p>Enter your details to continue your Jigyasa journey.</p>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form className="login-form" onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="auth-form-group">
              <div className="password-row">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError("Password recovery will be available soon.")
                  }
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                required
              />
            </div>

            {/* ERROR */}

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>

                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>

                  <span className="button-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* =================================================
              SIGNUP
          ================================================= */}

          <div className="auth-switch">
            <span>Don't have an account?</span>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              disabled={loading}
            >
              Create an account
            </button>
          </div>

          {/* =================================================
              BACK HOME
          ================================================= */}

          <button
            type="button"
            className="back-home"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            <span>←</span>

            <span>Back to Home</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;

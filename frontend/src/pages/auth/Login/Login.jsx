import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

import { loginUser } from "../../../services/authService";

import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";

import "./Login.css";

/* =====================================================
   EYE ICON
===================================================== */

function EyeIcon({ off = false }) {
  if (off) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="password-eye-icon">
        <path
          d="M3 3l18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M9.88 4.24A9.77 9.77 0 0 1 12 4c5 0 8.27 4.11 9 8-.32.83-1.14 2.22-2.67 3.57"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M6.61 6.61C4.65 7.89 3.4 9.75 3 12c.73 1.89 4 6 9 6 1.25 0 2.4-.25 3.42-.67"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="password-eye-icon">
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

/* =====================================================
   LOGIN
===================================================== */

function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { isDark } = useTheme();

  /* =====================================================
     FORM
  ===================================================== */

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* =====================================================
     UI STATE
  ===================================================== */

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    /* =================================================
       VALIDATION
    ================================================= */

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
      /*
       * IMPORTANT:
       * We directly use the existing backend API service.
       *
       * The backend manages authentication/session.
       */
      const data = await loginUser({
        email,
        password,
      });

      /*
       * Backend response contains user.
       */
      const loggedInUser = data?.user || data?.data?.user || null;

      if (!loggedInUser) {
        throw new Error(
          "Login succeeded but user information was not returned.",
        );
      }

      /*
       * Update AuthContext.
       */
      setUser(loggedInUser);

      /*
       * Dashboard.
       */
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (error.response?.status === 400) {
        setError(error.response?.data?.detail || "Invalid email or password.");
      } else if (error.response?.status === 422) {
        setError("Please enter valid login details.");
      } else if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className={`login-page ${isDark ? "dark-mode" : "light-mode"}`}>
      {/* =================================================
          LEFT BRANDING
      ================================================= */}

      <section className="login-brand-section">
        <div className="login-grid-pattern"></div>

        <div className="login-brand-content">
          {/* LOGO */}

          <button
            type="button"
            className="login-logo"
            onClick={() => navigate("/")}
            aria-label="Go to Jigyasa home"
          >
            <img src="/logo.png" alt="Jigyasa" className="login-logo-image" />
          </button>

          {/* BRAND CONTENT */}

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

          {/* BRAND FOOTER */}

          <div className="login-brand-footer">
            <span>JIGYASA</span>

            <span>Learn beyond boundaries.</span>
          </div>
        </div>
      </section>

      {/* =================================================
          RIGHT AUTH
      ================================================= */}

      <section className="login-auth-section">
        {/* THEME */}

        <div className="login-theme-toggle">
          <ThemeToggle />
        </div>

        <div className="login-auth-container">
          {/* HEADER */}

          <div className="login-header">
            <span className="auth-eyebrow">SIGN IN</span>

            <h1>Welcome back</h1>

            <p>Enter your details to continue your Jigyasa journey.</p>
          </div>

          {/* FORM */}

          <form className="login-form" onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="auth-form-group">
              <label htmlFor="login-email">Email Address</label>

              <input
                id="login-email"
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
                <label htmlFor="login-password">Password</label>

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

              <div className="password-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="password-eye-button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="auth-error" role="alert">
                <span>!</span>
                <span>{error}</span>
              </div>
            )}

            {/* SUBMIT */}

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

          {/* SIGNUP */}

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

          {/* HOME */}

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

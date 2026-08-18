import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  // =========================================================
  // UI STATE
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =========================================================
  // PASSWORD RULES
  // =========================================================

  const passwordRules = {
    minLength: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special;

  // =========================================================
  // PASSWORD STRENGTH
  // =========================================================

  const getPasswordStrength = () => {
    if (!formData.password) {
      return {
        score: 0,
        label: "",
        percentage: 0,
      };
    }

    let score = 0;

    if (passwordRules.minLength) score++;
    if (passwordRules.uppercase) score++;
    if (passwordRules.lowercase) score++;
    if (passwordRules.number) score++;
    if (passwordRules.special) score++;

    if (score <= 2) {
      return {
        score,
        label: "Weak",
        percentage: 40,
      };
    }

    if (score <= 4) {
      return {
        score,
        label: "Good",
        percentage: 70,
      };
    }

    return {
      score,
      label: "Strong",
      percentage: 100,
    };
  };

  const passwordStrength = getPasswordStrength();

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =========================================================
  // HANDLE SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const role = formData.role;

    // =======================================================
    // NAME VALIDATION
    // =======================================================

    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (name.length < 2) {
      setError("Full name must contain at least 2 characters.");
      return;
    }

    // =======================================================
    // EMAIL VALIDATION
    // =======================================================

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // =======================================================
    // PASSWORD VALIDATION
    // =======================================================

    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (!isPasswordValid) {
      setError(
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.",
      );
      return;
    }

    // =======================================================
    // CONFIRM PASSWORD
    // =======================================================

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // =======================================================
    // START LOADING
    // =======================================================

    setLoading(true);

    // =======================================================
    // REGISTER USER
    // =======================================================

    try {
      await registerUser({
        name,
        email,
        password,
        role,
      });

      setSuccess("Account created successfully! Redirecting you to login...");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
      });

      setShowPassword(false);
      setShowConfirmPassword(false);

      // Redirect
      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.status === 400) {
        setError(
          error.response?.data?.detail ||
            "An account with this email already exists.",
        );
      } else if (error.response?.status === 422) {
        setError("Please check your registration details.");
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
  // EYE ICON
  // =========================================================

  const EyeIcon = ({ off = false }) => {
    if (off) {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
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
            d="M9.88 4.24A9.77 9.77 0 0 1 12 4c5 0 8.27 4.11 9 6-.32.83-1.14 2.22-2.67 3.57"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M6.61 6.61C4.65 7.89 3.4 9.75 3 10c.73 1.89 4 6 9 6 1.25 0 2.4-.25 3.42-.67"
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
      <svg viewBox="0 0 24 24" aria-hidden="true">
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
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className={`signup-page ${isDark ? "dark-mode" : "light-mode"}`}>
      {/* =====================================================
          LEFT — AUTHENTICATION
      ===================================================== */}

      <section className="signup-auth-section">
        {/* Theme Toggle */}

        <div className="signup-theme-toggle">
          <ThemeToggle />
        </div>

        <div className="signup-auth-container">
          {/* HEADER */}

          <div className="signup-header">
            <span className="signup-eyebrow">CREATE ACCOUNT</span>

            <h1>Join Jigyasa</h1>

            <p>Create your account and start your learning journey.</p>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* =================================================
                FULL NAME
            ================================================= */}

            <div className="signup-form-group">
              <label htmlFor="name">Full Name</label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={loading}
                required
              />
            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="signup-form-group">
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

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="signup-form-group password-group">
              <label htmlFor="password">Password</label>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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

              {/* =================================================
                  PASSWORD STRENGTH
              ================================================= */}

              {formData.password && (
                <div className="password-strength">
                  <div className="password-strength-header">
                    <span>Password strength</span>

                    <span
                      className={`password-strength-label ${passwordStrength.label.toLowerCase()}`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>

                  <div className="password-strength-bar">
                    <div
                      className={`password-strength-fill ${passwordStrength.label.toLowerCase()}`}
                      style={{
                        width: `${passwordStrength.percentage}%`,
                      }}
                    />
                  </div>

                  {/* REQUIREMENTS */}

                  <div className="password-requirements">
                    <div
                      className={
                        passwordRules.minLength
                          ? "password-requirement valid"
                          : "password-requirement"
                      }
                    >
                      <span>{passwordRules.minLength ? "✓" : "○"}</span>

                      <span>At least 8 characters</span>
                    </div>

                    <div
                      className={
                        passwordRules.uppercase
                          ? "password-requirement valid"
                          : "password-requirement"
                      }
                    >
                      <span>{passwordRules.uppercase ? "✓" : "○"}</span>

                      <span>One uppercase letter</span>
                    </div>

                    <div
                      className={
                        passwordRules.lowercase
                          ? "password-requirement valid"
                          : "password-requirement"
                      }
                    >
                      <span>{passwordRules.lowercase ? "✓" : "○"}</span>

                      <span>One lowercase letter</span>
                    </div>

                    <div
                      className={
                        passwordRules.number
                          ? "password-requirement valid"
                          : "password-requirement"
                      }
                    >
                      <span>{passwordRules.number ? "✓" : "○"}</span>

                      <span>One number</span>
                    </div>

                    <div
                      className={
                        passwordRules.special
                          ? "password-requirement valid"
                          : "password-requirement"
                      }
                    >
                      <span>{passwordRules.special ? "✓" : "○"}</span>

                      <span>One special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="signup-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="password-eye-button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  disabled={loading}
                >
                  <EyeIcon off={showConfirmPassword} />
                </button>
              </div>

              {/* PASSWORD MATCH */}

              {formData.confirmPassword && (
                <div
                  className={
                    formData.password === formData.confirmPassword
                      ? "password-match valid"
                      : "password-match invalid"
                  }
                >
                  {formData.password === formData.confirmPassword
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </div>
              )}
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="signup-message signup-error" role="alert">
                <span className="message-icon">!</span>

                <span>{error}</span>
              </div>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <div className="signup-message signup-success" role="status">
                <span className="message-icon">✓</span>

                <span>{success}</span>
              </div>
            )}

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              className="signup-submit-button"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="signup-spinner"></span>

                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>

                  <span className="signup-button-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="signup-auth-switch">
            <span>Already have an account?</span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Sign In
            </button>
          </div>

          {/* =================================================
              HOME
          ================================================= */}

          <button
            type="button"
            className="signup-back-home"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            <span>←</span>

            <span>Back to Home</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          RIGHT — BRANDING
      ===================================================== */}

      <section className="signup-brand-section">
        <div className="signup-grid-pattern"></div>

        <div className="signup-brand-content">
          {/* LOGO */}

          <button
            type="button"
            className="signup-logo"
            onClick={() => navigate("/")}
            aria-label="Go to Jigyasa home"
          >
            <div className="signup-logo-icon">J</div>

            <div className="signup-logo-text">
              <strong>JIGYASA</strong>

              <span>AI-POWERED LEARNING</span>
            </div>
          </button>

          {/* BRAND MESSAGE */}

          <div className="signup-brand-main">
            <span className="signup-brand-eyebrow">START LEARNING</span>

            <h2>
              Begin Your
              <br />
              <span>Learning Journey.</span>
            </h2>

            <p>
              Create your Jigyasa account and unlock a personalized learning
              experience designed to help you explore, learn and grow.
            </p>

            {/* FEATURES */}

            <div className="signup-features">
              <div className="signup-feature">
                <div className="signup-feature-icon">✦</div>

                <span>Personalized learning experience</span>
              </div>

              <div className="signup-feature">
                <div className="signup-feature-icon">◈</div>

                <span>AI-powered learning assistance</span>
              </div>

              <div className="signup-feature">
                <div className="signup-feature-icon">✓</div>

                <span>Track your progress and achievements</span>
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div className="signup-brand-footer">
            <span>JIGYASA</span>

            <span>Learn beyond boundaries.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;

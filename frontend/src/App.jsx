import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FloatingChat from "./components/FloatingChat/FloatingChat";

import Home from "./pages/public/Home/Home";
import Explore from "./pages/public/Explore/Explore";
import About from "./pages/public/About/About";
import Help from "./pages/public/Help/Help";

import Login from "./pages/auth/Login/Login";
import Signup from "./pages/auth/Signup/Signup";

import Dashboard from "./pages/user/Dashboard/Dashboard";
import MultimodalChat from "./pages/MultimodalChat/MultimodalChat";

import "./App.css";

/* =====================================================
   PROTECTED ROUTE
===================================================== */

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  /*
   * Wait until authentication state is loaded.
   */
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner"></div>
      </div>
    );
  }

  /*
   * User is not logged in.
   */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /*
   * User is authenticated.
   */
  return children;
}

/* =====================================================
   404 PAGE
===================================================== */

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>The page you are looking for does not exist.</p>

      <a href="/">← Back to Home</a>
    </div>
  );
}

/* =====================================================
   APP
===================================================== */

function App() {
  const { pathname } = useLocation();

  /*
   * Login and Signup are standalone pages.
   *
   * Therefore:
   * - Navbar hidden
   * - Footer hidden
   * - Floating Chat hidden
   */
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="app">
      {/* =================================================
          GLOBAL NAVBAR
      ================================================= */}

      {!isAuthPage && <Navbar />}

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="app-main">
        <Routes>
          {/* =================================================
              PUBLIC ROUTES
          ================================================= */}

          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/about" element={<About />} />

          <Route path="/help" element={<Help />} />

          {/* =================================================
              AUTH ROUTES
          ================================================= */}

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* =================================================
              PROTECTED DASHBOARD
          ================================================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* =================================================
              MULTIMODAL AI ASSISTANT
          =================================================

              Users must be logged in to use the AI assistant.
          */}

          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <MultimodalChat />
              </ProtectedRoute>
            }
          />

          {/* =================================================
              404
          ================================================= */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* =================================================
          FLOATING AI BUTTON
      ================================================= */}

      {!isAuthPage && <FloatingChat />}

      {/* =================================================
          GLOBAL FOOTER
      ================================================= */}

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;

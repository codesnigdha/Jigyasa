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

  /* ---------------------------------------------------
     Wait for authentication state
  --------------------------------------------------- */

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner"></div>
      </div>
    );
  }

  /* ---------------------------------------------------
     Not authenticated
  --------------------------------------------------- */

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ---------------------------------------------------
     Authenticated
  --------------------------------------------------- */

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

  /* ===================================================
     AUTH PAGES
  =================================================== */

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  /* ===================================================
     AI ASSISTANT PAGE
     
     This page already has its own complete UI,
     therefore FloatingChat and Footer are hidden.
  =================================================== */

  const isAIAssistantPage = pathname === "/ai-assistant";

  /* ===================================================
     NAVBAR
     
     Hide Navbar on:
     - Login
     - Signup
  =================================================== */

  const showNavbar = !isAuthPage;

  /* ===================================================
     FLOATING CHAT
     
     Hide FloatingChat on:
     - Login
     - Signup
     - AI Assistant
  =================================================== */

  const showFloatingChat = !isAuthPage && !isAIAssistantPage;

  /* ===================================================
     FOOTER
     
     Hide Footer on:
     - Login
     - Signup
     - AI Assistant
  =================================================== */

  const showFooter = !isAuthPage && !isAIAssistantPage;

  return (
    <div className="app">
      {/* =================================================
          GLOBAL NAVBAR
      ================================================= */}

      {showNavbar && <Navbar />}

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
              
              /dashboard
              ↓
              ProtectedRoute
              ↓
              Logged in → Dashboard
              Not logged in → Login
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
              PROTECTED AI ASSISTANT
              
              /ai-assistant
              ↓
              ProtectedRoute
              ↓
              Logged in → AI Assistant
              Not logged in → Login
          ================================================= */}

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
          FLOATING JIGYASA AI
          
          Appears on:
          - Home
          - Explore
          - About
          - Help
          - Dashboard
          
          Hidden on:
          - Login
          - Signup
          - AI Assistant
      ================================================= */}

      {showFloatingChat && <FloatingChat />}

      {/* =================================================
          GLOBAL FOOTER
      ================================================= */}

      {showFooter && <Footer />}
    </div>
  );
}

export default App;

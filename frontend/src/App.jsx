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

import "./App.css";

/* =====================================================
   PROTECTED ROUTE
===================================================== */

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =====================================================
   404
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
   * No Navbar / Footer / FloatingChat.
   */
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="app">
      {/* NAVBAR */}

      {!isAuthPage && <Navbar />}

      {/* MAIN */}

      <main className="app-main">
        <Routes>
          {/* PUBLIC */}

          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/about" element={<About />} />

          <Route path="/help" element={<Help />} />

          {/* AUTH */}

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* FLOATING CHAT */}

      {!isAuthPage && <FloatingChat />}

      {/* FOOTER */}

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;

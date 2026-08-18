import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  if (loading) {
    return <div className="dashboard-loading">Loading your dashboard...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="dashboard-eyebrow">YOUR DASHBOARD</span>

          <h1>Welcome, {user.name}.</h1>

          <p>
            Continue learning, explore new topics and let Jigyasa help you learn
            smarter.
          </p>
        </div>

        <div className="dashboard-user-card">
          <div className="dashboard-avatar">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <strong>{user.name}</strong>

            <span>{user.email}</span>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <article
          className="dashboard-card"
          onClick={() => navigate("/explore")}
        >
          <span className="dashboard-card-icon">✦</span>

          <h2>Explore</h2>

          <p>Discover learning resources and new topics.</p>

          <span className="dashboard-card-link">Explore →</span>
        </article>

        <article className="dashboard-card">
          <span className="dashboard-card-icon">◈</span>

          <h2>AI Assistant</h2>

          <p>Ask questions and get AI-powered learning assistance.</p>

          <span className="dashboard-card-link">Ask AI →</span>
        </article>

        <article
          className="dashboard-card"
          onClick={() => navigate("/profile")}
        >
          <span className="dashboard-card-icon">○</span>

          <h2>My Profile</h2>

          <p>View and manage your account information.</p>

          <span className="dashboard-card-link">View Profile →</span>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;

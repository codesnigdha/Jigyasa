import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/public/Home/Home";
import Login from "./pages/auth/Login/Login";
import Signup from "./pages/auth/Signup/Signup";
import Dashboard from "./pages/user/Dashboard/Dashboard";

import "./App.css";

function App() {
  const { pathname } = useLocation();
  const isStandalonePage = ["/", "/login", "/signup"].includes(pathname);

  return (
    <div className="app">
      {!isStandalonePage && <Navbar />}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {!isStandalonePage && <Footer />}
    </div>
  );
}

export default App;

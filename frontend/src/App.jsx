import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Temporary dashboard route */}
        <Route
          path="/dashboard"
          element={
            <div style={{ padding: "50px" }}>Dashboard coming next...</div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

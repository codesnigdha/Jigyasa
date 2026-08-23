import { useState } from "react";
import { useLocation } from "react-router-dom";

import AIChatBox from "../AI/AIChatBox/AIChatBox";

import "./FloatingChat.css";

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  // Pages where floating chat should NOT appear
  const hiddenPages = ["/login", "/signup", "/dashboard", "/ai-assistant"];

  // Hide FloatingChat on selected pages
  if (hiddenPages.includes(pathname)) {
    return null;
  }

  const toggleChat = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <div className="floating-chat">
      {/* =========================================
          FLOATING CHAT WINDOW
      ========================================= */}

      {isOpen && (
        <div className="floating-chat-window">
          {/* TOP BAR */}

          <div className="floating-chat-topbar">
            <div className="floating-chat-brand">
              <div className="floating-chat-icon">
                <img
                  src="/icon.png"
                  alt="Jigyasa AI"
                  className="floating-chat-ai-icon"
                />
              </div>

              <div className="floating-chat-brand-text">
                <strong>Jigyasa AI</strong>
                <span>Your learning assistant</span>
              </div>
            </div>

            <button
              type="button"
              className="floating-chat-close"
              onClick={toggleChat}
              aria-label="Close Jigyasa AI"
            >
              ×
            </button>
          </div>

          {/* ACTUAL WORKING AI CHAT */}

          <div className="floating-chat-content">
            <AIChatBox />
          </div>
        </div>
      )}

      {/* =========================================
          FLOATING BUTTON
      ========================================= */}

      <button
        type="button"
        className={`floating-chat-button ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close Jigyasa AI" : "Open Jigyasa AI"}
        aria-expanded={isOpen}
      >
        <span className="floating-chat-button-icon">
          <img
            src="/icon.png"
            alt="Jigyasa AI"
            className="floating-chat-button-image"
          />
        </span>

        {!isOpen && (
          <span className="floating-chat-button-text">Ask Jigyasa</span>
        )}
      </button>
    </div>
  );
}

export default FloatingChat;

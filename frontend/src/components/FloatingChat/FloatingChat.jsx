import { useState } from "react";
import { useLocation } from "react-router-dom";

import AIChatBox from "../AI/AIChatBox/AIChatBox";

import "./FloatingChat.css";

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  /* =====================================================
     HIDE ON AUTH + DASHBOARD
  ===================================================== */

  const hiddenPages = ["/login", "/signup", "/dashboard"];

  if (hiddenPages.includes(pathname)) {
    return null;
  }

  /* =====================================================
     TOGGLE CHAT
  ===================================================== */

  const toggleChat = () => {
    setIsOpen((previous) => !previous);
  };

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <div className="floating-chat">
      {/* =================================================
          CHAT WINDOW
      ================================================= */}

      {isOpen && (
        <div className="floating-chat-window">
          <div className="floating-chat-topbar">
            <div className="floating-chat-brand">
              <div className="floating-chat-icon">✦</div>

              <div>
                <strong>Jigyasa AI</strong>

                <span>Your learning assistant</span>
              </div>
            </div>

            <button
              type="button"
              className="floating-chat-close"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="floating-chat-content">
            <AIChatBox />
          </div>
        </div>
      )}

      {/* =================================================
          FLOATING BUTTON
      ================================================= */}

      <button
        type="button"
        className={`floating-chat-button ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close Jigyasa AI" : "Open Jigyasa AI"}
        aria-expanded={isOpen}
      >
        <span className="floating-chat-button-icon">{isOpen ? "×" : "✦"}</span>

        {!isOpen && (
          <span className="floating-chat-button-text">Ask Jigyasa</span>
        )}
      </button>
    </div>
  );
}

export default FloatingChat;

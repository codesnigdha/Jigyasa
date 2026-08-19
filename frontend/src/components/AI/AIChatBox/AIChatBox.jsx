import { useRef, useState } from "react";
import { sendMessageToAI } from "../../../services/aiService";

import "./AIChatBox.css";

function AIChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messageId = useRef(0);

  const createMessageId = () => {
    messageId.current += 1;
    return messageId.current;
  };

  /* =====================================================
     SUGGESTED QUESTIONS
  ===================================================== */

  const suggestedQuestions = [
    "Explain artificial intelligence",
    "What is machine learning?",
    "Explain neural networks",
  ];

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = async (messageText = input) => {
    const message = messageText.trim();

    if (!message || loading) {
      return;
    }

    const userMessage = {
      id: createMessageId(),
      role: "user",
      content: message,
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await sendMessageToAI(message);

      const aiMessage = {
        id: createMessageId(),
        role: "assistant",
        content:
          response?.message ||
          response?.response ||
          response?.answer ||
          "Jigyasa AI could not generate a response.",
      };

      setMessages((previousMessages) => [...previousMessages, aiMessage]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      const aiErrorMessage = {
        id: createMessageId(),
        role: "assistant",
        content:
          error?.response?.data?.message ||
          error?.message ||
          "Sorry, I couldn't connect to Jigyasa AI.",
      };

      setMessages((previousMessages) => [...previousMessages, aiErrorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FORM SUBMIT
  ===================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  /* =====================================================
     SUGGESTION
  ===================================================== */

  const handleSuggestion = (question) => {
    sendMessage(question);
  };

  /* =====================================================
     CLEAR CONVERSATION
  ===================================================== */

  const clearConversation = () => {
    setMessages([]);
    setInput("");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="ai-chatbox">
      {/* =================================================
          CHAT BODY
      ================================================= */}

      <div className="ai-chat-body">
        {/* =================================================
            CHAT TOOLBAR
        ================================================= */}

        {messages.length > 0 && (
          <div className="chat-toolbar">
            <div className="chat-toolbar-status">
              <span className="chat-toolbar-dot"></span>
              Conversation
            </div>

            <button
              type="button"
              className="clear-chat-button"
              onClick={clearConversation}
            >
              <span>↻</span>
              New chat
            </button>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {messages.length === 0 ? (
          <div className="ai-empty-state">
            <div className="ai-empty-icon">
              <span>✦</span>
            </div>

            <span className="ai-empty-label">YOUR AI LEARNING COMPANION</span>

            <h2>
              What would you like
              <span> to learn?</span>
            </h2>

            <p>
              Ask questions, break down difficult concepts, or explore something
              completely new. Jigyasa is here to help.
            </p>

            <div className="suggestions-label">TRY ASKING</div>

            <div className="suggested-questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSuggestion(question)}
                  disabled={loading}
                >
                  <span className="suggestion-icon">✦</span>

                  <span className="suggestion-text">{question}</span>

                  <span className="suggestion-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* =================================================
             MESSAGES
          ================================================= */

          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                {/* AI AVATAR */}

                {message.role === "assistant" && (
                  <div className="message-avatar">
                    <span>✦</span>
                  </div>
                )}

                {/* MESSAGE */}

                <div className="message-content">
                  <span className="message-role">
                    {message.role === "user" ? "You" : "Jigyasa AI"}
                  </span>

                  <p>{message.content}</p>
                </div>
              </div>
            ))}

            {/* =================================================
                THINKING
            ================================================= */}

            {loading && (
              <div className="chat-message assistant-message">
                <div className="message-avatar">
                  <span>✦</span>
                </div>

                <div className="message-content">
                  <span className="message-role">Jigyasa AI</span>

                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* =================================================
          INPUT
      ================================================= */}

      <form className="ai-chat-input-area" onSubmit={handleSubmit}>
        <div className="ai-input-wrapper">
          <div className="ai-input-icon">
            <span>✦</span>
          </div>

          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Jigyasa anything..."
            disabled={loading}
            autoComplete="off"
          />

          <button
            type="submit"
            className="send-button"
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <span>→</span>
          </button>
        </div>

        <div className="ai-input-footer">
          <p className="ai-input-note">
            Jigyasa AI may make mistakes. Verify important information.
          </p>

          <span className="keyboard-hint">↵ Send</span>
        </div>
      </form>
    </div>
  );
}

export default AIChatBox;

import { useRef, useState } from "react";
import { sendMessageToAI } from "../../../services/aiService";

import "./AIChatBox.css";

function AIChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // MESSAGE ID
  // =====================================================

  const messageId = useRef(0);

  const createMessageId = () => {
    messageId.current += 1;
    return messageId.current;
  };

  // =====================================================
  // SUGGESTED QUESTIONS
  // =====================================================

  const suggestedQuestions = [
    "Explain artificial intelligence",
    "What is machine learning?",
    "Explain neural networks",
  ];

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async (messageText = input) => {
    const message = messageText.trim();

    if (!message || loading) {
      return;
    }

    // ===================================================
    // USER MESSAGE
    // ===================================================

    const userMessage = {
      id: createMessageId(),
      role: "user",
      content: message,
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);

    setInput("");
    setLoading(true);

    // ===================================================
    // SEND MESSAGE TO FASTAPI
    // ===================================================

    try {
      const response = await sendMessageToAI(message);

      // =================================================
      // AI RESPONSE
      // =================================================

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
        content: error?.message || "Sorry, I couldn't connect to Jigyasa AI.",
      };

      setMessages((previousMessages) => [...previousMessages, aiErrorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage();
  };

  // =====================================================
  // SUGGESTED QUESTION
  // =====================================================

  const handleSuggestion = (question) => {
    sendMessage(question);
  };

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const clearConversation = () => {
    setMessages([]);
    setInput("");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="ai-chatbox">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="ai-chat-header">
        <div className="ai-brand">
          <div className="ai-logo">✦</div>

          <div>
            <h3>Jigyasa AI</h3>

            <div className="ai-online">
              <span></span>
              Online
            </div>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            className="clear-chat-button"
            onClick={clearConversation}
          >
            Clear
          </button>
        )}
      </div>

      {/* =================================================
          CHAT BODY
      ================================================= */}

      <div className="ai-chat-body">
        {messages.length === 0 ? (
          <div className="ai-empty-state">
            <div className="ai-empty-icon">✦</div>

            <h2>Ask Jigyasa anything</h2>

            <p>
              I'm here to help you understand concepts, explore topics and learn
              at your own pace.
            </p>

            <div className="suggested-questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSuggestion(question)}
                >
                  <span>→</span>

                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                {/* =====================================
                    AI AVATAR
                ===================================== */}

                {message.role === "assistant" && (
                  <div className="message-avatar">✦</div>
                )}

                {/* =====================================
                    MESSAGE
                ===================================== */}

                <div className="message-content">
                  <span className="message-role">
                    {message.role === "user" ? "You" : "Jigyasa AI"}
                  </span>

                  <p>{message.content}</p>
                </div>
              </div>
            ))}

            {/* =========================================
                AI THINKING
            ========================================= */}

            {loading && (
              <div className="chat-message assistant-message">
                <div className="message-avatar">✦</div>

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
            →
          </button>
        </div>

        <p className="ai-input-note">
          Jigyasa AI can help explain concepts, answer questions and guide your
          learning.
        </p>
      </form>
    </div>
  );
}

export default AIChatBox;

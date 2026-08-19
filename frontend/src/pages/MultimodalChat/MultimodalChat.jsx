import { useEffect, useRef, useState } from "react";

import {
  ArrowUp,
  Check,
  Copy,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Plus,
  Upload,
  User,
  X,
} from "lucide-react";

import "./MultimodalChat.css";

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.webp,.pdf,.txt,.doc,.docx";

/* =========================================
   QUICK ACTIONS
========================================= */

const QUICK_ACTIONS = [
  {
    icon: FileText,
    title: "Summarize",
    description: "Get a summary of your content",
    prompt:
      "Summarize the uploaded content and give me the most important points.",
  },
  {
    icon: "ai",
    title: "Explain",
    description: "Explain in simple terms",
    prompt: "Explain the uploaded content in simple language.",
  },
  {
    icon: ImageIcon,
    title: "Analyze image",
    description: "Analyze the uploaded image",
    prompt: "Analyze the uploaded image and explain what it contains.",
  },
  {
    icon: Check,
    title: "Key points",
    description: "Extract key points",
    prompt: "Extract the most important information from the uploaded content.",
  },
];

/* =========================================
   JIGYASA AI ICON
========================================= */

function AIIcon({ className = "" }) {
  return (
    <img
      className={`jigyasa-ai-icon ${className}`}
      src="/icon2.png"
      alt="Jigyasa AI"
    />
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

function MultimodalChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const hasConversation = messages.length > 0;

  /* =========================================
     AUTO SCROLL
  ========================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  /* =========================================
     FILE SIZE
  ========================================= */

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* =========================================
     FILE ICON
  ========================================= */

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon size={18} />;
    }

    return <FileText size={18} />;
  };

  /* =========================================
     ADD FILES
  ========================================= */

  const addFiles = (selectedFiles) => {
    const incomingFiles = Array.from(selectedFiles);

    const validFiles = incomingFiles.filter((file) =>
      ACCEPTED_TYPES.includes(file.type),
    );

    const invalidFiles = incomingFiles.filter(
      (file) => !ACCEPTED_TYPES.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      alert(
        "Unsupported file detected. Please upload PDF, DOC, DOCX, TXT, JPG, JPEG, PNG or WEBP files.",
      );
    }

    const preparedFiles = validFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setFiles((previous) => [...previous, ...preparedFiles]);
  };

  const handleFileChange = (event) => {
    if (event.target.files?.length) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  /* =========================================
     REMOVE FILE
  ========================================= */

  const removeFile = (id) => {
    setFiles((previous) => {
      const target = previous.find((file) => file.id === id);

      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }

      return previous.filter((file) => file.id !== id);
    });
  };

  const clearFiles = () => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    setFiles([]);
  };

  /* =========================================
     DRAG & DROP
  ========================================= */

  const handleDrop = (event) => {
    event.preventDefault();

    if (event.dataTransfer.files?.length) {
      addFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /* =========================================
     MOCK AI RESPONSE
  ========================================= */

  const getMockResponse = (question, uploadedFiles) => {
    if (uploadedFiles.length > 0) {
      const names = uploadedFiles.map((file) => file.name).join(", ");

      return `I've received your content.

Uploaded files:
${names}

Your request:
${question || "Analyze the uploaded content."}

The Jigyasa multimodal interface is ready.

The next stage is connecting this interface to Azure AI so Jigyasa can actually analyze the uploaded image, document or text and generate an intelligent response.`;
    }

    return `I received your question:

${question}

The Jigyasa AI interface is working.

The next stage is connecting this interface to Azure AI for the actual AI-generated response.`;
  };

  /* =========================================
     SEND MESSAGE
  ========================================= */

  const sendMessage = (customPrompt = null) => {
    const messageText = (customPrompt !== null ? customPrompt : input).trim();

    if (!messageText && files.length === 0) {
      return;
    }

    const currentFiles = [...files];

    const userMessage = {
      id: Date.now(),
      role: "user",
      content:
        messageText ||
        `Analyze ${currentFiles.length} uploaded ${
          currentFiles.length === 1 ? "file" : "files"
        }.`,
      files: currentFiles,
    };

    setMessages((previous) => [...previous, userMessage]);

    setInput("");
    setFiles([]);
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: getMockResponse(messageText, currentFiles),
      };

      setMessages((previous) => [...previous, assistantMessage]);

      setIsTyping(false);
    }, 1200);
  };

  /* =========================================
     TEXTAREA
  ========================================= */

  const handleInput = (event) => {
    setInput(event.target.value);

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";

      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* =========================================
     NEW CHAT
  ========================================= */

  const clearConversation = () => {
    clearFiles();

    setMessages([]);
    setInput("");
    setIsTyping(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  /* =========================================
     COPY
  ========================================= */

  const copyMessage = async (message) => {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopiedId(message.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      console.error("Unable to copy:", error);
    }
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="multimodal-page">
      <div className="ai-workspace">
        {/* =====================================
            LEFT CHAT PANEL
        ===================================== */}

        <section className="chat-panel">
          {/* CHAT HEADER */}

          <header className="chat-panel-header">
            <div className="chat-brand">
              <div className="chat-brand-icon">
                <AIIcon />
              </div>

              <div>
                <h1>Jigyasa AI</h1>
                <p>Multimodal learning assistant</p>
              </div>
            </div>

            <button
              type="button"
              className="new-chat-button"
              onClick={clearConversation}
            >
              <Plus size={17} />
              <span>New chat</span>
            </button>
          </header>

          {/* CHAT BODY */}

          <div
            className="chat-body"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {!hasConversation ? (
              /* =====================================
                 EMPTY STATE
              ===================================== */

              <div className="empty-state">
                <div className="empty-state-icon">
                  <AIIcon />
                </div>

                <h2>
                  Hello! I'm <span>Jigyasa AI</span>
                </h2>

                <p>Upload anything or ask me a question.</p>

                <p>
                  I can help you analyze, explain, summarize and extract key
                  insights.
                </p>

                <div className="empty-hint">
                  <AIIcon />

                  <span>
                    Try asking me something or upload a file to get started!
                  </span>
                </div>
              </div>
            ) : (
              /* =====================================
                 MESSAGES
              ===================================== */

              <div className="messages-container">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-row ${message.role}`}
                  >
                    {/* MESSAGE AVATAR */}

                    <div className="message-avatar">
                      {message.role === "assistant" ? (
                        <AIIcon />
                      ) : (
                        <User size={16} />
                      )}
                    </div>

                    <div className="message-content">
                      <div className="message-author">
                        {message.role === "assistant" ? "Jigyasa AI" : "You"}
                      </div>

                      {/* ATTACHED FILES */}

                      {message.files?.length > 0 && (
                        <div className="message-files">
                          {message.files.map((file) => (
                            <div className="message-file" key={file.id}>
                              {file.preview ? (
                                <img src={file.preview} alt={file.name} />
                              ) : (
                                <div className="message-file-icon">
                                  {getFileIcon(file)}
                                </div>
                              )}

                              <div className="message-file-info">
                                <strong>{file.name}</strong>

                                <span>{formatFileSize(file.size)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* MESSAGE */}

                      <div className="message-bubble">
                        {message.content.split("\n").map((line, index) => (
                          <p key={index}>{line || "\u00A0"}</p>
                        ))}
                      </div>

                      {/* COPY */}

                      {message.role === "assistant" && (
                        <button
                          type="button"
                          className="copy-button"
                          onClick={() => copyMessage(message)}
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check size={13} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* TYPING INDICATOR */}

                {isTyping && (
                  <div className="message-row assistant">
                    <div className="message-avatar">
                      <AIIcon />
                    </div>

                    <div className="message-content">
                      <div className="message-author">Jigyasa AI</div>

                      <div className="typing-bubble">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* =====================================
              CHAT INPUT
          ===================================== */}

          <div className="chat-input-section">
            {/* SELECTED FILES */}

            {files.length > 0 && (
              <div className="chat-selected-files">
                {files.map((file) => (
                  <div className="chat-selected-file" key={file.id}>
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} />
                    ) : (
                      <div className="chat-selected-file-icon">
                        {getFileIcon(file)}
                      </div>
                    )}

                    <div className="chat-selected-file-info">
                      <strong>{file.name}</strong>

                      <span>{formatFileSize(file.size)}</span>
                    </div>

                    <button type="button" onClick={() => removeFile(file.id)}>
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* COMPOSER */}

            <div className="chat-composer">
              <button
                type="button"
                className="composer-attach"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach file"
              >
                <Paperclip size={20} />
              </button>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type your message or ask Jigyasa anything..."
                rows={1}
              />

              <button
                type="button"
                className="composer-send"
                disabled={!input.trim() && files.length === 0}
                onClick={() => sendMessage()}
                aria-label="Send message"
              >
                <ArrowUp size={20} />
              </button>
            </div>

            <p className="chat-disclaimer">
              Jigyasa can make mistakes. Please verify important information.
            </p>
          </div>
        </section>

        {/* =====================================
            RIGHT SIDEBAR
        ===================================== */}

        <aside className="ai-sidebar">
          {/* UPLOAD CARD */}

          <section className="sidebar-card upload-card">
            <h2>Upload your content</h2>

            <p className="sidebar-description">
              Drag & drop files here or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                browse from your device
              </button>
            </p>

            <div
              className="sidebar-drop-zone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="sidebar-upload-icon">
                <Upload size={23} />
              </div>

              <p>Drag & drop files here</p>

              <span>or click to browse</span>

              <div className="supported-types">
                <span>PDF</span>
                <span>DOCX</span>
                <span>TXT</span>
                <span>JPG</span>
                <span>PNG</span>
              </div>
            </div>

            {/* UPLOADED FILES */}

            {files.length > 0 && (
              <div className="uploaded-files-section">
                <div className="uploaded-files-title">
                  Uploaded files ({files.length})
                </div>

                <div className="uploaded-files">
                  {files.map((file) => (
                    <div className="uploaded-file" key={file.id}>
                      {file.preview ? (
                        <img src={file.preview} alt={file.name} />
                      ) : (
                        <div className="uploaded-file-icon">
                          {getFileIcon(file)}
                        </div>
                      )}

                      <div className="uploaded-file-info">
                        <strong>{file.name}</strong>

                        <span>{formatFileSize(file.size)}</span>
                      </div>

                      <button type="button" onClick={() => removeFile(file.id)}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* QUICK ACTIONS */}

          <section className="sidebar-card quick-actions-card">
            <h2>Quick actions</h2>

            <div className="quick-actions-grid">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    type="button"
                    className="quick-action"
                    onClick={() => sendMessage(action.prompt)}
                  >
                    <div className="quick-action-icon">
                      {Icon === "ai" ? <AIIcon /> : <Icon size={17} />}
                    </div>

                    <div className="quick-action-content">
                      <strong>{action.title}</strong>

                      <span>{action.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>
      </div>

      {/* =====================================
          HIDDEN FILE INPUT
      ===================================== */}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}

export default MultimodalChat;

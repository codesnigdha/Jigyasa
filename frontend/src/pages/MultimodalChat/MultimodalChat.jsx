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

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  sendMessageToAI,
  createVectorStore,
  uploadDocument,
  sendDocumentMessage,
  analyzeImage,
} from "../../services/aiService";

import "./MultimodalChat.css";

/* =====================================================
   ACCEPTED FILE TYPES
===================================================== */

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

/* =====================================================
   QUICK ACTIONS
===================================================== */

const QUICK_ACTIONS = [
  {
    icon: FileText,
    title: "Summarize",
    description: "Get a summary of your content",
    prompt: "Summarize the content and give me the most important points.",
  },
  {
    icon: "ai",
    title: "Explain",
    description: "Explain in simple terms",
    prompt: "Explain this in simple language.",
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
    prompt: "Extract the most important information and key points.",
  },
];

/* =====================================================
   JIGYASA AI ICON
===================================================== */

function AIIcon({ className = "" }) {
  return (
    <img
      className={`jigyasa-ai-icon ${className}`}
      src="/icon2.png"
      alt="Jigyasa AI"
    />
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

function MultimodalChat() {
  /* ===================================================
     CHAT STATE
  =================================================== */

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  /* ===================================================
     LAB 4 STATE
  =================================================== */

  const [vectorStoreId, setVectorStoreId] = useState(null);
  const [previousResponseId, setPreviousResponseId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  /* ===================================================
     REFS
  =================================================== */

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  /* ===================================================
     CONVERSATION STATE
  =================================================== */

  const hasConversation = messages.length > 0;

  /* ===================================================
     AUTO SCROLL
  =================================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  /* ===================================================
     FILE SIZE
  =================================================== */

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* ===================================================
     FILE ICON
  =================================================== */

  const getFileIcon = (file) => {
    if (file.type?.startsWith("image/")) {
      return <ImageIcon size={18} />;
    }

    return <FileText size={18} />;
  };

  /* ===================================================
     CHECK FILE TYPE
  =================================================== */

  const isImageFile = (file) => {
    return file?.type?.startsWith("image/");
  };

  const isDocumentFile = (file) => {
    return !isImageFile(file);
  };

  /* ===================================================
     ADD FILES
  =================================================== */

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

    if (validFiles.length === 0) {
      return;
    }

    /*
     * Lab 20 image analysis currently works best with
     * one image at a time.
     *
     * Lab 4 documents can still be uploaded together.
     */

    const hasImage = validFiles.some(isImageFile);
    const hasDocument = validFiles.some(isDocumentFile);

    if (hasImage && hasDocument) {
      alert(
        "Please upload images and documents separately. Images use Lab 20, while PDF/DOC/DOCX/TXT files use Lab 4.",
      );
      return;
    }

    if (hasImage && validFiles.length > 1) {
      alert("Please upload one image at a time for Lab 20 image analysis.");
      return;
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

  /* ===================================================
     FILE CHANGE
  =================================================== */

  const handleFileChange = (event) => {
    if (event.target.files?.length) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  /* ===================================================
     REMOVE FILE
  =================================================== */

  const removeFile = (id) => {
    setFiles((previous) => {
      const target = previous.find((file) => file.id === id);

      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }

      return previous.filter((file) => file.id !== id);
    });
  };

  /* ===================================================
     CLEAR FILES
  =================================================== */

  const clearFiles = () => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    setFiles([]);
  };

  /* ===================================================
     DRAG & DROP
  =================================================== */

  const handleDrop = (event) => {
    event.preventDefault();

    if (event.dataTransfer.files?.length) {
      addFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /* ===================================================
     LAB 3
     NORMAL TEXT AI RESPONSE
  =================================================== */

  const getAIResponse = async (message) => {
    const response = await sendMessageToAI(message);

    // Keep the complete response because image generation
    // returns { type: "image", image: "..." } in addition
    // to the normal message field.
    return response;
  };

  /* ===================================================
     IMAGE RESPONSE HELPERS
  =================================================== */

  const getGeneratedImageSrc = (image) => {
    if (!image) {
      return null;
    }

    // Already a complete data URL or normal URL.
    if (
      image.startsWith("data:") ||
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Backend returns raw Base64 PNG data.
    return `data:image/png;base64,${image}`;
  };

  /* ===================================================
     LAB 4
     CREATE VECTOR STORE + UPLOAD DOCUMENTS
  =================================================== */

  const uploadDocumentsToAI = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return null;
    }

    setIsUploading(true);

    try {
      let currentVectorStoreId = vectorStoreId;

      /* -----------------------------------------------
         CREATE VECTOR STORE ONLY FOR DOCUMENTS
      ------------------------------------------------ */

      if (!currentVectorStoreId) {
        const storeResponse = await createVectorStore();

        if (!storeResponse?.success || !storeResponse?.vector_store_id) {
          throw new Error("Unable to create document storage.");
        }

        currentVectorStoreId = storeResponse.vector_store_id;

        setVectorStoreId(currentVectorStoreId);
      }

      /* -----------------------------------------------
         UPLOAD DOCUMENTS
      ------------------------------------------------ */

      for (const item of selectedFiles) {
        const actualFile = item?.file || item;

        if (!actualFile) {
          continue;
        }

        /*
         * Safety check:
         * Images must NEVER reach Lab 4.
         */

        if (isImageFile(actualFile)) {
          throw new Error("Images must be processed using Lab 20.");
        }

        await uploadDocument({
          vectorStoreId: currentVectorStoreId,
          file: actualFile,
        });
      }

      return currentVectorStoreId;
    } finally {
      setIsUploading(false);
    }
  };

  /* ===================================================
     LAB 20
     ANALYZE IMAGE
  =================================================== */

  const analyzeImageWithLab20 = async (selectedFile) => {
    if (!selectedFile) {
      throw new Error("Please select an image.");
    }

    const actualFile = selectedFile?.file || selectedFile;

    if (!actualFile) {
      throw new Error("Image file is missing.");
    }

    if (!isImageFile(actualFile)) {
      throw new Error("Lab 20 accepts image files only.");
    }

    setIsUploading(true);

    try {
      console.log("LAB 20: Analyzing image:", actualFile.name);

      const response = await analyzeImage(actualFile);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to analyze the image.");
      }

      /* -----------------------------------------------
         FORMAT LAB 20 RESPONSE
      ------------------------------------------------ */

      let result = "";

      if (response.description) {
        result += `Description:\n${response.description}`;
      }

      if (Array.isArray(response.tags) && response.tags.length > 0) {
        result += "\n\nTags:\n";

        result += response.tags.map((tag) => `• ${tag}`).join("\n");
      }

      if (!result) {
        result = response.message || "Image analyzed successfully.";
      }

      return result;
    } finally {
      setIsUploading(false);
    }
  };

  /* ===================================================
     SEND MESSAGE
  =================================================== */

  const sendMessage = async (customPrompt = null) => {
    const messageText = (customPrompt !== null ? customPrompt : input).trim();

    /* -------------------------------------------------
       EMPTY MESSAGE
    ------------------------------------------------- */

    if (!messageText && files.length === 0) {
      return;
    }

    /* -------------------------------------------------
       SAVE CURRENT FILES
    ------------------------------------------------- */

    const currentFiles = [...files];

    /* -------------------------------------------------
       DEFAULT REQUEST
    ------------------------------------------------- */

    const requestMessage =
      messageText ||
      (currentFiles.length > 0 &&
      currentFiles[0]?.file &&
      isImageFile(currentFiles[0].file)
        ? "Analyze the uploaded image and explain what it contains."
        : "Analyze the uploaded document and explain the important information.");

    /* -------------------------------------------------
       USER MESSAGE
    ------------------------------------------------- */

    const userMessage = {
      id: Date.now(),
      role: "user",
      type: "text",
      content: requestMessage,
      image: null,
      files: currentFiles,
    };

    setMessages((previous) => [...previous, userMessage]);

    /* -------------------------------------------------
       CLEAR COMPOSER
    ------------------------------------------------- */

    setInput("");
    setFiles([]);
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      let assistantMessage;

      /* =================================================
         FILE REQUEST
      ================================================= */

      if (currentFiles.length > 0) {
        const actualFile = currentFiles[0]?.file || currentFiles[0];

        /* =================================================
           LAB 20 - IMAGE ANALYSIS
        ================================================= */

        if (isImageFile(actualFile)) {
          console.log("Jigyasa: Using LAB 20 for image analysis.");

          const aiResponse = await analyzeImageWithLab20(currentFiles[0]);

          assistantMessage = {
            id: Date.now() + 1,
            role: "assistant",
            type: "text",
            content: aiResponse || "Image analyzed successfully.",
            image: null,
          };
        } else {
          /* =================================================
             LAB 4 - DOCUMENT
          ================================================= */

          console.log("Jigyasa: Using LAB 4 for document analysis.");

          const currentVectorStoreId = await uploadDocumentsToAI(currentFiles);

          if (!currentVectorStoreId) {
            throw new Error("Unable to prepare the uploaded document.");
          }

          const response = await sendDocumentMessage({
            message: requestMessage,
            vectorStoreId: currentVectorStoreId,
            previousResponseId: previousResponseId,
          });

          if (!response?.success) {
            throw new Error(
              response?.message || "Unable to analyze the document.",
            );
          }

          setPreviousResponseId(response.response_id);

          assistantMessage = {
            id: Date.now() + 1,
            role: "assistant",
            type: "text",
            content: response.message || "Unable to generate a response.",
            image: null,
          };
        }
      } else {
        /* =================================================
           LAB 3 TEXT CHAT / IMAGE GENERATION
        ================================================= */

        console.log("Jigyasa: Sending request to Lab 3 / Image Generation.");

        const response = await getAIResponse(requestMessage);

        console.log("Jigyasa AI RESPONSE:", response);

        /* ---------------------------------------------
           IMAGE RESPONSE
        --------------------------------------------- */

        if (response?.type === "image" && response?.image) {
          assistantMessage = {
            id: Date.now() + 1,
            role: "assistant",
            type: "image",
            content: response.message || "Here is your generated image.",
            image: getGeneratedImageSrc(response.image),
          };
        } else {

        /* ---------------------------------------------
           NORMAL TEXT RESPONSE
        --------------------------------------------- */
          assistantMessage = {
            id: Date.now() + 1,
            role: "assistant",
            type: "text",
            content: response?.message || "I couldn't generate a response.",
            image: null,
          };
        }
      }

      /* =================================================
         ADD ASSISTANT MESSAGE
      ================================================= */

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      console.error("Jigyasa AI request failed:", error);

      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        type: "text",
        content:
          "I'm sorry, I couldn't process your request.\n\n" +
          `${error.message}\n\n` +
          "Please make sure the Jigyasa backend is running and Azure AI is available.",
        image: null,
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsUploading(false);
    }
  };

  /* ===================================================
     TEXTAREA INPUT
  =================================================== */

  const handleInput = (event) => {
    setInput(event.target.value);

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";

      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  /* ===================================================
     ENTER KEY
  =================================================== */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!isTyping && !isUploading) {
        sendMessage();
      }
    }
  };

  /* ===================================================
     NEW CHAT
  =================================================== */

  const clearConversation = () => {
    clearFiles();

    setMessages([]);
    setInput("");
    setIsTyping(false);
    setIsUploading(false);

    /* -----------------------------------------------
       RESET LAB 4 CONTEXT
    ------------------------------------------------ */

    setVectorStoreId(null);
    setPreviousResponseId(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  /* ===================================================
     COPY MESSAGE
  =================================================== */

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

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div className="multimodal-page">
      <div className="ai-workspace">
        {/* =================================================
            LEFT CHAT PANEL
        ================================================= */}

        <section className="chat-panel">
          {/* =================================================
              CHAT HEADER
          ================================================= */}

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
              disabled={isTyping || isUploading}
            >
              <Plus size={17} />
              <span>New chat</span>
            </button>
          </header>

          {/* =================================================
              CHAT BODY
          ================================================= */}

          <div
            className="chat-body"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {!hasConversation ? (
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
              <div className="messages-container">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-row ${message.role}`}
                  >
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

                      {/* =================================================
                          MESSAGE
                          MARKDOWN SUPPORT
                      ================================================= */}

                      <div
                        className={`message-bubble ${
                          message.type === "image" ? "image-message-bubble" : ""
                        }`}
                      >
                        {message.content && (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        )}

                        {message.type === "image" && message.image && (
                          <div className="generated-image-container">
                            <img
                              src={message.image}
                              alt="AI generated"
                              className="generated-ai-image"
                            />
                          </div>
                        )}
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
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* TYPING INDICATOR */}

                {(isTyping || isUploading) && (
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

          {/* =================================================
              CHAT INPUT
          ================================================= */}

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

                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      disabled={isTyping || isUploading}
                    >
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
                disabled={isTyping || isUploading}
                aria-label="Attach file"
              >
                <Paperclip size={20} />
              </button>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={
                  isUploading
                    ? "Analyzing your content..."
                    : "Type your message or ask Jigyasa anything..."
                }
                rows={1}
                disabled={isTyping || isUploading}
              />

              <button
                type="button"
                className="composer-send"
                disabled={
                  isTyping ||
                  isUploading ||
                  (!input.trim() && files.length === 0)
                }
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

        {/* =================================================
            RIGHT SIDEBAR
        ================================================= */}

        <aside className="ai-sidebar">
          {/* =================================================
              UPLOAD CARD
          ================================================= */}

          <section className="sidebar-card upload-card">
            <h2>Upload your content</h2>

            <p className="sidebar-description">
              Drag & drop files here or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isTyping || isUploading}
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

                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        disabled={isTyping || isUploading}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

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
                    disabled={isTyping || isUploading}
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

      {/* =================================================
          HIDDEN FILE INPUT
      ================================================= */}

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

/* =====================================================
   EXPORT
===================================================== */

export default MultimodalChat;

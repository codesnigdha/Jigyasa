import axios from "axios";

/* =====================================================
   API CONFIGURATION
===================================================== */

const API_URL = "http://127.0.0.1:8000/api/ai";

/* =====================================================
   AXIOS INSTANCE
===================================================== */

const aiApi = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

/* =====================================================
   SEND TEXT MESSAGE
   LAB 3
===================================================== */

export const sendMessageToAI = async (message) => {
  try {
    const response = await aiApi.post("/chat", {
      message: message?.trim() || "",
    });

    return response.data;
  } catch (error) {
    console.error("Jigyasa AI Error:", error);

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unable to connect to Jigyasa AI.";

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

/* =====================================================
   SEND MULTIMODAL MESSAGE
   LAB 4
===================================================== */

export const sendMultimodalMessage = async ({ message = "", files = [] }) => {
  try {
    const formData = new FormData();

    /* -----------------------------------------------
       TEXT
    ------------------------------------------------ */

    formData.append("message", message?.trim() || "");

    /* -----------------------------------------------
       FILES
    ------------------------------------------------ */

    files.forEach((item) => {
      const file = item?.file || item;

      if (file instanceof File) {
        formData.append("files", file);
      }
    });

    /* -----------------------------------------------
       API REQUEST
    ------------------------------------------------ */

    const response = await aiApi.post("/chat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Jigyasa Multimodal AI Error:", error);

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unable to analyze the uploaded content.";

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

/* =====================================================
   ANALYZE SINGLE FILE
   LAB 4
===================================================== */

export const analyzeFile = async ({ file, message = "" }) => {
  try {
    if (!file) {
      throw new Error("Please select a file.");
    }

    const formData = new FormData();

    formData.append("message", message?.trim() || "Analyze this file.");

    formData.append("files", file);

    const response = await aiApi.post("/chat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Jigyasa File Analysis Error:", error);

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unable to analyze the file.";

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

/* =====================================================
   LAB 4
   CREATE VECTOR STORE
===================================================== */

export const createVectorStore = async () => {
  try {
    const response = await aiApi.post("/document/create-vector-store");

    return response.data;
  } catch (error) {
    console.error("Create Vector Store Error:", error);

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Unable to create document storage.";

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

/* =====================================================
   LAB 4
   UPLOAD DOCUMENT
===================================================== */

export const uploadDocument = async ({ vectorStoreId, file }) => {
  try {
    if (!vectorStoreId) {
      throw new Error("Vector store ID is required.");
    }

    if (!file) {
      throw new Error("File is required.");
    }

    const formData = new FormData();

    formData.append("vector_store_id", vectorStoreId);

    formData.append("file", file);

    const response = await aiApi.post("/document/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Document Upload Error:", error);

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Unable to upload the document.";

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

/* =====================================================
   LAB 4
   CHAT WITH DOCUMENT
===================================================== */

export const sendDocumentMessage = async ({
  message,
  vectorStoreId,
  previousResponseId = null,
}) => {
  try {
    if (!message?.trim()) {
      throw new Error("Message cannot be empty.");
    }

    if (!vectorStoreId) {
      throw new Error("Vector store ID is required.");
    }

    const response = await aiApi.post("/document/chat", {
      message: message.trim(),

      vector_store_id: vectorStoreId,

      previous_response_id: previousResponseId,
    });

    return response.data;
  } catch (error) {
    console.error("Document Chat Error:", error);

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Unable to answer using the uploaded document.";

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

/* =====================================================
   DEFAULT EXPORT
===================================================== */

const aiService = {
  sendMessageToAI,
  sendMultimodalMessage,
  analyzeFile,
  createVectorStore,
  uploadDocument,
  sendDocumentMessage,
};

export default aiService;

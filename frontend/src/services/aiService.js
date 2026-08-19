import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/ai";

const aiApi = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

/* =====================================================
   ERROR HANDLER
===================================================== */

const getErrorMessage = (error, fallback) => {
  return (
    error.response?.data?.detail ||
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    fallback
  );
};

/* =====================================================
   LAB 3 - TEXT CHAT
===================================================== */

export const sendMessageToAI = async (message) => {
  try {
    const response = await aiApi.post("/chat", {
      message: message?.trim() || "",
    });

    return response.data;
  } catch (error) {
    console.error("Jigyasa AI Lab 3 Error:", error);

    throw new Error(
      getErrorMessage(error, "Unable to connect to Jigyasa AI."),
      { cause: error },
    );
  }
};

/* =====================================================
   LAB 4 - CREATE VECTOR STORE
===================================================== */

export const createVectorStore = async () => {
  try {
    const response = await aiApi.post("/document/create-vector-store");

    return response.data;
  } catch (error) {
    console.error("Lab 4 Vector Store Error:", error);

    throw new Error(
      getErrorMessage(error, "Unable to create document storage."),
      { cause: error },
    );
  }
};

/* =====================================================
   LAB 4 - UPLOAD DOCUMENT
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

    formData.append("file", file, file.name);

    const response = await aiApi.post("/document/upload", formData);

    return response.data;
  } catch (error) {
    console.error("Lab 4 Document Upload Error:", error);

    throw new Error(
      getErrorMessage(error, "Unable to upload and process the document."),
      { cause: error },
    );
  }
};

/* =====================================================
   LAB 4 - CHAT WITH DOCUMENT
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
    console.error("Lab 4 Document Chat Error:", error);

    throw new Error(
      getErrorMessage(error, "Unable to answer using the uploaded document."),
      { cause: error },
    );
  }
};

/* =====================================================
   DEFAULT EXPORT
===================================================== */

const aiService = {
  sendMessageToAI,
  createVectorStore,
  uploadDocument,
  sendDocumentMessage,
};

export default aiService;

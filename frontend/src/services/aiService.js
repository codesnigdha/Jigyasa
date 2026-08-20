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
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

/* =====================================================
   LAB 3 - TEXT CHAT
===================================================== */

export const sendMessageToAI = async (message) => {
  try {
    if (!message?.trim()) {
      throw new Error("Message cannot be empty.");
    }

    const response = await aiApi.post("/chat", {
      message: message.trim(),
    });

    return response.data;
  } catch (error) {
    console.error("Jigyasa AI Lab 3 Error:", error);

    throw new Error(getErrorMessage(error, "Unable to connect to Jigyasa AI."));
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
    );
  }
};

/* =====================================================
   LAB 20 - IMAGE ANALYSIS
===================================================== */

export const analyzeImage = async (file) => {
  try {
    if (!file) {
      throw new Error("Please select an image.");
    }

    if (!(file instanceof File)) {
      throw new Error("Invalid image file.");
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Please upload a JPG, PNG, or WEBP image.");
    }

    const formData = new FormData();

    formData.append("file", file, file.name);

    const response = await aiApi.post("/image/analyze", formData);

    return response.data;
  } catch (error) {
    console.error("Jigyasa AI Lab 20 Image Analysis Error:", error);

    throw new Error(getErrorMessage(error, "Unable to analyze the image."));
  }
};

/* =====================================================
   MULTIMODAL IMAGE HELPER
===================================================== */

export const sendMultimodalMessage = async ({ message = "", files = [] }) => {
  try {
    if (!message.trim() && files.length === 0) {
      throw new Error("Please enter a message or upload a file.");
    }

    const imageItem = files.find((item) => {
      const file = item?.file || item;

      return file instanceof File && file.type.startsWith("image/");
    });

    if (imageItem) {
      const file = imageItem?.file || imageItem;

      return await analyzeImage(file);
    }

    throw new Error(
      "For documents, create a vector store and upload the document first.",
    );
  } catch (error) {
    console.error("Jigyasa Multimodal Error:", error);

    throw new Error(
      getErrorMessage(error, "Unable to process the uploaded content."),
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
  analyzeImage,
  sendMultimodalMessage,
};

export default aiService;

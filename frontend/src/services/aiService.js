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
   =====================================================

   Supports:

   - Text
   - Images
   - PDF
   - DOC
   - DOCX
   - TXT
   - Multiple files
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
      /*
       * The MultimodalChat component stores files as:
       *
       * {
       *   id,
       *   file,
       *   name,
       *   size,
       *   type,
       *   preview
       * }
       *
       * We need the actual File object.
       */

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
   EXPORT DEFAULT
===================================================== */

const aiService = {
  sendMessageToAI,
  sendMultimodalMessage,
  analyzeFile,
};

export default aiService;

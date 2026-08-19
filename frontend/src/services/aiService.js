import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/ai";

// =====================================================
// SEND MESSAGE TO JIGYASA AI
// =====================================================

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message: message,
    });

    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error);

    const errorMessage =
      error.response?.data?.detail || "Unable to connect to Jigyasa AI.";

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

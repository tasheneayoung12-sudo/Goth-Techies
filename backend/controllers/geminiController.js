import { GoogleGenAI } from "@google/genai";

let aiInstance = null;

function getAiInstance() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured on the server environment.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

/**
 * @desc Generate content using Google Gemini API safely from the backend server
 * @route POST /api/gemini/generate
 */
export const generateAiResponse = async (req, res, next) => {
  try {
    const { prompt, systemInstruction } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return res.status(400).json({ success: false, error: "Prompt string is required." });
    }

    const ai = getAiInstance();
    const model = "gemini-2.5-flash";

    const config = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });

    return res.json({
      success: true,
      text: response.text,
      model
    });
  } catch (error) {
    console.error("Gemini API Controller Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI response."
    });
  }
};

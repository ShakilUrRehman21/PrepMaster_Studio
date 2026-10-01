const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Priority list of active models with fallback if one is busy/experiencing high demand
const CANDIDATE_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.8-flash",
];

function createChatSession(modelName) {
  const model = genAI.getGenerativeModel({ model: modelName });
  return model.startChat({ generationConfig });
}

export const chatSession = {
  async sendMessage(prompt) {
    let lastError = null;

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const session = createChatSession(modelName);
        return await session.sendMessage(prompt);
      } catch (err) {
        lastError = err;
        console.warn(`[Gemini] ${modelName} error (${err.message}). Trying fallback...`);
      }
    }

    throw lastError;
  },
};

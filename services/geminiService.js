const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GOOGLE_API_KEY } = require("../config");

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

module.exports = {
  async generateResponse(imageParts, request) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt = await request;
      console.log(imageParts);
      const result = await model.generateContent([ prompt, ...imageParts ]);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error("Error generating response from Gemini API:", error);
      throw error;
    }
  },
};

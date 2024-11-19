import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEN_AI_KEY);

const generateContent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text(); // Mengembalikan teks dari respons
  } catch (error) {
    console.error("Error calling Google Generative AI API:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
};

export default generateContent;

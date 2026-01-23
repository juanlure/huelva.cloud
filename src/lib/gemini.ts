import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

export const isAiEnabled = !!apiKey;

let model: any = null;

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} else {
  console.warn("⚠️ GEMINI_API_KEY no definida. Los agentes usarán modo 'Mock'.");
}

export async function generateContent(prompt: string, temperature = 0.7): Promise<string | null> {
  if (!model) return null;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
      }
    });
    return result.response.text();
  } catch (error) {
    console.error("❌ Error generando contenido con Gemini:", error);
    return null;
  }
}

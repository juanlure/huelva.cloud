import { GoogleGenerativeAI } from '@google/generative-ai';
import { logAgentAction } from './logger';

const apiKey = process.env.GEMINI_API_KEY;

export const isAiEnabled = !!apiKey;

let model: any = null;

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  // Usamos gemini-pro que es el más estable/común si flash da 404
  model = genAI.getGenerativeModel({ model: "gemini-pro" });
} else {
  console.warn("⚠️ GEMINI_API_KEY no definida.");
  // No podemos loguear a DB aquí fácilmente porque logger importa supabase que podría no estar listo, 
  // pero el runtime log ayudará si miran Vercel logs.
}

export async function generateContent(prompt: string, temperature = 0.7): Promise<string | null> {
  if (!apiKey) {
    await logAgentAction('System', 'AI Error', { error: 'GEMINI_API_KEY Missing' });
    return null;
  }
  
  if (!model) return null;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
      }
    });
    return result.response.text();
  } catch (error: any) {
    console.error("❌ Error generando contenido con Gemini:", error);
    await logAgentAction('System', 'AI Critical Error', { 
      message: error.message, 
      status: error.status || 'unknown' 
    });
    return null;
  }
}

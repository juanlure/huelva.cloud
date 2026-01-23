import { google } from '@google/genai';
import { logAgentAction } from './logger';

const apiKey = process.env.GEMINI_API_KEY;

export const isAiEnabled = !!apiKey;

let client: any = null;

if (apiKey) {
  client = new google.genai.Client({ apiKey: apiKey });
} else {
  console.warn("⚠️ GEMINI_API_KEY no definida.");
}

export async function generateContent(prompt: string, temperature = 0.7): Promise<string | null> {
  if (!apiKey) {
    await logAgentAction('System', 'AI Error', { error: 'GEMINI_API_KEY Missing' });
    return null;
  }
  
  if (!client) return null;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: prompt,
      config: {
        temperature: temperature,
      }
    });

    return response.text();
  } catch (error: any) {
    console.error("❌ Error generando contenido con Gemini:", error);
    await logAgentAction('System', 'AI Critical Error', { 
      message: error.message, 
      status: error.status || 'unknown' 
    });
    return null;
  }
}

// Exportar cliente para uso directo en otros agentes (ej: designer)
export { client as geminiClient };

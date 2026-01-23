import { GoogleGenAI } from '@google/genai';
import { logAgentAction } from './logger';

const apiKey = process.env.GEMINI_API_KEY;

export const isAiEnabled = !!apiKey;

let client: any = null;

if (apiKey) {
  client = new GoogleGenAI({ apiKey: apiKey });
} else {
  console.warn("⚠️ GEMINI_API_KEY no definida.");
}

export async function generateContent(prompt: string, temperature = 0.7, useSearch = false): Promise<string | null> {
  if (!apiKey) {
    await logAgentAction('System', 'AI Error', { error: 'GEMINI_API_KEY Missing' });
    return null;
  }
  
  if (!client) return null;

  try {
    const config: any = {
      temperature: temperature,
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash', // Usar modelo que soporte search (2.0 Flash es excelente para esto)
      contents: prompt,
      config: config
    });

    return response.text;
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

import { generateContent } from '../gemini';
import { logAgentAction } from '../logger';

export async function performWebResearch(topic: string): Promise<string | null> {
  console.log(`[RESEARCHER] Iniciando investigación sobre: "${topic}"`);

  const prompt = `
    Actúa como un investigador local en Huelva.
    Busca información ACTUALIZADA y REAL en internet sobre: "${topic}" (Contexto: Provincia de Huelva, España).
    
    Necesito DATOS CONCRETOS para escribir una guía útil:
    - Nombres oficiales de lugares/restaurantes.
    - Direcciones o ubicaciones precisas (evita homónimos en México/Argentina).
    - Precios aproximados (2024/2025/2026).
    - Horarios de apertura (si aplica).
    - Cualquier dato curioso o "secreto" reciente.
    - Evita generalidades. Dame hechos.

    Formato de salida: Lista de puntos clave (bullets).
  `;

  try {
    // Usamos search habilitado
    const result = await generateContent(prompt, 0.4, true);

    if (result) {
      console.log(`[RESEARCHER] Investigación completada. Longitud: ${result.length} chars.`);
      await logAgentAction('Researcher', 'Search Completed', { topic, resultLength: result.length });
      return result;
    }
  } catch (e) {
    console.error("[RESEARCHER] Fallo en investigación:", e);
  }

  return null;
}

export async function findSourceUrl(topic: string): Promise<string | null> {
  console.log(`[RESEARCHER] Buscando URL oficial/definitive para: "${topic}"`);

  const prompt = `
    Find the single BEST, most authoritative public URL for the location or topic: "${topic}" in Huelva, Spain.
    
    Strict constraints:
    - MUST be related to Huelva, Andalusia, Spain. NOT Argentina or elsewhere.
    - Preference: Official tourism (andalucia.org, huelva.es) OR reputable travel blogs (site:.es).
    - Avoid generic aggregators (TripAdvisor listings) if a specific article exists.
    
    Return ONLY the URL string. No text, no markdown.
  `;

  try {
    const result = await generateContent(prompt, 0.1, true);
    if (result) {
      const url = result.trim();
      // Basic validation
      if (url.startsWith('http')) {
        console.log(`[RESEARCHER] URL encontrada: ${url}`);
        return url;
      }
    }
  } catch (e) {
    console.error("[RESEARCHER] Fallo buscando URL:", e);
  }
  return null;
}

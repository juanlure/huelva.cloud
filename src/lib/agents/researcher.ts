import { generateContent } from '../gemini';
import { logAgentAction } from '../logger';

export async function performWebResearch(topic: string): Promise<string | null> {
  console.log(`[RESEARCHER] Iniciando investigación sobre: "${topic}"`);
  
  const prompt = `
    Actúa como un investigador local en Huelva.
    Busca información ACTUALIZADA y REAL en internet sobre: "${topic}".
    
    Necesito DATOS CONCRETOS para escribir una guía útil:
    - Nombres oficiales de lugares/restaurantes.
    - Direcciones o ubicaciones precisas.
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

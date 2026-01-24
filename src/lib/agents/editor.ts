import { generateContent, isAiEnabled } from '../gemini';
import { Draft } from './writer';
import { safeJsonParse } from './utils';

export interface ReviewResult {
  approved: boolean;
  feedback: string;
  score: number;
}

export async function reviewDraft(draft: Draft): Promise<ReviewResult> {
  console.log(`[EDITOR] Revisando borrador: "${draft.title}"`);

  if (!isAiEnabled) return { approved: true, feedback: 'Auto-approved (Mock)', score: 100 };

  const prompt = `
    Eres el Editor Jefe de Huelva.is "El Cabezo".
    Tu trabajo es asegurar calidad humana y local. Eres estricto.
    
    Revisa este artículo:
    TÍTULO: ${draft.title}
    CONTENIDO (resumen): ${draft.content.substring(0, 2000)}...
    
    CRITERIOS DE CALIDAD (HUELVA.IS - CRÍTICO):
    1. **Anti-IA (Prioridad Máxima)**: Busca y destruye frases como "un tapiz de...", "joya escondida", "viaje en el tiempo". Queremos que suene a alguien de la calle Concepción, no a un bot poético.
    2. **Localismo vs Centralismo**: ¿Suena a Huelva de verdad o a alguien que ha visto fotos en Instagram? 
    3. **Sustancia y Datos**: ¿Dice algo útil? Si falta información (precios, qué se va a arreglar exactamente, nombres de calles), indícalo.
    
    INSTRUCCIÓN DE FEEDBACK:
    Sé extremadamente específico. Si algo chirría, di cuál es la frase exacta. Si falta información, di qué información falta. Tu feedback servirá para que el escritor haga una segunda pasada y corrija el artículo.
    
    RESPONDE SOLO JSON:
    {
      "approved": boolean (false si score < 65),
      "score": number (0-100),
      "feedback": "Dime exactamente qué hay que cambiar o añadir para que el artículo sea de 10."
    }
  `;

  try {
    const response = await generateContent(prompt, 0.2); // Low temp for logic
    const result = safeJsonParse(response, { approved: false, score: 0, feedback: "Error de análisis" });

    return {
      approved: result.approved === true,
      score: result.score || 0,
      feedback: result.feedback || 'Sin feedback'
    };
  } catch (e) {
    console.error("Editor AI parsing failed", e);
    // Fail safe: reject if we can't parse to avoid publishing garbage
    return { approved: false, feedback: "Error técnico en Editor IA", score: 0 };
  }
}

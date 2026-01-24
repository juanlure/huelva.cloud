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
    
    CRITERIOS DE CALIDAD (QUALITY GATES):
    1. **Detector de IA**: Penaliza frases como "un tapiz de...", "en conclusión", "joya escondida", "mezcla de tradición y modernidad". ¡Queremos lenguaje natural!
    2. **Localismo**: ¿Suena a alguien de Huelva o a un folleto de Madrid?
    3. **Repetición**: ¿Usa la misma palabra "impresionante" 5 veces?
    4. **Utilidad**: ¿Da datos útiles o es paja?
    
    RESPONDE SOLO JSON:
    {
      "approved": boolean (false si score < 70),
      "score": number (0-100),
      "feedback": "Feedback constructivo pero directo. Si rechazas, di exactamente qué quitar."
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

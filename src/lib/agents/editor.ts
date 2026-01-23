import { generateContent, isAiEnabled } from '../gemini';
import { Draft } from './writer';

export interface ReviewResult {
  approved: boolean;
  feedback: string;
  score: number;
}

export async function reviewDraft(draft: Draft): Promise<ReviewResult> {
  console.log(`[EDITOR] Revisando borrador: "${draft.title}"`);
  
  if (!isAiEnabled) return { approved: true, feedback: 'Auto-approved (Mock)', score: 100 };

  const prompt = `
    Eres el Editor Jefe de Huelva.is.
    
    Revisa este artículo:
    TÍTULO: ${draft.title}
    CONTENIDO: ${draft.content}
    
    CRITERIOS DE APROBACIÓN:
    1. Menciona lugares o expresiones reales de Huelva.
    2. No es spam ni contenido ofensivo.
    3. Es útil para el lector.
    
    RESPONDE SOLO JSON:
    {
      "approved": boolean,
      "score": number (0-100),
      "feedback": "Breve explicación"
    }
  `;

  try {
    const response = await generateContent(prompt, 0.2); // Low temp for logic
    const cleanJson = response?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
    const result = JSON.parse(cleanJson);
    
    return {
      approved: result.approved === true,
      score: result.score || 0,
      feedback: result.feedback || 'Sin feedback'
    };
  } catch (e) {
    console.error("Editor AI parsing failed", e);
    // Fail safe: reject if we can't parse
    return { approved: false, feedback: "Error técnico en Editor IA", score: 0 };
  }
}

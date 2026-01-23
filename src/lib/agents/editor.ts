/*
  Huelva.is - Agente Editor (Serverless Version)
*/

import { Draft } from './writer';

export interface ReviewResult {
  approved: boolean;
  feedback: string;
  score: number;
}

export async function reviewDraft(draft: Draft): Promise<ReviewResult> {
  console.log(`[EDITOR] Revisando borrador: "${draft.title}"`);
  
  // Lógica simulada de IA
  const keywords = ['choco', 'huelva', 'ría', 'sierra', 'doñana', 'tartessos'];
  const contentLower = draft.content.toLowerCase();
  
  const hasLocalFlavor = keywords.some(k => contentLower.includes(k));
  
  if (!hasLocalFlavor) {
    return {
      approved: false,
      feedback: "Falta sabor local.",
      score: 40
    };
  }

  return {
    approved: true,
    feedback: "Aprobado para publicación automática.",
    score: 85
  };
}

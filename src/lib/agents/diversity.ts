import { supabaseAdmin } from '../supabase';
import { generateContent, isAiEnabled } from '../gemini';

export interface TopicSuggestion {
  topic: string;
  priority: 'high' | 'medium';
}

export async function analyzeDiversity(): Promise<TopicSuggestion | null> {
  // 1. Obtener historial reciente
  const { data: articles } = await supabaseAdmin
    .from('articles')
    .select('title, category')
    .order('published_at', { ascending: false })
    .limit(10);

  const history = articles?.map(a => `- ${a.title} (${a.category})`).join('\n') || "Ninguno.";

  // 2. Si hay Mock, saltar a lógica simple
  if (!isAiEnabled) {
    console.log("[DIVERSITY] Modo Mock (sin Gemini Key)");
    return { topic: 'Romería del Rocío (Mock)', priority: 'medium' };
  }

  // 3. Consultar a Gemini
  console.log("[DIVERSITY] Brainstorming con Gemini...");
  const prompt = `
    Eres el Jefe de Diversidad de 'Huelva.is', una revista digital local.
    
    ÚLTIMOS ARTÍCULOS PUBLICADOS:
    ${history}
    
    TU MISIÓN:
    Propone UN (1) tema nuevo para un artículo que cumpla:
    1. No repite lo que ya se ha publicado recientemente.
    2. Es ultra-local de Huelva (provincia).
    3. Es específico (ej: no "Comer en Huelva", sino "Los mejores caracoles de la Barriada del Carmen").
    4. Prioriza temas culturales, naturaleza oculta o curiosidades históricas si hay mucha comida.
    
    Devuelve SOLO el título del tema propuesto, sin comillas ni explicaciones.
  `;

  const suggestedTopic = await generateContent(prompt);
  
  if (!suggestedTopic) return { topic: 'Atardecer en Muelle del Tinto', priority: 'medium' };

  return {
    topic: suggestedTopic.trim(),
    priority: 'high'
  };
}

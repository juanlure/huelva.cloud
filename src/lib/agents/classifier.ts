import { generateContent, isAiEnabled } from '../gemini';
import { Draft } from './writer';

export interface InteractiveData {
  interactive: boolean;
  component_type: 'translator' | 'itinerary' | 'quiz' | 'map' | 'timeline' | 'cards' | 'calculator' | null;
  component_name: string | null;
  rationale: string;
  data_schema: any;
  fallback?: string;
}

export async function classifyContent(draft: Draft): Promise<InteractiveData> {
  console.log(`[CLASSIFIER] Analizando interactividad para: "${draft.title}"`);

  if (!isAiEnabled) {
    return {
      interactive: false,
      component_type: null,
      component_name: null,
      rationale: "Modo Mock: Sin análisis de interactividad.",
      data_schema: {}
    };
  }

  const prompt = `
    # AGENTE: Clasificador de Contenido Interactivo

    ## Tu rol
    Eres un agente que analiza temas de contenido y decide:
    1. Si el tema se beneficia de un componente interactivo
    2. Qué tipo de componente es el más adecuado
    3. Qué datos estructurados necesita

    ## Input
    - Tema: "${draft.title}"
    - Categoría: "${draft.category}"
    - Extracto: "${draft.excerpt}"
    - Slug: "${draft.slug}"

    ## Output (JSON VÁLIDO)
    {
      "interactive": true/false,
      "component_type": "translator|itinerary|quiz|map|timeline|cards|calculator|checklist",
      "component_name": "NombrePascalCase",
      "rationale": "Por qué este componente es adecuado",
      "data_schema": { ... estructura de datos específica ... },
      "fallback": "Descripción breve del contenido estático alternativo"
    }

    ## Reglas de decisión
    1. TRANSLATOR: Terminología local (ej: "palabras choqueras")
    2. ITINERARY: Rutas temporales (ej: "Rocío", "Semana Santa", "Fin de semana")
    3. QUIZ: Engagement lúdico (ej: "¿Cuánto sabes de...?", "Choquero o Turista")
    4. MAP: Geografía esencial (ej: "Mejores playas", "Ruta de tapas")
    5. TIMELINE: Historia/Evolución
    6. CARDS: Comparación "Versus" (ej: "Matalascañas vs Punta Umbría", "Jamón vs Paleta")
    7. CHECKLIST: Listas de verificación (ej: "Mochila Romería", "Imprescindibles")
    8. CALCULATOR: Variables numéricas

    Analiza el tema y devuelve SOLO el JSON.
  `;

  try {
    const response = await generateContent(prompt, 0.4); // Baja temperatura para análisis lógico
    const cleanJson = response?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
    const data = JSON.parse(cleanJson);

    if (data.interactive) {
      console.log(`[CLASSIFIER] ¡Oportunidad detectada! Tipo: ${data.component_type} (${data.component_name})`);
    } else {
      console.log(`[CLASSIFIER] Contenido estático recomendado.`);
    }

    return {
      interactive: !!data.interactive,
      component_type: data.component_type || null,
      component_name: data.component_name || null,
      rationale: data.rationale || '',
      data_schema: data.data_schema || {},
      fallback: data.fallback
    };

  } catch (e) {
    console.error("[CLASSIFIER] Fallo en clasificación", e);
    return {
      interactive: false,
      component_type: null,
      component_name: null,
      rationale: "Error en análisis AI",
      data_schema: {}
    };
  }
}

import { generateContent, isAiEnabled } from '../gemini';
import { Draft } from './writer';
import { safeJsonParse } from './utils';

export interface InteractiveData {
  interactive: boolean;
  component_type: 'translator' | 'itinerary' | 'quiz' | 'map' | 'timeline' | 'cards' | 'calculator' | 'checklist' | null;
  component_name: string | null;
  rationale: string;
  data_schema: any;
  confidence: number;
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
      data_schema: {},
      confidence: 0
    };
  }

  const prompt = `
    # AGENTE: Clasificador de Contenido Interactivo
    
    ## Tu rol
    Eres un arquitecto de software y UX. Analizas si un artículo NECESITA un componente interactivo para aportar valor REAL.
    No fuerces la interactividad. Si es un artículo normal, mejor déjalo estático.

    ## Input
    - Tema: "${draft.title}"
    - Categoría: "${draft.category}"
    - Extracto: "${draft.excerpt}"
    
    ## Tipos de Componentes Soportados
    1. **TRANSLATOR**: Diccionarios de términos locales (ej: "palabras de Huelva").
    2. **ITINERARY**: Planes de viaje día a día / hora a hora.
    3. **QUIZ**: Tests de conocimiento o de personalidad.
    4. **CARDS**: Comparaciones directas "A vs B" (ej: playas, restaurantes).
    5. **CHECKLIST**: Listas de verificación útiles (ej: qué llevar al Rocío).
    
    ## Output (JSON)
    {
      "interactive": boolean,
      "confidence": number (0-100),
      "component_type": "translator|itinerary|quiz|cards|checklist" (o null),
      "component_name": "NombrePascalCase" (ej: "ItinerarioSemanaSanta"),
      "rationale": "Razón técnica y de UX para elegir esto. Sé escéptico.",
      "data_schema": { ... estructura vacía o ejemplo breve ... }
    }

    ## Reglas
    - Si confidence < 85, pon interactive: false.
    - Solo usa los tipos listados arriba.
    - Prioriza la utilidad sobre el "wow factor".
  `;

  try {
    const response = await generateContent(prompt, 0.2);
    const data = safeJsonParse(response, { interactive: false, confidence: 0 });

    const confidence = data.confidence || 0;
    const isHighConfidence = confidence >= 80;

    if (data.interactive && isHighConfidence) {
      console.log(`[CLASSIFIER] Oportunidad detectada (${confidence}%): ${data.component_type}`);
      return {
        interactive: true,
        component_type: data.component_type,
        component_name: data.component_name,
        rationale: data.rationale,
        data_schema: data.data_schema || {},
        confidence: confidence,
        fallback: data.fallback
      };
    } else {
      console.log(`[CLASSIFIER] Contenido estático recomendado (Confianza: ${confidence}%). Razón: ${data.rationale || 'Baja confianza'}`);
      return {
        interactive: false,
        component_type: null,
        component_name: null,
        rationale: data.rationale || 'Low confidence or no interactive fit',
        data_schema: {},
        confidence: confidence
      };
    }

  } catch (e) {
    console.error("[CLASSIFIER] Fallo en clasificación", e);
    return {
      interactive: false,
      component_type: null,
      component_name: null,
      rationale: "Error en análisis AI",
      data_schema: {},
      confidence: 0
    };
  }
}

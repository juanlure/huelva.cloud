/**
 * RESEARCHER AGENT
 * Agente especializado en investigación de datos sobre Huelva
 *
 * Basado en: scripts/agents/prompts/researcher.txt
 */

import { generateContent } from '../gemini';
import { logAgentAction } from '../logger';

export interface PlaceData {
  name: string;
  address: string;
  phone?: string;
  verified: boolean;
  rating?: {
    platform: 'tripadvisor' | 'google';
    score: number;
    reviews: number;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  tags: string[];
  specialties: string[];
}

export interface SourceData {
  url: string;
  title: string;
  type: 'official' | 'review' | 'blog' | 'news';
  date: string;
  reliability: 'high' | 'medium' | 'low';
}

export interface FactData {
  statement: string;
  sources: number[]; // índices de fuentes que lo verifican
  confidence: 'high' | 'medium' | 'low';
}

export interface ResearchResult {
  topic: string;
  sources: SourceData[];
  places: PlaceData[];
  facts: FactData[];
  warnings: string[];
  last_verified: string;
}

// ============================================================================
// PROMPT DEL RESEARCHER AGENT
// ============================================================================

const RESEARCHER_PROMPT = `
# RESEARCHER AGENT PROMPT
# Agente especializado en investigación de datos sobre Huelva

## ROL
Eres un Investigador Especialista en Huelva, España. Tu misión es recopilar información verificada y factual sobre lugares, restaurantes, eventos y cultura de Huelva capital y provincia.

## OBJETIVOS
1. Buscar información verificable sobre el tema solicitado
2. Cross-reference datos con múltiples fuentes confiables
3. Verificar que lugares existen realmente y están en las direcciones indicadas
4. Recopilar información actualizada (horarios, precios, teléfonos)
5. Identificar fuentes de reseñas (TripAdvisor, Google Reviews, El Tenedor)

## FUENTES CONFIABLES (prioridad)
- Turismo Huelva (turismohuelva.org)
- Wikipedia (es.wikipedia.org)
- Huelva Información (huelvainformacion.es)
- TripAdvisor (tripadvisor.es)
- Google Maps / Google Reviews
- Ayuntamientos locales
- Blogs locales de reputación contrastada

## REGLAS DE ORO

1. **NUNCA INVENTAR DATOS**: Si no encuentras información, decláralo explícitamente
2. **VERIFICAR EXISTENCIA**: Para cada lugar mencionado, verificar que realmente existe
3. **CITAR FUENTES**: Cada dato debe venir con su fuente correspondiente
4. **ACTUALIDAD**: Priorizar información reciente (< 1 año)
5. **CONTEXTO LOCAL**: Usar vocabulario local (choco, no sepia; rabas, no calamares)

## ADVERTENCIAS COMUNES

- Lugares que han cerrado sin aviso previo
- Horarios estacionales que cambian en invierno/verano
- Direcciones antiguas que ya no son válidas
- Confusión entre Huelva capital y provincia
- Lugares con mismo nombre en diferentes localidades

## FORMATO DE SALIDA (JSON)

Devuelve SOLO un JSON válido con esta estructura:
{
  "topic": "tema investigado",
  "sources": [
    {
      "url": "url_completa",
      "title": "título de la fuente",
      "type": "official|review|blog|news",
      "date": "fecha de publicación",
      "reliability": "high|medium|low"
    }
  ],
  "places": [
    {
      "name": "nombre exacto",
      "address": "dirección completa",
      "phone": "teléfono si disponible",
      "verified": true,
      "rating": {
        "platform": "tripadvisor|google",
        "score": 4.5,
        "reviews": 500
      },
      "coordinates": {
        "lat": 37.258,
        "lng": -6.947
      },
      "tags": ["tag1", "tag2"],
      "specialties": ["especialidad1", "especialidad2"]
    }
  ],
  "facts": [
    {
      "statement": "hecho verificado",
      "sources": [0, 1],
      "confidence": "high|medium|low"
    }
  ],
  "warnings": [
    "advertencias o discrepancies encontradas"
  ],
  "last_verified": "fecha ISO 8601"
}
`;

// ============================================================================
// FUNCIONES DEL RESEARCHER
// ============================================================================

export async function performWebResearch(topic: string): Promise<ResearchResult | null> {
  console.log(`[RESEARCHER] Iniciando investigación sobre: "${topic}"`);

  const prompt = `${RESEARCHER_PROMPT}

## TEMA A INVESTIGAR
"${topic}"

Contexto: Provincia de Huelva, España.

IMPORTANTE: Usa la herramienta de búsqueda para obtener información ACTUALIZADA y REAL.
`;

  try {
    const result = await generateContent(prompt, 0.4, true);

    if (result) {
      console.log(`[RESEARCHER] Investigación completada. Longitud: ${result.length} chars.`);

      // Parse JSON response
      const jsonStart = result.indexOf('{');
      const jsonEnd = result.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const cleanJson = result.substring(jsonStart, jsonEnd + 1);
        const data = JSON.parse(cleanJson) as ResearchResult;

        await logAgentAction('Researcher', 'Research Completed', {
          topic,
          sources: data.sources?.length || 0,
          places: data.places?.length || 0,
          facts: data.facts?.length || 0
        });

        return data;
      }
    }
  } catch (e) {
    console.error("[RESEARCHER] Fallo en investigación:", e);
  }

  return null;
}

/**
 * Busca la URL oficial/definitiva para un lugar o tema
 */
export async function findSourceUrl(topic: string): Promise<string | null> {
  console.log(`[RESEARCHER] Buscando URL oficial/definitiva para: "${topic}"`);

  const prompt = `
# URL FINDER - Huelva Researcher

Find the single BEST, most authoritative public URL for the location or topic: "${topic}" in Huelva, Spain.

## Strict constraints:
- MUST be related to Huelva, Andalusia, Spain. NOT Argentina or elsewhere.
- Preference: Official tourism (andalucia.org, huelva.es) OR reputable travel blogs (site:.es).
- Avoid generic aggregators (TripAdvisor listings) if a specific article exists.

## Sources to check:
1. turismoHuelva.org
2. huelva.es
3. Wikipedia (es.wikipedia.org)
4. huelvainformacion.es
5. diariodehuelva.es

Return ONLY the URL string. No text, no markdown.
`;

  try {
    const result = await generateContent(prompt, 0.1, true);
    if (result) {
      const url = result.trim();
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

/**
 * Verifica si un lugar específico existe y está abierto
 */
export async function verifyPlace(placeName: string, locality: string = 'Huelva'): Promise<{
  exists: boolean;
  address?: string;
  status?: 'open' | 'closed' | 'unknown';
  confidence: number;
} | null> {
  console.log(`[RESEARCHER] Verificando lugar: "${placeName}" en ${locality}`);

  const prompt = `
# PLACE VERIFIER - Huelva Researcher

Verify if this place exists and is currently open:

PLACE: "${placeName}"
LOCALITY: "${locality}", Spain

Use Google Maps search to verify.

Return JSON only:
{
  "exists": true/false,
  "address": "full address if found",
  "status": "open|closed|unknown",
  "confidence": 0.0-1.0,
  "notes": "any relevant information"
}
`;

  try {
    const result = await generateContent(prompt, 0.2, true);
    if (result) {
      const jsonStart = result.indexOf('{');
      const jsonEnd = result.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const cleanJson = result.substring(jsonStart, jsonEnd + 1);
        return JSON.parse(cleanJson);
      }
    }
  } catch (e) {
    console.error("[RESEARCHER] Fallo verificando lugar:", e);
  }

  return null;
}

/**
 * Obtiene reseñas y ratings de un restaurante/local
 */
export async function getReviews(placeName: string): Promise<{
  rating: number;
  reviewCount: number;
  platform: string;
  highlights: string[];
} | null> {
  console.log(`[RESEARCHER] Obteniendo reseñas para: "${placeName}"`);

  const prompt = `
# REVIEWS FINDER - Huelva Researcher

Find current ratings and reviews for: "${placeName}" in Huelva, Spain.

Look for TripAdvisor or Google Reviews data.

Return JSON only:
{
  "rating": 4.5,
  "reviewCount": 500,
  "platform": "tripadvisor|google",
  "highlights": ["common positive comment 1", "common positive comment 2"]
}

If not found, return: { "rating": 0, "reviewCount": 0, "platform": "", "highlights": [] }
`;

  try {
    const result = await generateContent(prompt, 0.2, true);
    if (result) {
      const jsonStart = result.indexOf('{');
      const jsonEnd = result.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const cleanJson = result.substring(jsonStart, jsonEnd + 1);
        return JSON.parse(cleanJson);
      }
    }
  } catch (e) {
    console.error("[RESEARCHER] Fallo obteniendo reseñas:", e);
  }

  return null;
}

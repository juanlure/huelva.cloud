/**
 * IMAGE RESEARCHER AGENT
 * Agente especializado en búsqueda de imágenes libres de derechos
 *
 * Basado en: scripts/agents/prompts/image-researcher.txt
 */

import { generateContent, isAiEnabled } from '../gemini';

// ============================================================================
// INTERFACES
// ============================================================================

export interface ImageAlternative {
  url: string;
  reason: string;
}

export interface ImageResult {
  topic: string;
  query_used: string;
  selected_image: {
    url: string;
    source: 'unsplash' | 'pexels' | 'pixabay';
    photographer?: string;
    description: string;
    keywords: string[];
    resolution: string;
    relevance_score: number;
  };
  alternatives: ImageAlternative[];
}

// ============================================================================
// QUERIES DE BÚSQUEDA POR CATEGORÍA
// ============================================================================

const QUERIES_BY_CATEGORY = {
  gastronomy: [
    "spanish tapas",
    "fried calamari",
    "fried cuttlefish",
    "spanish seafood",
    "gambas",
    "jamón ibérico",
    "andalusia food",
    "spanish food"
  ],
  beaches: [
    "andalusia beach",
    "spain coast",
    "huelva beach",
    "atlantic beach spain",
    "sandy beach sunset",
    "fishing boat beach",
    "dunes spain"
  ],
  architecture: [
    "andalusia white houses",
    "southern spain architecture",
    "spanish colonial architecture",
    "victorian houses spain",
    "historic building spain",
    "cathedral spain",
    "spanish plaza"
  ],
  nature: [
    "flamingos spain",
    "wetlands spain",
    "marismas",
    "pinewood beach",
    "mediterranean forest",
    "birds nature"
  ],
  sunset: [
    "sunset harbor",
    "spain skyline",
    "orange sunset spain",
    "golden hour city",
    "river sunset"
  ]
};

// ============================================================================
// PROMPT DEL IMAGE RESEARCHER AGENT
// ============================================================================

const IMAGE_RESEARCHER_PROMPT = `
# IMAGE RESEARCHER AGENT PROMPT
# Agente especializado en búsqueda de imágenes para contenido de Huelva

## ROL
Eres un Investigador de Imágenes especializado en fotografía de Huelva y Andalucía. Tu misión es encontrar imágenes libres de derechos que representen auténticamente el contenido sobre el que escribimos.

## OBJETIVOS

1. **Autenticidad**: Las imágenes deben parecerse realmente a Huelva/Andalucía
2. **Calidad**: Resolución mínima 1200px ancho para desktop
3. **Legalidad**: Solo usar imágenes libres de derechos (Unsplash, Pexels, Pixabay)
4. **Relevancia**: La imagen debe tener relación directa con el tema
5. **Variedad**: Evitar repetir la misma imagen en varios artículos

## FUENTES DE IMÁGENES

### Unsplash (Prioridad #1)
- URL base: \`https://images.unsplash.com\`
- Búsqueda: \`https://unsplash.com/s/photos/[query]\`
- Licencia: Libre para uso comercial sin atribución

Formato de URL:
\`\`\`
https://images.unsplash.com/photo-[ID]?q=80&w=1200&fit=crop
\`\`\`

### Pexels (Alternativa)
- URL base: \`https://images.pexels.com\`
- Búsqueda: \`https://www.pexels.com/search/[query]/\`

### Pixabay (Alternativa 2)
- URL base: \`https://images.pixabay.com\`
- Búsqueda: \`https://pixabay.com/images/search/[query]/\`

## QUERIES DE BÚSQUEDA POR CATEGORÍA

### Gastronomía
- "spanish tapas" - Tapas variadas
- "fried calamari" - Calamares/rabas
- "fried cuttlefish" - Choco frito
- "spanish seafood" - Marisco español
- "gambas" - Gambas
- "jamón ibérico" - Jamón
- "spanish food" - Comida española
- "andalusia food" - Comida andaluza

### Playas y Costa
- "andalusia beach" - Playas andaluzas
- "spain coast" - Costa española
- "huelva beach" - Playas de Huelva (si hay)
- "atlantic beach spain" - Playas atlánticas españolas
- "sandy beach sunset" - Playa atardecer
- "fishing boat beach" - Barco pesquero en playa
- "dunes spain" - Dunas España

### Arquitectura y Monumentos
- "andalusia white houses" - Casas blancas andaluzas
- "southern spain architecture" - Arquitectura sur de España
- "spanish colonial architecture" - Arquitectura colonial
- "victorian houses spain" - Casas victorianas España
- "historic building spain" - Edificios históricos
- "cathedral spain" - Catedrales
- "spanish plaza" - Plazas españolas

### Naturaleza
- "flamingos spain" - Flamencos en España
- "wetlands spain" - Humedales españoles
- "marismas" - Marismas
- "pinewood beach" - Pinar en playa
- "mediterranean forest" - Bosque mediterráneo
- "birds nature" - Aves en la naturaleza

### Atardeceres y Vistas
- "sunset harbor" - Atardecer en puerto
- "spain skyline" - Skyline de ciudades españolas
- "orange sunset spain" - Atardecer naranja España
- "golden hour city" - Ciudad hora dorada
- "river sunset" - Río atardecer

## CRITERIOS DE SELECCIÓN

### ✅ BUENA IMAGEN
- Luz natural (no flash)
- Colores vibrantes pero naturales
- Composición equilibrada
- Suficiente espacio para superponer texto (si necesario)
- Aspecto mediterráneo/andaluz (luz cálida, azulejos, blancos)

### ❌ IMAGEN A EVITAR
- Personas claramente reconocibles (privacidad)
- Logos o marcas visibles
- Filters excesivos
- Resolución baja (<800px)
- Lugares que claramente no son España (ej. skyline de Nueva York)

## FORMATO DE SALIDA JSON

{
  "topic": "tema de la imagen",
  "query_used": "query de búsqueda",
  "selected_image": {
    "url": "https://images.unsplash.com/photo-xxx?w=1200&q=80",
    "source": "unsplash",
    "photographer": "nombre del fotógrafo",
    "description": "descripción de la imagen",
    "keywords": ["keyword1", "keyword2"],
    "resolution": "1200x800",
    "relevance_score": 0.95
  },
  "alternatives": [
    {
      "url": "url_alternativa",
      "reason": "razón por la que se incluye como alternativa"
    }
  ]
}

## WORKFLOW DE BÚSQUEDA

1. **Identificar tema principal** del artículo
2. **Generar 3-5 queries** de búsqueda alternativas
3. **Buscar en Unsplash** con cada query
4. **Filtrar resultados** por:
   - Resolución (>1200px)
   - Relevancia visual
   - Calidad estética
   - Ausencia de elementos conflictivos
5. **Seleccionar la mejor opción**
6. **Documentar 2-3 alternativas** por si acaso
7. **Verificar que no esté ya usada** en otros artículos

## CHECKLIST FINAL

Antes de devolver una imagen:
- [ ] Resolución >= 1200px ancho
- [ ] URL completa y funcional
- [ ] Descripción clara de contenido
- [ ] Fuente identificada
- [ ] Relevancia con el tema > 0.8
- [ ] No duplicada en otros artículos
- [ ] Sin elementos legales problemáticos
`;

// ============================================================================
// FUNCIONES DEL IMAGE RESEARCHER
// ============================================================================

/**
 * Busca la mejor imagen para un tema
 */
export async function searchImage(topic: string, category?: string): Promise<ImageResult | null> {
  console.log(`[IMAGE_RESEARCHER] Buscando imagen para: "${topic}"`);

  if (!isAiEnabled) {
    return getFallbackImage(topic);
  }

  // Determinar categoría
  const cat = category || classifyTopic(topic);

  const prompt = `
${IMAGE_RESEARCHER_PROMPT}

## TEMA A BUSCAR
"${topic}"
CATEGORÍA: ${cat}

---

Usa la herramienta de búsqueda para encontrar la mejor imagen en Unsplash.

Devuelve SOLO el JSON con el resultado.
`;

  try {
    const response = await generateContent(prompt, 0.3, true);
    const jsonStart = response?.indexOf('{') ?? -1;
    const jsonEnd = response?.lastIndexOf('}') ?? -1;

    if (response && jsonStart !== -1 && jsonEnd !== -1) {
      const cleanJson = response.substring(jsonStart, jsonEnd + 1);
      const result = JSON.parse(cleanJson) as ImageResult;
      console.log(`[IMAGE_RESEARCHER] Imagen encontrada: ${result.selected_image.url}`);
      return result;
    }
  } catch (e) {
    console.error("[IMAGE_RESEARCHER] Error buscando imagen:", e);
  }

  return getFallbackImage(topic);
}

/**
 * Busca múltiples imágenes para una galería
 */
export async function searchGallery(topic: string, count: number = 3): Promise<ImageResult[]> {
  console.log(`[IMAGE_RESEARCHER] Buscando galería de ${count} imágenes para: "${topic}"`);

  const results: ImageResult[] = [];
  const category = classifyTopic(topic);

  // Generar queries variadas
  const queries = QUERIES_BY_CATEGORY[category] || QUERIES_BY_CATEGORY.gastronomy;

  for (let i = 0; i < Math.min(count, queries.length); i++) {
    const prompt = `
${IMAGE_RESEARCHER_PROMPT}

## BÚSQUEDA ${i + 1}/${count}
TEMA: "${topic}"
QUERY ESPECÍFICO: "${queries[i]}"

---

Usa la búsqueda de Unsplash con este query específico.

Devuelve SOLO el JSON.
`;

    try {
      const response = await generateContent(prompt, 0.3, true);
      const jsonStart = response?.indexOf('{') ?? -1;
      const jsonEnd = response?.lastIndexOf('}') ?? -1;

      if (response && jsonStart !== -1 && jsonEnd !== -1) {
        const cleanJson = response.substring(jsonStart, jsonEnd + 1);
        const result = JSON.parse(cleanJson) as ImageResult;
        results.push(result);
      }
    } catch (e) {
      console.error(`[IMAGE_RESEARCHER] Error con query ${i}:`, e);
    }
  }

  return results;
}

/**
 * Clasifica el tema en una categoría visual
 */
function classifyTopic(topic: string): keyof typeof QUERIES_BY_CATEGORY {
  const lower = topic.toLowerCase();

  if (lower.includes('comer') || lower.includes('restaurante') || lower.includes('tapas') ||
      lower.includes('choco') || lower.includes('gamba') || lower.includes('calamares')) {
    return 'gastronomy';
  }
  if (lower.includes('playa') || lower.includes('mar') || lower.includes('costa') ||
      lower.includes('baño') || lower.includes('orilla')) {
    return 'beaches';
  }
  if (lower.includes('monumento') || lower.includes('catedral') || lower.includes('iglesia') ||
      lower.includes('barrio') || lower.includes('edificio') || lower.includes('arquitectura')) {
    return 'architecture';
  }
  if (lower.includes('parque') || lower.includes('marisma') || lower.includes('flamenco') ||
      lower.includes('ave') || lower.includes('naturaleza') || lower.includes('bosque')) {
    return 'nature';
  }
  if (lower.includes('atardecer') || lower.includes('sunset') || lower.includes('puesta') ||
      lower.includes('amanecer') || lower.includes('amanecer')) {
    return 'sunset';
  }

  return 'gastronomy';
}

/**
 * Imagen de fallback cuando falla la búsqueda
 */
function getFallbackImage(topic: string): ImageResult {
  const category = classifyTopic(topic);

  const fallbackUrls: Record<string, string> = {
    gastronomy: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?q=80&w=1200',
    beaches: 'https://images.unsplash.com/photos/fishing-boat-rests-on-a-sandy-beach-at-sunset-NnoYxm4hlxg?q=80&w=1200',
    architecture: 'https://images.unsplash.com/photos/white-buildings-line-a-narrow-european-street-Gl4DrBl80sA?q=80&w=1200',
    nature: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200',
    sunset: 'https://images.unsplash.com/photos/a-sunset-over-a-harbor-with-boats-in-the-water-fcSEoJKPWcY?q=80&w=1200'
  };

  const url = fallbackUrls[category] || fallbackUrls.gastronomy;

  return {
    topic,
    query_used: category,
    selected_image: {
      url,
      source: 'unsplash',
      description: `Fallback image for ${topic}`,
      keywords: [category, 'fallback'],
      resolution: '1200x800',
      relevance_score: 0.5
    },
    alternatives: []
  };
}

/**
 * URLs curadas específicas para Huelva
 */
export const CURATED_HUELVA_IMAGES = {
  choco: {
    url: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?q=80&w=1200',
    description: 'Calamares fritos en plato blanco',
    relevance: 5
  },
  playas: {
    url: 'https://images.unsplash.com/photos/fishing-boat-rests-on-a-sandy-beach-at-sunset-NnoYxm4hlxg?q=80&w=1200',
    description: 'Barco pesquero en playa al atardecer',
    relevance: 5
  },
  casasBlancas: {
    url: 'https://images.unsplash.com/photos/white-buildings-line-a-narrow-european-street-Gl4DrBl80sA?q=80&w=1200',
    description: 'Calle estrecha con casas blancas (Carmona)',
    relevance: 5
  },
  muelle: {
    url: 'https://images.unsplash.com/photos/a-sunset-over-a-harbor-with-boats-in-the-water-fcSEoJKPWcY?q=80&w=1200',
    description: 'Atardecer en puerto con barcos',
    relevance: 5
  },
  tapas: {
    url: 'https://images.unsplash.com/photos/a-white-plate-topped-with-meat-and-vegetables-zbO0yIqHk0g?q=80&w=1200',
    description: 'Plato blanco con tapas variadas',
    relevance: 4
  }
};

/**
 * Obtiene una imagen curada para un tema específico de Huelva
 */
export function getCuratedImage(topic: string): ImageResult | null {
  const lower = topic.toLowerCase();

  if (lower.includes('choco') || lower.includes('calamar') || lower.includes('raba')) {
    return {
      topic,
      query_used: 'choco',
      selected_image: {
        ...CURATED_HUELVA_IMAGES.choco,
        source: 'unsplash',
        keywords: ['choco', 'calamares', 'frito'],
        resolution: '1200x800',
        relevance_score: 0.95
      },
      alternatives: []
    };
  }

  if (lower.includes('playa')) {
    return {
      topic,
      query_used: 'playas',
      selected_image: {
        ...CURATED_HUELVA_IMAGES.playas,
        source: 'unsplash',
        keywords: ['playa', 'atardecer', 'barco'],
        resolution: '1200x800',
        relevance_score: 0.95
      },
      alternatives: []
    };
  }

  if (lower.includes('barrio') || lower.includes('casas')) {
    return {
      topic,
      query_used: 'casas blancas',
      selected_image: {
        ...CURATED_HUELVA_IMAGES.casasBlancas,
        source: 'unsplash',
        keywords: ['casas blancas', 'arquitectura', 'andalucía'],
        resolution: '1200x800',
        relevance_score: 0.9
      },
      alternatives: []
    };
  }

  return null;
}

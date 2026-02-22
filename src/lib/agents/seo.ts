/**
 * SEO AGENT
 * Agente especializado en optimización SEO y datos estructurados
 *
 * Basado en: mejores prácticas SEO para contenido local
 */

import { generateContent, isAiEnabled } from '../gemini';
import type { Draft } from './writer';
import { safeJsonParse } from './utils';

export interface SeoOptimization {
  originalTitle: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  schemaOrg?: any; // JSON-LD
}

// ============================================================================
// PROMPT DEL SEO AGENT
// ============================================================================

const SEO_PROMPT = `
# SEO AGENT PROMPT
# Agente especializado en optimización SEO para Huelva.cloud

## ROL
Eres un experto SEO especializado en contenido local y语义 Web (Web Semántica). Tu misión es optimizar los metadatos y generar datos estructurados Schema.org para que el contenido de Huelva.cloud sea fácilmente descubrible y entendible por los buscadores.

## CONTEXTO
- **Sitio**: Huelva.cloud - Guía local de Huelva (España) escrita por locales
- **Audiencia**: Onubenses y visitantes que buscan información auténtica
- **Target**: Posicionamiento local para "Huelva" + términos de larga cola
- **Competencia**: Portales de turismo genéricos, periódicos locales

## ESTRATEGIA SEO

### 1. TITLE TAG (Meta Title)
- **Longitud**: 50-60 caracteres (máx 60px en SERP)
- **Estructura preferida**: [Título atractivo] | Huelva.cloud
- **Palabras clave**: Incluir siempre "Huelva" cuando sea relevante
- **Diferenciador**: Añadir adjetivos que den autenticidad (guía local, recomendaciones, verdad sobre...)

Ejemplos:
- "Ruta del Choco: Dónde comer el mejor en Huelva | Huelva.cloud"
- "Playas de Huelva: Las que valen la pena (y las que no) | Huelva.cloud"
- "Semana Santa en Huelva: Guía del que no quiere agobios | Huelva.cloud"

### 2. META DESCRIPTION
- **Longitud**: 150-160 caracteres (máx 2 líneas en SERP)
- **Objetivo**: Maximizar CTR (Click-Through Rate)
- **Elementos**:
  - Gancho inicial (pregunta, afirmación provocadora)
  - Promesa de valor (qué va a ganar el lector)
  - Diferenciador (por qué este artículo vs otros)

Ejemplos:
- "La verdad sobre donde comer choco en Huelva. Nada de turistas, solo sitios donde va la gente de aquí. Precios, horarios y qué pedir."
- "Playas de Huelva sin secretos. Te cuento cuáles son las mejores, cuándo ir para evitar levante y qué llevar. Guía local 100% honesta."

### 3. SLUG
- **Formato**: kebab-case, lowercase
- **Longitud**: 3-5 palabras máximo
- **Palabras clave**: Términos de búsqueda reales
- **Evitar**: palabras vacías (de, la, el, en, para)

Ejemplos:
- "ruta-del-choco-huelva" ✓
- "mejores-playas-huelva" ✓
- "donde-comer-choco-frito" ✓

### 4. KEYWORDS (Long-tail Local)
- **Cantidad**: 5-8 términos
- **Tipo**: Long-tail (3+ palabras)
- **Intención**: Informacional y de navegación
- **Localidad**: Incluir variantes (Huelva, Huelva capital, provincia, costa, etc.)

Ejemplos por categoría:
- Gastronomía: ["choco frito Huelva", "donde comer choco Huelva capital", "mejores tapas Huelva", "restaurantes Huelva centro"]
- Playas: ["playas Huelva provincia", "mejores playas Huelva", "playas Matalascañas", "playas Punta Umbría"]
- Cultura: ["Muelle del Tinto Huelva", "Barrio Reina Victoria", "Semana Santa Huelva", "Rocío guía"]

### 5. SCHEMA.ORG (JSON-LD)
Generar datos estructurados según tipo de contenido:

**Article/NewsArticle** (Noticias, guías):
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Título del artículo",
  "description": "Descripción",
  "author": {
    "@type": "Person",
    "name": "Nombre del autor"
  },
  "datePublished": "2026-01-25",
  "dateModified": "2026-01-25",
  "publisher": {
    "@type": "Organization",
    "name": "Huelva.cloud",
    "logo": {
      "@type": "ImageObject",
      "url": "https://huelva.cloud/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://huelva.cloud/articulo/slug"
  }
}
\`\`\`

**Restaurant** (Cuando es sobre un restaurante específico):
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Nombre del restaurante",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle, número",
    "addressLocality": "Huelva",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "500"
  },
  "priceRange": "€€",
  "servesCuisine": "Andalusian"
}
\`\`\`

**Place** (Lugares de interés):
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "Nombre del lugar",
  "address": {...},
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "37.258",
    "longitude": "-6.947"
  }
}
\`\`\`

**ItemList** (Listas y comparativas):
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Thing",
        "name": "Elemento 1"
      }
    }
  ]
}
\`\`\`

## RESTRICCIONES

1. **NUNCA inventar datos**: Si no tienes coordenadas, rating, etc., omite el campo
2. **Vocabulario local**: Usa términos que la gente realmente busca (choco, no sepia)
3. **URLs absolutas**: Todas las URLs deben incluir el dominio completo
4. **Fechas ISO 8601**: Formato YYYY-MM-DD
5. **JSON válido**: El JSON-LD debe ser parseable sin errores

## SALIDA

Devuelve SOLO un JSON válido con:
{
  "slug": "...",
  "metaTitle": "...",
  "metaDescription": "...",
  "keywords": ["...", "..."],
  "schemaOrg": { ... }
}
`;

// ============================================================================
// FUNCIONES DEL SEO AGENT
// ============================================================================

export async function optimizeSeo(draft: Draft): Promise<SeoOptimization> {
  console.log(`[SEO] Optimizando artículo: "${draft.title}"`);

  if (!isAiEnabled) {
    return {
      originalTitle: draft.title,
      metaTitle: draft.title,
      metaDescription: draft.excerpt || 'Artículo sobre Huelva',
      slug: draft.slug,
      keywords: ['huelva', 'mock']
    };
  }

  const prompt = `
${SEO_PROMPT}

## ARTÍCULO A OPTIMIZAR

TÍTULO: "${draft.title}"
EXCERPT: "${draft.excerpt}"
CONTENIDO (primeros 800 chars): "${draft.content.substring(0, 800)}..."
CATEGORÍA: "${draft.category}"
AUTOR: "${draft.author}"

---

## TU TAREA

Optimiza los metadatos SEO según las guidelines above. Devuelve SOLO el JSON.
`;

  try {
    const response = await generateContent(prompt, 0.3);
    const data = safeJsonParse<any>(response, {});

    return {
      originalTitle: draft.title,
      metaTitle: data.metaTitle || draft.title,
      metaDescription: data.metaDescription || draft.excerpt,
      slug: data.slug || draft.slug,
      keywords: data.keywords || [],
      schemaOrg: data.schemaOrg || null
    };

  } catch (e) {
    console.error("[SEO] Fallo en optimización", e);
    // Fallback seguro
    return {
      originalTitle: draft.title,
      metaTitle: draft.title,
      metaDescription: draft.excerpt,
      slug: draft.slug,
      keywords: []
    };
  }
}

/**
 * Genera un slug optimizado SEO
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Spaces to hyphens
    .replace(/-+/g, '-') // Multiple hyphens to single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 60); // Max length
}

/**
 * Extrae palabras clave del contenido
 */
export async function extractKeywords(content: string, title: string): Promise<string[]> {
  console.log(`[SEO] Extrayendo keywords del contenido...`);

  if (!isAiEnabled) return [];

  const prompt = `
# KEYWORD EXTRACTOR - Huelva.cloud

Extrae 5-8 palabras clave long-tail (3+ palabras) para SEO local.

TÍTULO: "${title}"
CONTENIDO: "${content.substring(0, 1000)}..."

Reglas:
- Términos que la gente buscaría en Google
- Contexto: Huelva, España
- Preferiblemente long-tail (3+ palabras)
- Una por línea, sin comillas

Devuelve solo la lista, sin JSON ni bullets.
`;

  try {
    const response = await generateContent(prompt, 0.2);
    if (!response) return [];

    return response
      .split('\n')
      .map(line => line.trim().replace(/^[-*•]\s*/, ''))
      .filter(line => line.length > 3 && line.length < 100)
      .slice(0, 8);
  } catch (e) {
    console.error("[SEO] Error extrayendo keywords", e);
    return [];
  }
}

/**
 * Genera datos Schema.org para un tipo específico
 */
export async function generateSchema(
  type: 'Article' | 'NewsArticle' | 'Restaurant' | 'Place' | 'ItemList',
  data: any
): Promise<any> {
  console.log(`[SEO] Generando Schema.org tipo: ${type}`);

  if (!isAiEnabled) return null;

  const prompt = `
# SCHEMA.ORG GENERATOR - Huelva.cloud

Genera un JSON-LD válido para Schema.org tipo: ${type}

DATOS DISPONIBLES:
${JSON.stringify(data, null, 2)}

Reglas:
- JSON válido y parseable
- Solo @context y @type son obligatorios
- Si faltan datos opcionales, omite el campo
- Incluir publisher: Huelva.cloud cuando aplique

Devuelve solo el JSON, sin markdown.
`;

  try {
    const response = await generateContent(prompt, 0.1);
    if (!response) return null;

    // Limpiar markdown si existe
    const clean = response.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error("[SEO] Error generando Schema.org", e);
    return null;
  }
}

/**
 * Calcula una puntuación SEO preliminar (sin IA)
 */
export function quickSeoScore(metaTitle: string, metaDescription: string, slug: string): {
  score: number;
  issues: string[];
} {
  const issues: string[] = [];
  let score = 100;

  // Title length
  if (metaTitle.length > 60) {
    issues.push('Title demasiado largo (>60 chars)');
    score -= 10;
  }
  if (metaTitle.length < 30) {
    issues.push('Title demasiado corto (<30 chars)');
    score -= 5;
  }

  // Description length
  if (metaDescription.length > 160) {
    issues.push('Description demasiado larga (>160 chars)');
    score -= 10;
  }
  if (metaDescription.length < 120) {
    issues.push('Description demasiado corta (<120 chars)');
    score -= 5;
  }

  // Slug quality
  if (slug.split('-').length > 6) {
    issues.push('Slug con demasiadas palabras');
    score -= 5;
  }
  if (slug.includes('de-la-') || slug.includes('de-el-')) {
    issues.push('Slug contiene palabras vacías');
    score -= 5;
  }

  return { score: Math.max(0, score), issues };
}

import { generateContent, isAiEnabled } from '../gemini';
import { Draft } from './writer';
import { safeJsonParse } from './utils';

export interface SeoOptimization {
  originalTitle: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  schemaOrg?: any; // JSON-LD
}

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
    Actúa como un experto SEO y desarrollador Web Semántica.
    Optimiza los metadatos y genera datos estructurados para el siguiente artículo de "Huelva.is".

    TÍTULO ACTUAL: "${draft.title}"
    RESUMEN: "${draft.excerpt}"
    CONTENIDO (snippet): "${draft.content.substring(0, 800)}..."
    CATEGORÍA: "${draft.category}"

    TAREA:
    1. **Slug**: URL friendly, corto (ej: 'mejores-playas-huelva').
    2. **Meta Title**: < 60 chars, atractivo.
    3. **Meta Description**: < 160 chars, CTR alto.
    4. **Keywords**: 5-8 términos long-tail locales.
    5. **Schema.org (JSON-LD)**: Genera el objeto JSON-LD válido.
       - Si es noticia/guía: "Article" o "NewsArticle".
       - Si es sobre un lugar específico (restaurante, playa): "Place" o "Restaurant".
       - Si es una lista: "ItemList".
       - Incluye propiedades como "headline", "description", "author", "datePublished" (usa placeholders).

    SALIDA JSON VÁLIDO:
    {
      "slug": "...",
      "metaTitle": "...",
      "metaDescription": "...",
      "keywords": ["..."],
      "schemaOrg": { "@context": "https://schema.org", ... }
    }
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

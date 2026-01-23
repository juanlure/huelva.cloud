import { generateContent, isAiEnabled } from '../gemini';
import { Draft } from './writer';

export interface SeoOptimization {
  originalTitle: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
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
    Actúa como un experto SEO especializado en medios digitales locales.
    Optimiza los metadatos para el siguiente artículo de "Huelva.is".

    TÍTULO ACTUAL: "${draft.title}"
    RESUMEN: "${draft.excerpt}"
    CONTENIDO (snippet): "${draft.content.substring(0, 500)}..."

    TAREA:
    1. Genera un **Slug** (URL friendly): Corto, minúsculas, guiones, sin stopwords (ej: 'mejores-playas-huelva').
    2. Genera un **Meta Title**: Atractivo, < 60 caracteres.
    3. Genera una **Meta Description**: < 160 caracteres, incitando al clic.
    4. Extrae 5 **Keywords** principales.

    SALIDA JSON VÁLIDO:
    {
      "slug": "...",
      "metaTitle": "...",
      "metaDescription": "...",
      "keywords": ["tag1", "tag2"...]
    }
  `;

  try {
    const response = await generateContent(prompt, 0.3); // Baja temperatura para precisión
    const cleanJson = response?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
    const data = JSON.parse(cleanJson);

    return {
      originalTitle: draft.title,
      metaTitle: data.metaTitle || draft.title,
      metaDescription: data.metaDescription || draft.excerpt,
      slug: data.slug || draft.slug,
      keywords: data.keywords || []
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

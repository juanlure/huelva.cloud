import { generateContent, isAiEnabled } from '../gemini';
import { safeJsonParse } from './utils';
import { Guide } from '../../types/guide';

export async function generateGuideStructure(topic: string): Promise<Guide | null> {
  console.log(`[GUIDE_AGENT] Generando estructura para guía: ${topic}`);

  if (!isAiEnabled) {
    console.warn("[GUIDE_AGENT] AI deshabilitada");
    return null;
  }

  const prompt = `
    # ROL
    Eres "El Choco", un experto local de Huelva con décadas de experiencia. Conoces cada rincón, cada bar y cada leyenda.
    Tu misión es crear una "GUÍA ESTRUCTURADA" sobre el tema: "${topic}".

    # FORMATO DE SALIDA (JSON ESTRICTO)
    Debes generar un JSON válido que cumpla con la interfaz 'Guide'.
    
    Estructura requerida:
    {
      "slug": "kebab-case-slug",
      "title": "Título Epico y Periodístico",
      "subtitle": "Subtítulo gancho que resuma el valor de la guía.",
      "authorId": "Rocío Limón", 
      "heroImage": "URL_IMAGEN_UNSPLASH_RELEVANTE",
      "tags": ["Tag1", "Tag2"],
      "createdAt": "YYYY-MM-DD",
      "updatedAt": "YYYY-MM-DD",
      "chapters": [
        {
          "id": "intro",
          "title": "Título del Capítulo",
          "summary": "Resumen breve",
          "content": "<p>Texto narrativo en HTML. Usa <strong>negritas</strong> para énfasis. Sé personal, directo y honesto. Nada de lenguaje de marketing.</p>",
          "places": [
            {
              "id": "place-1",
              "name": "Nombre del Sitio",
              "description": "Descripción honesta. Por qué ir, qué pedir.",
              "priceRange": "€ | €€ | €€€",
              "tip": "Consejo específico (ej: ve pronto, pide en barra).",
              "images": ["URL_IMAGEN_UNSPLASH"],
              "bestFor": ["Vistas", "Tapeo"],
              "googleMapsUrl": "#" 
            }
          ]
        }
      ]
    }

    # REGLAS DE CONTENIDO
    1. **Estructura en Capítulos**: Divide la guía en 3-4 capítulos lógicos (ej: por zonas, por precio, o por "vibes").
    2. **Lugares Reales**: Inventa ID pero usa nombres de sitios que REALMENTE existan en Huelva si los conoces, o generalizaciones plausibles si alucinas.
    3. **Tono Choquero**:
       - Honestidad brutal. Si un sitio es caro, dilo.
       - Nada de "maravilloso enclave único". Habla como un colega.
    4. **Imágenes**: Usa URLs de Unsplash que sean visualmente atractivas.

    Devuelve SOLO el JSON.
    `;

  try {
    const response = await generateContent(prompt, 0.7);
    const data = safeJsonParse<any>(response, null);

    if (!data) {
      console.error("[GUIDE_AGENT] Falló el parsing del JSON generado.");
      return null;
    }

    // Validate basic structure (optional but recommended)
    if (!data.chapters || !Array.isArray(data.chapters)) {
      console.error("[GUIDE_AGENT] JSON incompleto: faltan capítulos.");
      return null;
    }

    return data as Guide;
  } catch (e) {
    console.error("[GUIDE_AGENT] Error generando datos", e);
    return null;
  }
}

/**
 * DESIGNER AGENT
 * Agente especializado en generación de imágenes y visuales
 *
 * Basado en: scripts/agents/prompts/image-researcher.txt
 */

import { generateContent, isAiEnabled, geminiClient } from '../gemini';
import { uploadFromUrl, uploadFromBase64 } from '../storage';
import { findSourceUrl } from './researcher';
import { scrapeArticle } from './scraper';

// ============================================================================
// ESTÉTICA HUELVA (STYLE GUIDE)
// ============================================================================

const HUELVA_AESTHETICS = `
# HUELVA VISUAL STYLE GUIDE
# Guía para generar imágenes que parezcan de Huelva, no genéricas

## ILUMINACIÓN
- Luz cálida atlántica, golden hour, brillante pero suave
- Evitar: Luz tropical intensa, sombras muy duras

## PAISAJE
- Dunas de arena, pinar (pino piñonero), marismas, playas planas, pueblos blancos
- Evitar: Palmeras caribeñas, acantilados rocosos tipo Algarve, rascacielos

## ARQUITECTURA
- Casas blancas andaluzas, detalles coloniales (legado inglés), líneas simples
- Evitar: Arquitectura moderna excesiva, edificios de cristal

## COLORES
- Ocre, albero (arena amarilla), blanco, verde (pino), azul (océano atlántico)
- Evitar: Turquesa caribeño, verde esmeralda tropical

## REFERENCIAS VISUALES
- Muelle del Tinto: estructura industrial, color óxido
- Barrio Reina Victoria: casas victorianas blancas
- Marismas: tonos verdosos, aves, horizonte plano
- Playas: arena dorada, oleaje atlántico (no calmado)
`;

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
// FUNCIONES DEL DESIGNER
// ============================================================================

/**
 * Genera una galería editorial de imágenes basadas en el tema
 */
export async function generateEditorialGallery(topic: string, count: number = 3): Promise<string[]> {
  if (!isAiEnabled || !geminiClient) {
    console.warn("[DESIGNER] AI disabled, using fallback gallery");
    return getFallbackImages();
  }

  console.log(`[DESIGNER] Generando galería editorial para: "${topic}"`);

  // 1. Determinar categoría del tema
  const category = classifyTopic(topic);
  const queries = QUERIES_BY_CATEGORY[category] || QUERIES_BY_CATEGORY.gastronomy;

  // 2. Generar prompts para imágenes
  const prompts = generateImagePrompts(topic, category, count);

  const galleryUrls: string[] = [];

  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    try {
      console.log(`[DESIGNER] Generando imagen ${i + 1}/${count}: ${prompt.substring(0, 50)}...`);

      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
        config: {
          responseModalities: ['IMAGE']
        }
      });

      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            const types = ['wide', 'detail', 'action'];
            const imgType = types[i] || 'misc';
            const b64 = part.inlineData.data;
            const finalSlug = `agen-${imgType}-${topic.substring(0, 15).replace(/[^a-z0-9]/gi, '-')}-${Date.now()}`;
            const url = await uploadFromBase64(b64, finalSlug);
            if (url) galleryUrls.push(url);
          }
        }
      }
    } catch (e) {
      console.error(`[DESIGNER] Error generando imagen ${i}:`, e);
    }
  }

  // Si no se generó ninguna imagen, usar fallback
  if (galleryUrls.length === 0) {
    console.warn("[DESIGNER] No se generaron imágenes, usando fallback");
    return getFallbackImages();
  }

  return galleryUrls;
}

/**
 * Genera la imagen de cabecera para un artículo
 * PRIORIDAD: Imagen real scrapeada > Imagen generada
 */
export async function generateHeaderImage(
  title: string,
  excerpt: string,
  scrapedImage?: string,
  slug: string = 'draft'
): Promise<string> {
  console.log(`[DESIGNER] Diseñando imagen de cabecera para: "${title}"`);

  // 1. PRIORIDAD ABSOLUTA: Imagen scrapeada (REAL)
  if (scrapedImage && scrapedImage.startsWith('http')) {
    console.log(`[DESIGNER] Usando imagen REAL scrapeada: ${scrapedImage}`);
    const storedUrl = await uploadFromUrl(scrapedImage, slug);
    if (storedUrl) return storedUrl;
    return scrapedImage;
  }

  // 2. ESTRATEGIA REAL IMAGE: Buscar imagen del lugar
  const isPlace = await isPhysicalPlace(title);

  if (isPlace) {
    console.log(`[DESIGNER] Detectado LUGAR FÍSICO. Buscando foto real...`);
    try {
      const sourceUrl = await findSourceUrl(title);
      if (sourceUrl) {
        const scrapedData = await scrapeArticle(sourceUrl);
        if (scrapedData?.image) {
          console.log(`[DESIGNER] ¡Foto real encontrada!`);
          const storedUrl = await uploadFromUrl(scrapedData.image, `real-${slug}`);
          if (storedUrl) return storedUrl;
          return scrapedData.image;
        }
      }
    } catch (e) {
      console.warn("[DESIGNER] Falló búsqueda de foto real", e);
    }
  }

  // 3. Fallback: AI Generation
  console.log(`[DESIGNER] Generando imagen con IA...`);
  const [generated] = await generateEditorialGallery(title, 1);
  return generated || getFallbackImages()[0];
}

/**
 * Mejora un artículo con imágenes intercaladas
 */
export async function enhanceArticleVisuals(
  content: string,
  slug: string,
  category: string = ''
): Promise<{ header: string, imageUrl: string }[]> {
  if (!isAiEnabled || !geminiClient) return [];

  if (category.toLowerCase().includes('noticia')) {
    console.log(`[DESIGNER] Skipping visuals para noticias`);
    return [];
  }

  console.log(`[DESIGNER] Enhancing visuals para: ${slug}`);

  // Extraer secciones H2 + contexto
  const regex = /<h2.*?>(.*?)<\/h2>[\s\S]*?<p>(.*?)<\/p>/gi;
  const matches: RegExpExecArray[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match);
  }

  if (matches.length === 0) {
    console.log("[DESIGNER] No se encontraron secciones H2 + P");
    return [];
  }

  const sectionsToEnhance = matches.slice(0, 3).map(m => ({
    header: m[1],
    context: m[2].replace(/<[^>]*>/g, '').substring(0, 300)
  }));

  const newImages: { header: string, imageUrl: string }[] = [];

  for (const section of sectionsToEnhance) {
    console.log(`[DESIGNER] Generando visual para: "${section.header}"`);

    try {
      const prompt = buildVisualPrompt(section.header, section.context);
      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
        config: { responseModalities: ['IMAGE'] }
      });

      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts?.[0]?.inlineData) {
        const b64 = candidate.content.parts[0].inlineData.data;
        const imgSlug = `enhance-${slug}-${section.header.substring(0, 10).replace(/[^a-z0-9]/gi, '-')}-${Date.now()}`;
        const url = await uploadFromBase64(b64, imgSlug);

        if (url) {
          newImages.push({ header: section.header, imageUrl: url });
        }
      }
    } catch (e) {
      console.error(`[DESIGNER] Error generando imagen para "${section.header}"`, e);
    }
  }

  return newImages;
}

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Clasifica el tema en una categoría visual
 */
function classifyTopic(topic: string): keyof typeof QUERIES_BY_CATEGORY {
  const lower = topic.toLowerCase();

  if (lower.includes('comer') || lower.includes('restaurante') || lower.includes('tapas') || lower.includes('choco') || lower.includes('gamba')) {
    return 'gastronomy';
  }
  if (lower.includes('playa') || lower.includes('mar') || lower.includes('costa') || lower.includes('baño')) {
    return 'beaches';
  }
  if (lower.includes('monumento') || lower.includes('catedral') || lower.includes('iglesia') || lower.includes('barrio') || lower.includes('edificio')) {
    return 'architecture';
  }
  if (lower.includes('parque') || lower.includes('marisma') || lower.includes('flamenco') || lower.includes('ave') || lower.includes('naturaleza')) {
    return 'nature';
  }
  if (lower.includes('atardecer') || lower.includes('sunset') || lower.includes('puesta') || lower.includes('amanecer')) {
    return 'sunset';
  }

  return 'gastronomy'; // Default
}

/**
 * Genera prompts para imágenes basados en el tema y categoría
 */
function generateImagePrompts(topic: string, category: string, count: number): string[] {
  const basePrompt = (type: string) => `
${HUELVA_AESTHETICS}

Create a photorealistic, cinematic 4k image.
TYPE: ${type}
SUBJECT: ${topic}
LOCATION: Huelva, Andalusia, Spain

Style: Natural lighting, authentic Spanish atmosphere, high quality.
`.trim();

  const prompts: string[] = [];

  // Siempre incluir un wide shot
  prompts.push(basePrompt("Wide establishing shot - full scene overview"));

  if (count >= 2) {
    // Segunda imagen: detalle o acción según categoría
    if (category === 'gastronomy') {
      prompts.push(basePrompt("Close-up detail - food texture, preparation"));
    } else if (category === 'beaches') {
      prompts.push(basePrompt("Atmospheric angle - water detail, sand texture"));
    } else {
      prompts.push(basePrompt("Action shot - people enjoying, atmosphere"));
    }
  }

  if (count >= 3) {
    // Tercera imagen: alternativa
    prompts.push(basePrompt("Alternative perspective - unique angle"));
  }

  return prompts;
}

/**
 * Construye un prompt visual para una sección específica
 */
function buildVisualPrompt(header: string, context: string): string {
  return `
${HUELVA_AESTHETICS}

Create a photorealistic, cinematic 4k image.

SUBJECT: ${header}
CONTEXT: ${context}

LOCATION: Huelva, Andalusia, Spain

Style: Natural lighting, authentic Spanish atmosphere, high quality.
The image should match the context described above.
`.trim();
}

/**
 * Verifica si un título parece referirse a un lugar físico
 */
async function isPhysicalPlace(title: string): Promise<boolean> {
  const placeKeywords = [
    'playa', 'cathedral', 'iglesia', 'monumento', 'parque', 'plaza',
    'muelle', 'barrio', 'castillo', 'museo', 'restaurante', 'bar'
  ];

  const lower = title.toLowerCase();
  return placeKeywords.some(kw => lower.includes(kw));
}

/**
 * Imágenes de fallback cuando falla la generación
 */
function getFallbackImages(): string[] {
  return [
    'https://images.unsplash.com/photo-1599487483441-df3f705139fb?q=80&w=1200', // Calamares
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200', // Doñana
    'https://images.unsplash.com/photo-1551095900-589578278216?q=80&w=1200', // Semana Santa
  ];
}

/**
 * Busca una imagen real en Unsplash basándose en el tema
 * (Función placeholder para futura integración con Unsplash API)
 */
export async function searchUnsplashImage(topic: string): Promise<string | null> {
  console.log(`[DESIGNER] Buscando imagen en Unsplash para: "${topic}"`);

  const category = classifyTopic(topic);
  const queries = QUERIES_BY_CATEGORY[category];

  // Usar la primera query de la categoría
  const query = queries[0];

  // URLs curadas de Unsplash (hardcoded para ahora)
  const curatedUrls: Record<string, string> = {
    gastronomy: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?q=80&w=1200',
    beaches: 'https://images.unsplash.com/photos/fishing-boat-rests-on-a-sandy-beach-at-sunset-NnoYxm4hlxg?q=80&w=1200',
    architecture: 'https://images.unsplash.com/photos/white-buildings-line-a-narrow-european-street-Gl4DrBl80sA?q=80&w=1200',
    nature: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200',
    sunset: 'https://images.unsplash.com/photos/a-sunset-over-a-harbor-with-boats-in-the-water-fcSEoJKPWcY?q=80&w=1200'
  };

  return curatedUrls[category] || curatedUrls.gastronomy;
}

import { generateContent, isAiEnabled, geminiClient } from '../gemini';
import { uploadFromUrl, uploadFromBase64 } from '../storage';

// Fallback images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800', // Gambas
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800', // Doñana
  'https://images.unsplash.com/photo-1551095900-589578278216?q=80&w=800', // Semana Santa
];

// Curated Stock Library for Huelva (high quality Unsplash URLs)
export async function generateEditorialGallery(topic: string, count: number = 3): Promise<string[]> {
  if (!isAiEnabled || !geminiClient) {
    console.warn("AI disabled, using fallback gallery");
    return [
      'https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=1200',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200'
    ];
  }

  console.log(`[DESIGNER] Generando Galería Editorial AI para: "${topic}"`);

  // 1. Brainstorm Prompts
  const brainPrompt = `
    Generate ${count} distinct image prompts for a travel magazine article about "${topic}" in Huelva, Spain.
    Style: Photorealistic, cinematic 4k, natural lighting.
    
    1. A wide establishing shot.
    2. A close-up detail (food, texture, object).
    3. An action shot or atmospheric angle.
    
    Return ONLY a JSON array of strings. Example: ["Wide shot of...", "Close up of..."]
  `;

  let prompts: string[] = [];
  try {
    const res = await generateContent(brainPrompt, 0.7);
    const clean = res?.replace(/```json/g, '').replace(/```/g, '').trim() || '[]';
    prompts = JSON.parse(clean);
  } catch (e) {
    prompts = [`Photorealistic ${topic} in Huelva`, `Detail of ${topic}`, `Cinematic shot of ${topic}`];
  }

  // 2. Generate Images & Upload
  const galleryUrls: string[] = [];



  for (const [i, p] of prompts.entries()) {
    try {
      console.log(`[DESIGNER] Rendering (Nano Banana): ${p.substring(0, 30)}...`);

      // Llamada correcta a la API según documentación
      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: p + ", high quality, 4k",
        config: {
          responseModalities: ['IMAGE'] // Forzamos solo imagen para simplificar
        }
      });

      // Procesar respuesta
      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            // Tenemos imagen
            const types = ['wide', 'detail', 'action']; // Mapeo al orden del prompt
            const imgType = types[i] || 'misc';
            const b64 = part.inlineData.data;
            const finalSlug = `agen-${imgType}-${topic.substring(0, 10).replace(/[^a-z0-9]/gi, '-')}-${Date.now()}`;
            const url = await uploadFromBase64(b64, finalSlug);
            if (url) galleryUrls.push(url);
          }
        }
      }
    } catch (e) {
      console.error(`[DESIGNER] Error generando imagen ${i}:`, e);
    }
  }

  return galleryUrls;
}

import { findSourceUrl } from './researcher';
import { scrapeArticle } from './scraper';

// ... (UNSPLASH_IMAGES and generateEditorialGallery remain same)

export async function generateHeaderImage(title: string, excerpt: string, scrapedImage?: string, slug: string = 'draft'): Promise<string> {
  console.log(`[DESIGNER] Diseñando imagen para: "${title}"`);

  // 1. PRIORIDAD ABSOLUTA: Imagen scrapeada (REAL)
  if (scrapedImage && scrapedImage.startsWith('http')) {
    console.log(`[DESIGNER] Usando imagen REAL scrapeada: ${scrapedImage}`);
    const storedUrl = await uploadFromUrl(scrapedImage, slug);
    if (storedUrl) return storedUrl;

    // Fallback: Si falla la subida, usamos la original aunque sea hotlinking
    // El usuario prefiere realidad a "cagadas" de IA.
    return scrapedImage;
  }

  // 2. ESTRATEGIA REAL IMAGE (Si no hubo scrapeo directo, buscamos)
  // Heurística simple: Si el título suena a lugar, intentamos buscar foto real
  // O preguntamos a Gemini si es un lugar físico

  let isPlace = false;
  try {
    // Small classifier for "Physical Place"
    const placeCheck = await generateContent(
      `Is "${title}" in Huelva a specific physical place (beach, monument, town, restaurant)? 
           Return TRUE or FALSE.`,
      0.1
    );
    isPlace = placeCheck?.trim().toUpperCase().includes('TRUE') || false;
  } catch (e) {
    // Fallback benigno
  }

  if (isPlace) {
    console.log(`[DESIGNER] Detectado LUGAR FÍSICO. Intentando conseguir foto real...`);
    try {
      const sourceUrl = await findSourceUrl(title);
      if (sourceUrl) {
        const scrapedData = await scrapeArticle(sourceUrl);
        if (scrapedData && scrapedData.image) {
          console.log(`[DESIGNER] ¡Foto real encontrada en ${sourceUrl}!`);
          const storedUrl = await uploadFromUrl(scrapedData.image, `real-${slug}`);
          if (storedUrl) return storedUrl;
        }
      }
    } catch (e) {
      console.warn("[DESIGNER] Falló la estrategia de foto real, volviendo a AI.", e);
    }
  }

  // 3. Fallback: AI Generation (Nano Banana)
  // Si no es lugar físico, o falló la búsqueda, generamos.
  console.log(`[DESIGNER] Generando imagen AI (Nano Banana)...`);
  const [generated] = await generateEditorialGallery(title, 1);
  // generateEditorialGallery already uploads to storage
  return generated;
}

const HUELVA_AESTHETICS = `
  VISUAL STYLE GUIDE (HUELVA PROVINCE, SPAIN):
  - Lighting: Warm Atlantic light, golden hour, bright but soft.
  - Landscape: Sand dunes, pine forests (Stone pine), marshes (marismas), flat beaches, white villages.
  - Architecture: Whitewashed Andalusian houses, colonial details (British legacy), simple lines.
  - Colors: Ochre, albero (yellow sand), white, green (pine), blue (ocean).
  - PROHIBITED: Caribbean palms, rocky steep cliffs (like Algarve/North), skyscrapers (except generic city), snow, tropical vibes.
`;

export async function enhanceArticleVisuals(content: string, slug: string): Promise<{ header: string, imageUrl: string }[]> {
  if (!isAiEnabled || !geminiClient) return [];

  console.log(`[DESIGNER] Enhancing visuals for slug: ${slug}`);

  // 1. Extract H2 headers AND their following context
  // Regex looks for <h2>Header</h2> followed by optional whitespace and <p>Context</p>
  // We capture the header term and the first 200 chars of context
  const regex = /<h2.*?>(.*?)<\/h2>[\s\S]*?<p>(.*?)<\/p>/gi;
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) {
    console.log("[DESIGNER] No suitable sections (H2 + P) found to enhance.");
    return [];
  }

  // 2. Decide which sections need images
  const sectionsToEnhance = matches.slice(0, 3).map(m => ({
    header: m[1],
    context: m[2].replace(/<[^>]*>/g, '').substring(0, 300) // Plain text, max 300 chars
  }));

  const newImages: { header: string, imageUrl: string }[] = [];

  for (const section of sectionsToEnhance) {
    console.log(`[DESIGNER] Generating visual for section: "${section.header}"`);

    try {
      // Prompt engineered for specific context + aesthetics
      const p = `
        Create a Photorealistic, cinematic 4k image.
        SUBJECT: ${section.header} (Context: ${section.context}).
        LOCATION: Huelva, Spain (Andalusia).
        
        ${HUELVA_AESTHETICS}
        
        Ensure the image perfectly matches the context described.
      `;

      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: p,
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
      console.error(`[DESIGNER] Failed to generate image for "${section.header}"`, e);
    }
  }

  return newImages;
}

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

export async function generateHeaderImage(title: string, excerpt: string, scrapedImage?: string, slug: string = 'draft'): Promise<string> {
  console.log(`[DESIGNER] Diseñando imagen para: "${title}"`);

  // 1. Si hay imagen scrapeada (REAL), intentamos "robarla" (subirla a nuestro storage)
  if (scrapedImage && scrapedImage.startsWith('http')) {
    console.log(`[DESIGNER] Procesando imagen scrapeada: ${scrapedImage}`);
    const storedUrl = await uploadFromUrl(scrapedImage, slug);
    if (storedUrl) return storedUrl;

    // Si falla la subida, usamos la original (Hotlink) como fallback temporal
    console.warn("[DESIGNER] Fallo subida Storage, usando Hotlink.");
    return scrapedImage;
  }

  // Si no hay imagen, usamos nuestra librería en vez de generar (más rápido y seguro hoy en día)
  const [fallback] = await generateEditorialGallery(title, 1);
  const storedFallback = await uploadFromUrl(fallback, slug);
  return storedFallback || fallback;
}

export async function enhanceArticleVisuals(content: string, slug: string): Promise<{ header: string, imageUrl: string }[]> {
  if (!isAiEnabled || !geminiClient) return [];

  console.log(`[DESIGNER] Enhancing visuals for slug: ${slug}`);

  // 1. Extract H2 headers from content simple regex
  const h2Matches = [...content.matchAll(/<h2.*?>(.*?)<\/h2>/g)];
  const headers = h2Matches.map(m => m[1]);

  if (headers.length === 0) {
    console.log("[DESIGNER] No headers found to enhance.");
    return [];
  }

  // 2. Decide which sections need images (Limit to 2 max to save tokens/time for MVP)
  // In a real scenario, we'd check if an <img> already exists near the header.
  const headersToEnhance = headers.slice(0, 3);

  const newImages: { header: string, imageUrl: string }[] = [];

  for (const header of headersToEnhance) {
    // Generate prompt based on header
    // We use the header text itself as the core of the prompt
    console.log(`[DESIGNER] Generating visual for section: "${header}"`);

    try {
      const p = `Photorealistic, cinematic 4k, travel photography shot of "${header}" in Huelva context. Natural lighting, vibrant colors.`;

      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: p,
        config: { responseModalities: ['IMAGE'] }
      });

      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts?.[0]?.inlineData) {
        const b64 = candidate.content.parts[0].inlineData.data;
        const imgSlug = `enhance-${slug}-${header.substring(0, 10).replace(/[^a-z0-9]/gi, '-')}-${Date.now()}`;
        const url = await uploadFromBase64(b64, imgSlug);

        if (url) {
          newImages.push({ header, imageUrl: url });
        }
      }
    } catch (e) {
      console.error(`[DESIGNER] Failed to generate image for "${header}"`, e);
    }
  }

  return newImages;
}

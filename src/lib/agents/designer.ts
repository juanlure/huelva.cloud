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
      console.log(`[DESIGNER] Rendering: ${p.substring(0, 30)}...`);
      const response = await geminiClient.models.generateImage({
        model: 'gemini-2.5-flash-image', // Ajustar modelo según disponibilidad
        prompt: p + ", high quality, 4k",
        config: { number_of_images: 1 }
      });

      if (response.image) {
        // Upload immediately using a temp slug base
        const slug = `gen-${topic.substring(0,10).replace(/\s/g,'-')}-${Date.now()}-${i}`;
        const url = await uploadFromBase64(response.image.imageBytes, slug);
        if (url) galleryUrls.push(url);
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
  const [fallback] = await searchEditorialImages(title, 1);
  const storedFallback = await uploadFromUrl(fallback, slug);
  return storedFallback || fallback;
}

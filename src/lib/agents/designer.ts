import { generateContent, isAiEnabled, geminiClient } from '../gemini';
import { uploadFromUrl, uploadFromBase64 } from '../storage';

// Fallback images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800', // Gambas
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800', // Doñana
  'https://images.unsplash.com/photo-1551095900-589578278216?q=80&w=800', // Semana Santa
];

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

  if (!isAiEnabled || !geminiClient) {
     return UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
  }

  // 2. Crear Prompt Visual con Gemini
  const promptDesign = `
    Create a very short prompt (max 20 words) for an AI image generator.
    Subject: A photorealistic image about "${title}" in Huelva, Spain.
    Style: Cinematic lighting, 4k, no text.
    Return ONLY the prompt.
  `;
  
  const imagePrompt = await generateContent(promptDesign, 0.7) || `Andalusia landscape, Huelva, ${title}, photorealistic`;
  console.log(`[DESIGNER] Prompt generado: "${imagePrompt.trim()}"`);

  // 3. Generar Imagen con Nano Banana
  try {
    const response = await geminiClient.models.generateImage({
      model: 'gemini-2.5-flash-image', 
      prompt: imagePrompt.trim(),
      config: {
        number_of_images: 1,
      }
    });

    if (response.image) {
       const b64 = response.image.imageBytes;
       
       // Subir a Storage
       const storedUrl = await uploadFromBase64(b64, slug);
       if (storedUrl) return storedUrl;

       console.warn("[DESIGNER] Fallo subida Storage (Base64).");
       throw new Error("Storage Upload Failed");
    }
  } catch (e) {
    console.error("[DESIGNER] Fallo generando/guardando imagen", e);
  }

  // Fallback final
  console.log("[DESIGNER] Usando Unsplash Fallback");
  return `https://source.unsplash.com/800x600/?huelva,${encodeURIComponent(title.split(' ')[0])}`;
}

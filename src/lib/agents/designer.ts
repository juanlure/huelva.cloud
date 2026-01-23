/*
  Huelva.is - Agente Diseñador
  Proveedor: Google GenAI (Imagen 3 / "Nano Banana")
*/
import { generateContent, isAiEnabled, geminiClient } from '../gemini';

// Fallback images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800', // Gambas
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800', // Doñana
  'https://images.unsplash.com/photo-1551095900-589578278216?q=80&w=800', // Semana Santa
];

export async function generateHeaderImage(title: string, excerpt: string): Promise<string> {
  console.log(`[DESIGNER] Diseñando imagen para: "${title}"`);

  if (!isAiEnabled || !geminiClient) {
     return UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
  }

  // 1. Crear Prompt Visual con Gemini (Texto)
  const promptDesign = `
    Create a very short prompt (max 20 words) for an AI image generator.
    Subject: A photorealistic image about "${title}" in Huelva, Spain.
    Style: Cinematic lighting, 4k, no text.
    Return ONLY the prompt.
  `;
  
  const imagePrompt = await generateContent(promptDesign, 0.7) || `Andalusia landscape, Huelva, ${title}, photorealistic`;
  console.log(`[DESIGNER] Prompt generado: "${imagePrompt.trim()}"`);

  // 2. Generar Imagen con Nano Banana (Gemini 2.5 Flash Image)
  try {
    const response = await geminiClient.models.generateImage({
      model: 'gemini-2.5-flash-image', 
      prompt: imagePrompt.trim(),
      config: {
        number_of_images: 1,
      }
    });

    if (response.image) {
       // La API devuelve la imagen en base64 en response.image.imageBytes o similar
       // Para servirla en la web necesitamos subirla o convertirla a Data URI.
       // Data URI es pesado para HTML, pero viable para Serverless sin bucket externo por ahora.
       const b64 = response.image.imageBytes;
       return `data:image/jpeg;base64,${b64}`;
    }
  } catch (e) {
    console.error("[DESIGNER] Fallo generando imagen con Gemini/Imagen", e);
  }

  // Fallback si falla
  console.log("[DESIGNER] Usando Unsplash Fallback");
  return `https://source.unsplash.com/800x600/?huelva,${encodeURIComponent(title.split(' ')[0])}`;
}

/*
  Huelva.is - Agente Diseñador
  Proveedor: Banana.dev (Nano Banana) / Replicate
*/
import { generateContent, isAiEnabled } from '../gemini';

// Fallback images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800', // Gambas
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800', // Doñana
  'https://images.unsplash.com/photo-1551095900-589578278216?q=80&w=800', // Semana Santa
];

export async function generateHeaderImage(title: string, excerpt: string): Promise<string> {
  console.log(`[DESIGNER] Diseñando imagen para: "${title}"`);

  if (!isAiEnabled) {
     return UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
  }

  // 1. Crear Prompt Visual con Gemini
  const promptDesign = `
    Descripción visual para una foto realista de un artículo titulado: "${title}".
    Contexto: Huelva, España. Estilo: Fotografía editorial, luz natural, colores cálidos (naranja/azul), sin texto.
    
    Devuelve SOLO el prompt en Inglés para Stable Diffusion. Máximo 2 frases.
  `;
  
  const imagePrompt = await generateContent(promptDesign, 0.7) || `Andalusia landscape, Huelva, ${title}, photorealistic, 8k`;
  console.log(`[DESIGNER] Prompt generado: "${imagePrompt.trim()}"`);

  // 2. Llamar a API de Generación (Banana.dev / Replicate)
  // Nota: "Nano Banana" no es un SDK estándar. Simulamos llamada a una API genérica compatible.
  const BANANA_API_KEY = process.env.BANANA_API_KEY;
  const BANANA_MODEL_KEY = process.env.BANANA_MODEL_KEY; // "nano-banana" model key if exists

  if (BANANA_API_KEY && BANANA_MODEL_KEY) {
    try {
      const response = await fetch("https://api.banana.dev/start/v4/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${BANANA_API_KEY}`
        },
        body: JSON.stringify({
          "apiKey": BANANA_API_KEY,
          "modelKey": BANANA_MODEL_KEY,
          "modelInputs": { "prompt": imagePrompt.trim() }
        })
      });

      const data = await response.json();
      // Banana v4 suele devolver un ID de tarea o el resultado directo dependiendo del modelo
      // Simplificación: Asumimos que devuelve url en output o similar (ajustar según documentación real)
      if (data.modelOutputs?.[0]?.image_base64) {
         // Si devuelve base64, habría que subirlo a storage. Por simplicidad en serverless, 
         // idealmente usamos un servicio que devuelva URL pública (ej: Replicate).
         // Si Nano Banana devuelve URL:
         return data.modelOutputs[0].image_url;
      }
    } catch (e) {
      console.error("[DESIGNER] Fallo en Banana API", e);
    }
  }

  // Fallback si no hay API configurada o falla
  console.log("[DESIGNER] Usando Unsplash Fallback");
  return `https://source.unsplash.com/800x600/?huelva,${encodeURIComponent(title.split(' ')[0])}`;
}

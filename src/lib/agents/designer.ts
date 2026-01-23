import { generateContent, isAiEnabled, geminiClient } from '../gemini';
import { uploadFromUrl, uploadFromBase64 } from '../storage';

// Fallback images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800', // Gambas
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800', // Doñana
  'https://images.unsplash.com/photo-1551095900-589578278216?q=80&w=800', // Semana Santa
];

// Curated Stock Library for Huelva (high quality Unsplash URLs)
const STOCK_LIBRARY: Record<string, string[]> = {
  'food': [
    'https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=1200', // Seafood generic
    'https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=1200', // Paella/Rice
    'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=1200', // Gambas (Classic)
    'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=1200', // Jamon
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200', // Tapas vibe
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200', // Restaurant interior
  ],
  'beach': [
    'https://images.unsplash.com/photo-1582264537750-f8af596ed52f?q=80&w=1200', // Matalascañas vague
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200', // Beach vibes
    'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1200', // Sunset water
    'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=1200', // Beach day
  ],
  'nature': [
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200', // Doñana landscape
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200', // Forest/Sierra
    'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1200', // Mountains
  ],
  'city': [
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1200', // Spanish architecture
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200', // Street vibe
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200', // Plaza
    'https://images.unsplash.com/photo-1551095900-589578278216?q=80&w=1200', // Tradition
  ]
};

export async function searchEditorialImages(topic: string, count: number = 4): Promise<string[]> {
  const t = topic.toLowerCase();
  let category = 'city'; // default

  if (t.includes('gamba') || t.includes('tapa') || t.includes('comer') || t.includes('restaurante') || t.includes('jamón')) category = 'food';
  else if (t.includes('playa') || t.includes('mar') || t.includes('punta') || t.includes('matalascañas') || t.includes('mazagón')) category = 'beach';
  else if (t.includes('sierra') || t.includes('doñana') || t.includes('aracena') || t.includes('sendero')) category = 'nature';

  console.log(`[DESIGNER] Visual Research para "${topic}" -> Categoría: ${category}`);

  // Shuffle and pick
  const pool = STOCK_LIBRARY[category] || STOCK_LIBRARY['city'];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, count);
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

import { generateContent, isAiEnabled } from '../gemini';

export interface Draft {
  title: string;
  content: string;
  category: string;
  author: string;
  slug: string;
  excerpt: string;
  sourceUrl?: string; // Nuevo campo para atribución
}

export async function generateDraft(topic: string, baseContent?: string, sourceUrl?: string): Promise<Draft> {
  console.log(`[WRITER] ${baseContent ? 'Reescribiendo' : 'Generando'} artículo sobre: ${topic}...`);
  
  // Fallback Mock
  if (!isAiEnabled) {
     return {
        title: `La verdad sobre ${topic}`,
        slug: topic.toLowerCase().replace(/ /g, '-'),
        content: `<p>Contenido Mock sobre ${topic}</p>`,
        category: 'Comer',
        excerpt: `Resumen simulado sobre ${topic}`,
        author: 'Agente Mock',
        sourceUrl
     };
  }

  const prompt = baseContent ? 
    // MODO REWRITER (Curador)
    `
    Eres "El Choco", redactor de Huelva.is.
    Tu tarea es reescribir la siguiente noticia real para nuestra audiencia.
    
    FUENTE ORIGINAL:
    "${baseContent.substring(0, 3000)}..."

    DIRECTRICES DE ESTILO (Marca Huelva.is):
    - Tono: Honesto, directo, local ("choquero"). 
    - Evita el lenguaje periodístico aburrido ("según fuentes", "ha declarado"). Ve al grano.
    - Útil: ¿Qué significa esto para el lector? ¿Cómo le afecta?
    - Si es una recomendación: Sé crítico.
    - Título: Hazlo atractivo, no clickbait barato, pero sí con gancho.
    
    ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO):
    {
      "title": "Nuevo Título con Gancho",
      "content": "HTML del cuerpo (<p>, <h2>, <blockquote>)...",
      "excerpt": "Resumen picante de 2 líneas.",
      "category": "Noticias, Comer, Eventos, o Guías",
      "author": "El Choco"
    }
    ` 
    : 
    // MODO GENERADOR (Fallback si no hay scrapeo)
    `
    Eres "El Choco", redactor senior de Huelva.is.
    Escribe un artículo sobre: "${topic}".
    
    DIRECTRICES:
    - Tono: Choquero, directo, con humor sutil ("mi arma", "embuste", "chiquillo"), pero informativo y útil.
    - Odias las trampas para turistas. Buscas lo auténtico.
    - Longitud: 400-600 palabras.
    - Formato: HTML básico (<p>, <h2>, <ul>, <blockquote>). NO uses Markdown.
    
    ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO):
    {
      "title": "Título con gancho (ej: 'Por qué las coquinas de X son las mejores')",
      "content": "HTML del cuerpo del artículo...",
      "excerpt": "Resumen picante de 2 líneas.",
      "category": "Una de: Comer, Eventos, Alojarse, Guías, Noticias",
      "author": "El Choco"
    }
    `;

  const response = await generateContent(prompt, 0.7);
  
  try {
    const cleanJson = response?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
    const data = JSON.parse(cleanJson);
    
    return {
      title: data.title || topic,
      content: data.content || `<p>Error generando contenido.</p>`,
      category: data.category || 'Noticias',
      author: data.author || 'Huelva.is AI',
      slug: (data.title || topic).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      excerpt: data.excerpt || `Artículo sobre ${topic}`,
      sourceUrl
    };
  } catch (e) {
    console.error("Error parsing AI response", e);
    throw new Error("Writer AI failed output format.");
  }
}

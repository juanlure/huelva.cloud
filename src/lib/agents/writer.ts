import { generateContent, isAiEnabled } from '../gemini';

export interface Draft {
  title: string;
  content: string;
  category: string;
  author: string;
  slug: string;
  excerpt: string;
}

export async function generateDraft(topic: string): Promise<Draft> {
  console.log(`[WRITER] Generando borrador sobre: ${topic}...`);
  
  // Fallback Mock
  if (!isAiEnabled) {
     return {
        title: `La verdad sobre ${topic}`,
        slug: topic.toLowerCase().replace(/ /g, '-'),
        content: `<p>Contenido Mock sobre ${topic}</p>`,
        category: 'Comer',
        author: 'Agente Mock'
     };
  }

  const prompt = `
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

  const response = await generateContent(prompt, 0.8);
  
  try {
    // Limpiar bloques de código markdown si los hay
    const cleanJson = response?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
    const data = JSON.parse(cleanJson);
    
    return {
      title: data.title || topic,
      content: data.content || `<p>Error generando contenido.</p>`,
      category: data.category || 'Noticias',
      author: data.author || 'Huelva.is AI',
      slug: (data.title || topic).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    };
  } catch (e) {
    console.error("Error parsing AI response", e);
    throw new Error("Writer AI failed output format.");
  }
}

import { generateContent, isAiEnabled } from '../gemini';
import { getAuthorForCategory } from '../authors';

export interface Draft {
  title: string;
  content: string;
  category: string;
  author: string;
  slug: string;
  excerpt: string;
  sourceUrl?: string; // Nuevo campo para atribución
}

export async function generateDraft(topic: string, baseContent?: string, sourceUrl?: string, gallery: string[] = [], researchContext?: string): Promise<Draft> {
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

  const galleryInstructions = gallery.length > 0
    ? `
    TIENES DISPONIBLES LAS SIGUIENTES IMÁGENES REALES (Úsalas obligatoriamente):
    ${JSON.stringify(gallery)}
    
    INSTRUCCIÓN MULTIMEDIA (IMPORTANTE - Placement Contextual):
    - Las URLs de las imágenes contienen pistas sobre su contenido: "wide", "detail", "action".
    - **Wide**: Úsala al principio o para introducir una sección importante.
    - **Detail**: Úsala cerca de descripciones de comida, texturas u objetos específicos.
    - **Action**: Úsala donde describas ambiente, movimiento o gente.
    - **NO** las pongas todas juntas al final. Distribúyelas por el texto donde tengan sentido.
    - Usa la etiqueta: <figure><img src="URL" alt="Descripción basada en el contexto" /><figcaption>Pie de foto con gracia</figcaption></figure>
    `
    : "No hay imágenes adicionales disponibles.";

  const researchInstructions = researchContext
    ? `
    DATOS REALES DE INVESTIGACIÓN(IMPORTANTE: ÚSALOS):
    Aquí tienes información actualizada investigada de internet.Úsala para dar datos precisos de precios, horarios y nombres.
    "${researchContext}"
    `
    : "";

  const prompt = baseContent ?
    // MODO REWRITER (Curador)
    `
    Eres "El Choco", redactor de Huelva.is.
    Tu tarea es reescribir la siguiente noticia real para nuestra audiencia.
    
    FUENTE ORIGINAL:
  "${baseContent.substring(0, 3000)}..."

    DIRECTRICES DE ESTILO(Marca Huelva.is):
  - Tono: Honesto, directo, local("choquero"). 
    - Evita el lenguaje periodístico aburrido("según fuentes", "ha declarado").Ve al grano.
    - Útil: ¿Qué significa esto para el lector ? ¿Cómo le afecta ?
    - Si es una recomendación: Sé crítico.
    - Título: Hazlo atractivo, no clickbait barato, pero sí con gancho.

    ${galleryInstructions}

    ESTRUCTURA DE RESPUESTA(DEVUELVE SOLO ESTE JSON VÁLIDO):
  {
    "title": "Nuevo Título con Gancho",
      "content": "HTML del cuerpo (<p>, <h2>, <figure>...)...",
        "excerpt": "Resumen picante de 2 líneas.",
          "category": "Noticias, Comer, Eventos, o Guías",
            "author": "El Choco"
  }
  `
    :
    // MODO GENERADOR (Fallback o Guía)
    `
    Eres "El Choco", redactor senior de Huelva.is.
    Tu misión: Escribir la GUÍA DEFINITIVA sobre: "${topic}".

    ${researchInstructions}

    ESTRUCTURA OBLIGATORIA(Estilo Málaga.is):
  1. ** El Gancho **: Nada de "en este artículo vamos a ver".Empieza con una verdad dolorosa o una curiosidad.
    2. ** Capítulos **: Usa < h2 > para dividir temas(ej: "La Etiqueta", "Los Imprescindibles", "La Dolorosa").
    3. ** Pro Tips **: Intercala consejos de experto(basados en la investigación) usando este HTML:
  <div class="tip-box" >💡 <strong>Consejo Pro: </strong> [Tu consejo aquí]</div >
    4. ** Diccionario Local **: Si aplica, añade una sección de vocabulario usando < ul > o <dl>.

      ${galleryInstructions}

  TONO Y VOZ:
    - Autoridad absoluta. Tú eres de aquí, sabes dónde se ponen los mejores caracoles y cuándo empieza a apretar el calor de verdad.
    - Honestidad brutal. Si un sitio es una trampa para turistas o el parking es un infierno, dilo sin rodeos.
    - **ANTIAI FILTER**: No uses nunca "descubre los encantos", "sumérgete en la cultura" ni "un rincón lleno de magia". Habla claro: "vete allí", "está guapo", "esto es una castaña".
    - Vocabulario: "Niña", "Miarma", "Choco", "Cabezazo": Úsalos con naturalidad, no forzados.

    ESTRUCTURA DE RESPUESTA(DEVUELVE SOLO ESTE JSON VÁLIDO):
  {
    "title": "Título Épico (ej: 'Manual de Supervivencia: Gambas')",
      "content": "HTML estructurado...",
        "excerpt": "La verdad sobre ${topic} que nadie te cuenta.",
          "category": "Guías",
            "author": "Rocío Limón"
  }
  `;

  const response = await generateContent(prompt, 0.7);

  try {
    // Robust JSON extraction
    const jsonStart = response?.indexOf('{');
    const jsonEnd = response?.lastIndexOf('}');

    let cleanJson = '{}';
    if (response && jsonStart !== undefined && jsonEnd !== undefined && jsonStart !== -1 && jsonEnd !== -1) {
      cleanJson = response.substring(jsonStart, jsonEnd + 1);
    }
    const data = JSON.parse(cleanJson);

    return {
      title: data.title || topic,
      content: data.content || `<p>Error generando contenido.</p>`,
      category: data.category || 'Noticias',
      slug: (data.title || topic).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      excerpt: data.excerpt || `Artículo sobre ${topic}`,
      author: getAuthorForCategory(data.category || 'Noticias').name, // Override with specific persona
      sourceUrl
    };
  } catch (e) {
    console.error("Error parsing AI response", e);
    throw new Error("Writer AI failed output format.");
  }
}

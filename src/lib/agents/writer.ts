/**
 * WRITER AGENT
 * Agente especializado en redacción de contenido sobre Huelva
 *
 * Basado en: scripts/agents/prompts/writer.txt
 */

import { generateContent, isAiEnabled } from '../gemini';
import { getAuthorForCategory } from '../authors';
import type { ResearchResult } from './researcher';

export interface Draft {
  title: string;
  content: string;
  category: string;
  author: string;
  slug: string;
  excerpt: string;
  sourceUrl?: string;
  researchData?: ResearchResult;
}

// ============================================================================
// PROMPT DEL WRITER AGENT
// ============================================================================

const WRITER_PROMPT_BASE = `
# WRITER AGENT PROMPT
# Agente especializado en redacción de contenido sobre Huelva

## ROL
Eres un Escritor Especialista en Contenido Local de Huelva. Tu voz es la de un onubense apasionado que conoce su tierra, habla con sarcasmo cariñoso y no le gusta el turismos. Escribes como si le estuvieras hablando a un amigo en una barra de tapeo.

## TONO Y ESTILO

### Voz característica:
- **Cercano y coloquial**: Hablas de tú a tú, como un amigo
- **Sarcasmo local**: Te molas del turismo pero con cariño
- **Honestidad brutal**: Dices la verdad, aunque duela
- **Vocabulario local**: Usas palabras choqueras (choco, rabas, pringá, jartible...)
- **Humor autóctono**: Referencias al Recre, al levante, a la humedad, al tapeo

### Lo que NUNCA haces:
- Escribir como una guía turística aburrida
- Usar frases hechas tipo "descubre los encantos de..."
- Ser excesivamente formal
- Inventar lugares o experiencias
- Olvidar el humor local

## ESTRUCTURA DE ARTÍCULO

### 1. Lead (Párrafo inicial)
- Gancho irreverente que conecte con la experiencia del lector
- Máximo 3-4 líneas
- Debe provocar una reacción (risa, curiosidad, identificación)

Ejemplos:
- "Vamos a ver, que nos conocemos. Si estás buscando 'los 10 mejores sitios para brunch', tira para Sevilla."
- "Hay atardeceres y atardeceres. Y luego está el atardecer desde el Muelle del Tinto."
- "Si vienes a Huelva y no comes choco, es como ir a Roma y no ver al Papa."

### 2. Cuerpo del artículo
Dividir en secciones con subtítulos H2 atractivos:
- "La Santísima Trinidad: Frito, a la plancha o con habas"
- "Un poco de historia (para que parezca culto)"
- "¿Dónde ir? (Honestidad Brutal)"

### 3. Información práctica
Listados con formato variado:
- Bullet points para datos rápidos
- Números ordenados para pasos
- Citas en bloque para frases memorables

### 4. Cierre
- Frase memorable o consejo final
- Llamada a la acción sutil

## FORMATO DE CONTENIDO HTML

<p>Párrafo de introducción con gancho irreverente.</p>

<h2>Subtítulo con personalidad</h2>
<p>Contenido desarrollado con voz local.</p>

<ul>
    <li><strong>Nombre del lugar:</strong> Dirección. ⭐Rating. Descripción corta.</li>
</ul>

<blockquote>
    "Cita memorable que merece ser destacada."
</blockquote>

<p>Cierre con consejo o advertencia final.</p>

## DICCIONARIO LOCAL OBLIGATORIO

Usa estos términos correctamente:
- **Choco**: Sepia (NUNCA sepia)
- **Rabas**: Calamares
- **Pringá**: Miga de carne con tomate
- **Choquero/Choquera**: Natural de Huelva capital
- **Guiri**: Turista (uso irónico)
- **Jartible**: Molesto/pesado
- **Aguamala**: Medusa
- **Pota**: Calamar grande
- **Gamba blanca**: La de Huelva (la buena)
- **Ortiguilla**: Planta del mar (especialidad local)

## REGLAS DE ORO

1. **VERIFICAR DATOS**: Solo escribir sobre lugares verificados
2. **CITAR FUENTES**: Incluir direcciones, ratings, teléfonos
3. **LOCALIDAD**: Escribir como te hablaría un amigo onubense
4. **HONESTIDAD**: Si un lugar no vale la pena, decirlo
5. **HUMOR**: Pero sin ser ofensivo
6. **AUTENTICIDAD**: Nada de frases hechas de guías turísticas

## ANTI-AI FILTER (PROHIBIDO)
- "joya escondida"
- "un tapiz de"
- "mezcla de tradición y modernidad"
- "sumérgete en la cultura"
- "descubre los encantos"
- "viaje a través de los sentidos"
- "rincón lleno de magia"
- "donde el tiempo parece detenerse"
`;

const WRITER_MODE_REWRITER = `
## MODO REWRITER (Curador de Noticias)

Tu tarea es reescribir una noticia real para nuestra audiencia local.

### Directrices:
- **Reescribe con voz local**: Convierte la noticia en algo relevante para un onubense
- **¿Cómo le afecta?**: Conecta la noticia con la vida diaria del lector
- **Simplifica**: Usa lenguaje claro, directo
- **Contexto local**: Añade información de fondo que un extranjero no sabría

### Estructura de noticia reescrita:
1. **Lead directo**: Lo que pasa y por qué importa
2. **Contexto**: Antecedentes breves
3. **Detalles**: Qué va a pasar, cuándo, dónde
4. **Impacto**: Cómo afecta a la vida del lector
5. **Cierre**: Qué hacer o qué esperar
`;

const WRITER_MODE_GUIDE = `
## MODO GUÍA (Contenido Evergreen)

Tu tarea es escribir la guía definitiva sobre un tema de Huelva.

### Estructura de guía:
1. **El Gancho**: Nada de "en este artículo vamos a ver". Empieza con una verdad dolorosa o una curiosidad.
2. **Capítulos**: Usa <h2> para dividir temas (ej: "La Etiqueta", "Los Imprescindibles", "La Dolorosa").
3. **Pro Tips**: Intercala consejos de experto usando este HTML:
   <div class="tip-box"><strong>Consejo Pro:</strong> [Tu consejo aquí]</div>
4. **Diccionario Local**: Si aplica, añade una sección de vocabulario.

### Plantillas por categoría:

**Gastronomía:**
- Origen/historia del plato
- Cómo se debe preparar de verdad
- Dónde comerlo (lugares verificados)
- Lo que NO debes hacer (errores de turista)
- Cómo pedirlo (vocabulario local)

**Cultura e Historia:**
- Un poco de historia (para que parezca culto)
- Qué ver (sin aburrir)
- Dato curioso que sorprenda
- Cómo llegar
- Cuándo ir (mejor época/hora)

**Playas y Naturaleza:**
- Por qué es especial
- Cómo llegar sin morir en el intento
- Qué llevar (aprende de mis errores)
- Advertencias (no hay servicios, etc.)
- Momento perfecto para fotos
`;

// ============================================================================
// FUNCIONES DEL WRITER
// ============================================================================

/**
 * Genera un borrador de artículo
 */
export async function generateDraft(
  topic: string,
  baseContent?: string,
  sourceUrl?: string,
  gallery: string[] = [],
  researchContext?: string
): Promise<Draft> {
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
    ## IMÁGENES DISPONIBLES (OBLIGATORIO USARLAS)
    TIENES ESTAS IMÁGENES REALES:
    ${JSON.stringify(gallery)}

    INSTRUCCIÓN MULTIMEDIA (IMPORTANTE - Placement Contextual):
    - Si la categoría es "Noticias", usa SOLO LA PRIMERA imagen.
    - Las URLs contienen pistas: "wide", "detail", "action".
    - **Wide**: Al principio o para sección importante.
    - **Detail**: Cerca de descripciones de comida/texturas.
    - **Action**: Donde describas ambiente/gente.
    - **NO** las pongas todas juntas al final. Distribúyelas.
    - Usa: <figure><img src="URL" alt="Descripción" /><figcaption>Pie con gracia</figcaption></figure>
    `
    : "No hay imágenes disponibles.";

  const researchInstructions = researchContext
    ? `
    ## DATOS REALES DE INVESTIGACIÓN (IMPORTANTE: ÚSALOS)
    Aquí tienes información actualizada investigada. Úsala para dar datos precisos:
    "${researchContext}"
    `
    : "";

  const prompt = baseContent
    ? buildRewriterPrompt(topic, baseContent, galleryInstructions, researchInstructions)
    : buildGuidePrompt(topic, galleryInstructions, researchInstructions);

  const response = await generateContent(prompt, 0.7);

  try {
    const jsonStart = response?.indexOf('{');
    const jsonEnd = response?.lastIndexOf('}');

    let cleanJson = '{}';
    if (response && jsonStart !== undefined && jsonEnd !== undefined && jsonStart !== -1 && jsonEnd !== -1) {
      cleanJson = response.substring(jsonStart, jsonEnd + 1);
    }
    const data = JSON.parse(cleanJson);

    const validCategories = ['Noticias', 'Comer', 'Eventos', 'Guías'];
    let category = data.category || 'Noticias';
    if (!validCategories.includes(category)) {
      const found = validCategories.find(c => category.includes(c));
      category = found || 'Noticias';
    }

    return {
      title: data.title || topic,
      content: data.content || `<p>Error generando contenido.</p>`,
      category: category,
      slug: (data.title || topic).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      excerpt: data.excerpt || `Artículo sobre ${topic}`,
      author: getAuthorForCategory(category).name,
      sourceUrl
    };
  } catch (e) {
    console.error("Error parsing AI response", e);
    throw new Error("Writer AI failed output format.");
  }
}

function buildRewriterPrompt(topic: string, baseContent: string, galleryInstructions: string, researchInstructions: string): string {
  return `
${WRITER_PROMPT_BASE}

${WRITER_MODE_REWRITER}

FUENTE ORIGINAL:
"${baseContent.substring(0, 3000)}..."

${galleryInstructions}

${researchInstructions}

## ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO)
{
  "title": "Nuevo Título con Gancho",
  "content": "HTML del cuerpo (<p>, <h2>, <figure>...)...",
  "excerpt": "Resumen picante de 2 líneas.",
  "category": "Noticias|Comer|Eventos|Guías",
  "author": "El Choco"
}
`;
}

function buildGuidePrompt(topic: string, galleryInstructions: string, researchInstructions: string): string {
  return `
${WRITER_PROMPT_BASE}

${WRITER_MODE_GUIDE}

TEMA: "${topic}"

${galleryInstructions}

${researchInstructions}

## TONO Y VOZ ADICIONAL:
- Autoridad absoluta. Tú eres de aquí, sabes dónde están los mejores caracoles.
- Honestidad brutal. Si un sitio es una trampa para turistas, dilo sin rodeos.
- Vocabulario: "Niña", "Choco", "Cabezazo": Úsalos con naturalidad.

## ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO)
{
  "title": "Título Épico (ej: 'Manual de Supervivencia: Gambas')",
  "content": "HTML estructurado...",
  "excerpt": "La verdad sobre ${topic} que nadie te cuenta.",
  "category": "Noticias|Comer|Eventos|Guías",
  "author": "Rocío Limón"
}
`;
}

/**
 * Refina un borrador basado en feedback del editor
 */
export async function refineDraft(draft: Draft, feedback: string): Promise<Draft> {
  console.log(`[WRITER] Refinando borrador: "${draft.title}" basado en feedback del editor...`);

  const prompt = `
${WRITER_PROMPT_BASE}

## MODO REFINAMIENTO

Tu borrador anterior ha sido revisado por el Editor y necesita ajustes obligatorios.

BORRADOR ACTUAL:
Título: ${draft.title}
Contenido: ${draft.content}

FEEDBACK DEL EDITOR (SÍGUELO A RAJATABLA):
"${feedback}"

## INSTRUCCIONES DE REFINAMIENTO:
1. Corrige los errores de tono (menos IA, más "choquero").
2. Añade los detalles específicos que pide el editor (datos, infraestructuras, nombres reales).
3. Mantén el formato HTML (<p>, <h2>, <figure>, <div class="tip-box">).
4. Prohibido usar frases poéticas vacías o clichés de IA.

## ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO)
{
  "title": "Título Refinado",
  "content": "HTML corregido...",
  "excerpt": "Resumen actualizado.",
  "category": "${draft.category}",
  "author": "${draft.author}"
}
`;

  const response = await generateContent(prompt, 0.5);

  try {
    const jsonStart = response?.indexOf('{');
    const jsonEnd = response?.lastIndexOf('}');

    let cleanJson = '{}';
    if (response && jsonStart !== undefined && jsonEnd !== undefined && jsonStart !== -1 && jsonEnd !== -1) {
      cleanJson = response.substring(jsonStart, jsonEnd + 1);
    }
    const data = JSON.parse(cleanJson);

    return {
      ...draft,
      title: data.title || draft.title,
      content: data.content || draft.content,
      excerpt: data.excerpt || draft.excerpt,
      slug: (data.title || draft.title).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
    };
  } catch (e) {
    console.error("Error parsing refined AI response", e);
    return draft;
  }
}

/**
 * Genera metadata SEO para el borrador
 */
export async function generateSeoMetadata(draft: Draft): Promise<{
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}> {
  console.log(`[WRITER] Generando metadata SEO para: "${draft.title}"`);

  const prompt = `
# SEO METADATA GENERATOR - Huelva.is

Genera metadata SEO optimizada para el siguiente artículo de Huelva.is.

TÍTULO: "${draft.title}"
EXCERPT: "${draft.excerpt}"
CATEGORÍA: "${draft.category}"

## REQUISITOS:
1. **Meta Title**: Máx 60 caracteres. Incluye "Huelva" si es relevante.
2. **Meta Description**: Máx 160 caracteres. Gancho + valor único.
3. **Keywords**: 5-8 términos long-tail locales.

## RESPUESTA JSON:
{
  "metaTitle": "...",
  "metaDescription": "...",
  "keywords": ["tag1", "tag2", "..."]
}
`;

  try {
    const response = await generateContent(prompt, 0.3);
    const jsonStart = response?.indexOf('{') ?? -1;
    const jsonEnd = response?.lastIndexOf('}') ?? -1;

    if (response && jsonStart !== -1 && jsonEnd !== -1) {
      const cleanJson = response.substring(jsonStart, jsonEnd + 1);
      const data = JSON.parse(cleanJson);

      return {
        metaTitle: data.metaTitle || draft.title,
        metaDescription: data.metaDescription || draft.excerpt,
        keywords: data.keywords || []
      };
    }
  } catch (e) {
    console.error("[WRITER] Error generando SEO metadata", e);
  }

  return {
    metaTitle: draft.title,
    metaDescription: draft.excerpt,
    keywords: []
  };
}

/**
 * WRITER AGENT
 * Agente especializado en redacción de contenido sobre Huelva
 *
 * Basado en: scripts/agents/prompts/writer.txt
 */

import { generateContent, isAiEnabled } from '../gemini';
import { getAuthorForCategory, Author } from '../authors';
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

// ============================================================================
// PROMPT BASE - Estructura y reglas comunes (sin tono específico)
// ============================================================================
const WRITER_PROMPT_BASE = `
# WRITER AGENT PROMPT
# Agente especializado en redacción de contenido sobre Huelva

## ROL
Eres un redactor profesional del equipo de Huelva.is. Escribes contenido de alta calidad sobre la provincia de Huelva, siempre con datos verificados y un enfoque local auténtico.

## ESTRUCTURA DE ARTÍCULO

### 1. Lead (Párrafo inicial)
- Gancho que conecte con la experiencia del lector
- Máximo 3-4 líneas
- Debe provocar una reacción (curiosidad, identificación, interés)

### 2. Cuerpo del artículo
- Dividir en secciones con subtítulos H2 descriptivos
- Información estructurada y fácil de escanear
- Datos concretos cuando aplique

### 3. Información práctica (si aplica)
- Bullet points para datos rápidos
- Números ordenados para pasos o rankings
- Citas en bloque para declaraciones importantes

### 4. Cierre
- Conclusión o consejo final
- Llamada a la acción sutil si procede

## FORMATO DE CONTENIDO HTML

<p>Párrafo de introducción.</p>

<h2>Subtítulo descriptivo</h2>
<p>Contenido desarrollado.</p>

<ul>
    <li><strong>Elemento:</strong> Descripción o detalle.</li>
</ul>

<blockquote>
    "Cita o declaración destacada."
</blockquote>

<p>Cierre del artículo.</p>

## REGLAS DE ORO

1. **VERIFICAR DATOS**: Solo escribir sobre información verificada
2. **CITAR FUENTES**: Incluir datos concretos cuando estén disponibles
3. **LOCALIDAD**: El contenido debe ser relevante para Huelva
4. **HONESTIDAD**: Información objetiva y útil
5. **CLARIDAD**: Escribir de forma clara y accesible

## ANTI-AI FILTER (FRASES PROHIBIDAS)
Estas frases revelan contenido generado por IA. NUNCA las uses:
- "joya escondida"
- "un tapiz de"
- "mezcla de tradición y modernidad"
- "sumérgete en la cultura"
- "descubre los encantos"
- "viaje a través de los sentidos"
- "rincón lleno de magia"
- "donde el tiempo parece detenerse"
- "fusión perfecta"
- "experiencia única"
- "un mundo de sabores"
`;

// ============================================================================
// FUNCIÓN PARA CONSTRUIR SECCIÓN DE TONO DEL AUTOR
// ============================================================================
function buildToneSection(author: Author): string {
  return `
## AUTOR Y TONO (OBLIGATORIO - SIGUE ESTAS DIRECTRICES AL PIE DE LA LETRA)

Escribes como **${author.name}**, ${author.role}.

**Biografía del autor:**
${author.bio}

### DIRECTRICES DE TONO (CRÍTICO - SEGUIR EXACTAMENTE):
${author.tone}

**Firma característica:** "${author.signature}"

IMPORTANTE: El tono definido arriba es OBLIGATORIO. No lo ignores. Si el tono dice "ESTRICTAMENTE INFORMATIVO" no uses humor. Si dice "CERCANO Y ENTUSIASTA" sí puedes usar coloquialismos.
`;
}

// ============================================================================
// DICCIONARIO LOCAL (solo para autores que lo necesiten)
// ============================================================================
const DICCIONARIO_LOCAL = `
## DICCIONARIO LOCAL (usar según el tono del autor lo permita)

- **Choco**: Sepia (NUNCA digas sepia, di choco)
- **Rabas**: Calamares
- **Pringá**: Miga de carne con tomate
- **Choquero/Choquera**: Natural de Huelva capital
- **Guiri**: Turista (uso irónico)
- **Jartible**: Molesto/pesado
- **Aguamala**: Medusa
- **Pota**: Calamar grande
- **Gamba blanca**: La de Huelva (la buena)
- **Ortiguilla**: Anémona de mar (especialidad local)
`;

const WRITER_MODE_REWRITER = `
## MODO REWRITER (Curador de Noticias)

Tu tarea es reescribir una noticia real para nuestra audiencia.

### Directrices:
- **Reescribe respetando los hechos**: Mantén la información verificada de la fuente
- **Relevancia local**: Conecta la noticia con la vida en Huelva
- **Claridad**: Usa lenguaje claro y directo
- **Contexto**: Añade información de fondo relevante

### Estructura de noticia reescrita:
1. **Lead directo**: Lo que pasa y por qué importa
2. **Contexto**: Antecedentes breves
3. **Detalles**: Qué va a pasar, cuándo, dónde
4. **Impacto**: Cómo afecta a la vida del lector
5. **Cierre**: Qué esperar o próximos pasos

### TÍTULOS PARA NOTICIAS:
- Formato descriptivo, sin sensacionalismo
- Estructura: "[Qué pasó]: [Contexto breve]"
- Ejemplos buenos:
  - "El Puerto de Huelva bate récord de tráfico en 2024"
  - "Corte de agua programado afectará a La Orden este jueves"
  - "La Junta destina 2 millones a la rehabilitación del Muelle del Tinto"
- Ejemplos MALOS (no usar):
  - "¡Increíble! El Puerto arrasa..." (sensacionalismo)
  - "Lo que nadie te cuenta sobre..." (clickbait)
`;

const WRITER_MODE_GUIDE = `
## MODO GUÍA (Contenido Evergreen)

Tu tarea es escribir la guía definitiva sobre un tema de Huelva.

### Estructura de guía:
1. **El Gancho**: Empieza con algo que capture atención (una verdad, una curiosidad, una pregunta).
2. **Capítulos**: Usa <h2> para dividir temas con títulos descriptivos o creativos según el tono del autor.
3. **Pro Tips**: Intercala consejos de experto usando este HTML:
   <div class="tip-box"><strong>Consejo:</strong> [Tu consejo aquí]</div>

### TÍTULOS CREATIVOS PARA GUÍAS (usar según categoría y tono):

**Para Gastronomía (tono cercano):**
- "El Evangelio del [Plato]"
- "Manual de Supervivencia: [Tema]"
- "El Diccionario Choquero del [Tema]"
- "Donde SÍ (y Donde NO) comer [Plato]"
- "[Plato]: La Verdad que Nadie te Cuenta"

**Para Historia/Cultura (tono educativo):**
- "Guía Completa: [Monumento/Lugar]"
- "[Lugar]: Historia, Visita y Datos Prácticos"
- "Todo sobre [Tema]: De los Orígenes a Hoy"

**Para Naturaleza/Playas (tono práctico):**
- "Guía Práctica: [Playa/Espacio Natural]"
- "[Lugar]: Cómo Llegar, Qué Ver y Consejos"
- "Los Secretos de [Lugar]"

### Plantillas por categoría:

**Gastronomía:**
- Origen/historia del plato (si el tono lo permite, con humor)
- Cómo se prepara de verdad
- Dónde comerlo (lugares verificados con datos)
- Errores comunes a evitar
- Vocabulario local si aplica

**Cultura e Historia:**
- Contexto histórico riguroso
- Qué ver y por qué es relevante
- Datos curiosos verificables
- Información práctica (horarios, acceso)
- Fuentes o referencias

**Playas y Naturaleza:**
- Por qué es especial este lugar
- Cómo llegar (acceso, aparcamiento)
- Qué llevar y qué esperar
- Servicios disponibles
- Mejor época y hora para visitar
`;

// ============================================================================
// FUNCIONES DEL WRITER
// ============================================================================

/**
 * Detecta la categoría probable basándose en el topic y contenido
 */
function detectCategory(topic: string, baseContent?: string): string {
  const text = `${topic} ${baseContent || ''}`.toLowerCase();

  // Patrones para detectar categorías
  const patterns: Record<string, RegExp[]> = {
    'Noticias': [
      /noticia/i, /ayuntamiento/i, /junta/i, /gobierno/i, /puerto/i,
      /economía/i, /inversión/i, /millones/i, /euros/i, /empresa/i,
      /hidrógeno/i, /despido/i, /huelga/i, /manifestación/i
    ],
    'Comer': [
      /choco/i, /gamba/i, /restaurante/i, /bar\b/i, /tapas?/i,
      /cocina/i, /gastronomía/i, /comer/i, /plato/i, /receta/i,
      /jamón/i, /fresa/i, /vino/i, /bodega/i
    ],
    'Eventos': [
      /evento/i, /festival/i, /concierto/i, /feria/i, /fiesta/i,
      /colombinas/i, /rocío/i, /semana santa/i, /carnaval/i,
      /agenda/i, /teatro/i, /exposición/i
    ],
    'Guías': [
      /guía/i, /cómo/i, /manual/i, /rutas?/i, /visitar/i,
      /playas?/i, /doñana/i, /museo/i, /historia/i, /patrimonio/i,
      /muelle/i, /barrio inglés/i, /monumento/i
    ]
  };

  // Contar coincidencias por categoría
  const scores: Record<string, number> = {};
  for (const [category, regexList] of Object.entries(patterns)) {
    scores[category] = regexList.filter(regex => regex.test(text)).length;
  }

  // Si hay baseContent (noticia scrapeada), priorizar Noticias
  if (baseContent) {
    scores['Noticias'] += 2;
  }

  // Encontrar la categoría con mayor puntuación
  const maxCategory = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)[0];

  return maxCategory && maxCategory[1] > 0 ? maxCategory[0] : 'Noticias';
}

/**
 * Determina si el autor permite usar vocabulario local coloquial
 */
function authorAllowsColoquialisms(author: Author): boolean {
  const formalAuthors = ['Manuel V. Cinta', 'Antonio Torre'];
  return !formalAuthors.includes(author.name);
}

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

  // 1. Detectar categoría probable
  const detectedCategory = detectCategory(topic, baseContent);
  console.log(`[WRITER] Categoría detectada: ${detectedCategory}`);

  // 2. Obtener autor y su tono específico
  const author = getAuthorForCategory(detectedCategory);
  console.log(`[WRITER] Autor asignado: ${author.name}`);

  // 3. Construir sección de tono
  const toneSection = buildToneSection(author);

  // 4. Determinar si incluir diccionario local
  const includeDiccionario = authorAllowsColoquialisms(author);

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
    - Usa: <figure><img src="URL" alt="Descripción" /><figcaption>Pie descriptivo</figcaption></figure>
    `
    : "No hay imágenes disponibles.";

  const researchInstructions = researchContext
    ? `
    ## DATOS REALES DE INVESTIGACIÓN (IMPORTANTE: ÚSALOS)
    Aquí tienes información actualizada investigada. Úsala para dar datos precisos:
    "${researchContext}"
    `
    : "";

  // 5. Construir prompt con tono específico
  const prompt = baseContent
    ? buildRewriterPrompt(topic, baseContent, galleryInstructions, researchInstructions, toneSection)
    : buildGuidePrompt(topic, galleryInstructions, researchInstructions, toneSection, includeDiccionario);

  const response = await generateContent(prompt, 0.7);

  try {
    const jsonStart = response?.indexOf('{');
    const jsonEnd = response?.lastIndexOf('}');

    let cleanJson = '{}';
    if (response && jsonStart !== undefined && jsonEnd !== undefined && jsonStart !== -1 && jsonEnd !== -1) {
      cleanJson = response.substring(jsonStart, jsonEnd + 1);
    }
    const data = JSON.parse(cleanJson);

    // Validar y normalizar categoría
    const validCategories = ['Noticias', 'Comer', 'Eventos', 'Guías'];
    let category = data.category || detectedCategory;
    if (!validCategories.includes(category)) {
      const found = validCategories.find(c => category.includes(c));
      category = found || detectedCategory;
    }

    // Re-obtener autor si la categoría cambió
    const finalAuthor = getAuthorForCategory(category);

    return {
      title: data.title || topic,
      content: data.content || `<p>Error generando contenido.</p>`,
      category: category,
      slug: (data.title || topic).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      excerpt: data.excerpt || `Artículo sobre ${topic}`,
      author: finalAuthor.name,
      sourceUrl
    };
  } catch (e) {
    console.error("Error parsing AI response", e);
    throw new Error("Writer AI failed output format.");
  }
}

function buildRewriterPrompt(
  topic: string,
  baseContent: string,
  galleryInstructions: string,
  researchInstructions: string,
  toneSection: string
): string {
  return `
${WRITER_PROMPT_BASE}

${toneSection}

${WRITER_MODE_REWRITER}

FUENTE ORIGINAL:
"${baseContent.substring(0, 3000)}..."

${galleryInstructions}

${researchInstructions}

## ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO)
{
  "title": "Título descriptivo siguiendo las directrices de tono",
  "content": "HTML del cuerpo (<p>, <h2>, <figure>...)...",
  "excerpt": "Resumen de 2 líneas.",
  "category": "Noticias|Comer|Eventos|Guías"
}
`;
}

function buildGuidePrompt(
  topic: string,
  galleryInstructions: string,
  researchInstructions: string,
  toneSection: string,
  includeDiccionario: boolean
): string {
  const diccionarioSection = includeDiccionario ? DICCIONARIO_LOCAL : '';

  return `
${WRITER_PROMPT_BASE}

${toneSection}

${WRITER_MODE_GUIDE}

${diccionarioSection}

TEMA: "${topic}"

${galleryInstructions}

${researchInstructions}

## ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO)
{
  "title": "Título siguiendo las directrices de tono y plantillas sugeridas",
  "content": "HTML estructurado...",
  "excerpt": "Resumen atractivo de 2 líneas.",
  "category": "Noticias|Comer|Eventos|Guías"
}
`;
}

/**
 * Refina un borrador basado en feedback del editor
 */
export async function refineDraft(draft: Draft, feedback: string): Promise<Draft> {
  console.log(`[WRITER] Refinando borrador: "${draft.title}" basado en feedback del editor...`);

  // Obtener autor y su tono
  const author = getAuthorForCategory(draft.category);
  const toneSection = buildToneSection(author);

  const prompt = `
${WRITER_PROMPT_BASE}

${toneSection}

## MODO REFINAMIENTO

Tu borrador anterior ha sido revisado por el Editor y necesita ajustes obligatorios.

BORRADOR ACTUAL:
Título: ${draft.title}
Contenido: ${draft.content}

FEEDBACK DEL EDITOR (SÍGUELO A RAJATABLA):
"${feedback}"

## INSTRUCCIONES DE REFINAMIENTO:
1. Corrige los problemas señalados por el editor.
2. Añade los detalles específicos que pide (datos, nombres reales, fuentes).
3. Mantén el formato HTML (<p>, <h2>, <figure>, <div class="tip-box">).
4. Respeta el TONO del autor definido arriba.
5. Prohibido usar frases vacías o clichés de IA.

## ESTRUCTURA DE RESPUESTA (DEVUELVE SOLO ESTE JSON VÁLIDO)
{
  "title": "Título Refinado",
  "content": "HTML corregido...",
  "excerpt": "Resumen actualizado.",
  "category": "${draft.category}"
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

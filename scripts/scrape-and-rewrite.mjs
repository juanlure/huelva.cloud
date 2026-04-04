#!/usr/bin/env node
/**
 * Scraper + Generador de noticias con copy original
 * 1) Scrapea 1 noticia de fuentes locales (solo Huelva)
 * 2) Usa Gemini para reescribirla con estructura editorial propia
 * 3) Guarda como contenido original de Huelva.cloud
 * 
 * Uso: node scrape-and-rewrite.mjs [--force]
 * --force: Generar noticia aunque no haya nuevas (para testing)
 */

import https from 'https';
import http from 'http';
import { parseString } from 'xml2js';
import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import * as cheerio from 'cheerio';

const NEWS_FILE = path.join(process.cwd(), 'src/content/external-news.json');

// Fuentes RSS con filtros mejorados
const SOURCES = [
  { 
    name: 'Huelva Información', 
    rss: 'https://www.huelvainformacion.es/rss/', 
    fallbackUrl: 'https://www.huelvainformacion.es/huelva/',
    categoryFilter: ['huelva', 'provincia', 'andalucia']
  },
  { 
    name: 'Huelva Buenas Noticias', 
    rss: 'https://huelvabuenasnoticias.com/feed/', 
    fallbackUrl: 'https://huelvabuenasnoticias.com/',
    categoryFilter: ['huelva']
  },
  { 
    name: 'Diario de Huelva', 
    rss: 'https://www.diariodehuelva.es/feed/', 
    fallbackUrl: 'https://www.diariodehuelva.es/',
    categoryFilter: ['huelva']
  },
  { 
    name: 'Europa Press Huelva', 
    rss: 'https://www.europapress.es/esandalucia/huelva/rss/', 
    fallbackUrl: 'https://www.europapress.es/andalucia/huelva/',
    categoryFilter: ['huelva', 'andalucia']
  },
  { 
    name: 'Huelva24', 
    rss: 'https://www.huelva24.com/rss/', 
    fallbackUrl: 'https://www.huelva24.com/',
    categoryFilter: ['huelva']
  },
  { 
    name: 'COPE Huelva', 
    rss: 'https://www.cope.es/emisoras/andalucia/huelva-provincia/huelva/rss.xml', 
    fallbackUrl: 'https://www.cope.es/emisoras/andalucia/huelva-provincia/huelva',
    categoryFilter: ['huelva']
  },
];

// Términos que descalifican una noticia (internacional, deportes sin relación, etc.)
const EXCLUDED_TERMS = [
  'trump', 'irán', 'iran', 'eeuu', 'estados unidos', 'israel', 'hamas', 'ucrania', 'rusia',
  'gaza', 'palestina', 'biden', 'netanyahu', 'golf', 'f1', 'fórmula 1', 'nba', 'nfl',
  'madrid', 'barcelona', 'valencia', 'sevilla', 'málaga', 'cádiz', 'córdoba', 'granada',
  'almería', 'jaén'
];

// Términos que priorizan una noticia (localidad fuerte)
const PRIORITY_TERMS = [
  'huelva capital', 'ayuntamiento de huelva', 'puerto de huelva', 'universidad de huelva',
  'almonte', 'ayamonte', 'isla cristina', 'lepe', 'cartaya', 'punta umbría',
  'moguer', 'palos de la frontera', 'aracena', 'la palma del condado',
  'choco', 'coquinas', 'gamba', 'jamón', 'iberico'
];

function fetchURL(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      timeout: 30000,
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode && [301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        if (redirects > 5) return reject(new Error('Too many redirects'));
        const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).toString();
        return resolve(fetchURL(next, redirects + 1));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function parseRSS(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false, trim: true }, (err, result) => {
      if (err) reject(err); else resolve(result);
    });
  });
}

function stripHtml(s = '') {
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Verificar si el contenido es sobre Huelva (no internacional)
function isAboutHuelva(title, excerpt, url) {
  const text = `${title} ${excerpt} ${url}`.toLowerCase();
  
  // Descartar si contiene términos excluidos
  for (const term of EXCLUDED_TERMS) {
    if (text.includes(term.toLowerCase())) {
      console.log(`   ⚠️ Descartada (término excluido: ${term})`);
      return false;
    }
  }
  
  // Debe mencionar Huelva explícitamente
  if (!/huelva|onubense|provincia/i.test(text)) {
    console.log(`   ⚠️ Descartada (no menciona Huelva)`);
    return false;
  }
  
  return true;
}

// Calcular score de relevancia
function calculateRelevance(title, excerpt, source) {
  const text = `${title} ${excerpt}`.toLowerCase();
  let score = 0;
  
  // Prioridad por términos locales
  for (const term of PRIORITY_TERMS) {
    if (text.includes(term.toLowerCase())) score += 10;
  }
  
  // Fuente local tiene bonus
  if (/Huelva Información|Huelva24|COPE Huelva|Huelva Buenas Noticias/i.test(source)) {
    score += 5;
  }
  
  return score;
}

function normalizeRssItem(item, sourceName) {
  const title = stripHtml(item?.title || 'Sin título');
  const excerpt = stripHtml(item?.description || item?.summary || '').slice(0, 500);
  const rawLink = typeof item?.link === 'string' ? item.link : (item?.link?.href || '');
  const link = encodeURI(rawLink);
  const publishedAt = item?.pubDate || item?.published || item?.updated || new Date().toISOString();
  
  // Filtrar contenido no deseado
  if (/podcast|audio|galeria|opinion|deportes/i.test(`${title} ${link}`)) return null;
  
  // Verificar que sea sobre Huelva
  if (!isAboutHuelva(title, excerpt, link)) return null;
  
  return { title, excerpt, url: link, publishedAt, source: sourceName };
}

async function tryRSS(source) {
  const raw = await fetchURL(source.rss);
  const parsed = await parseRSS(raw);
  let items = parsed?.rss?.channel?.item;
  if (items && !Array.isArray(items)) items = [items];
  if (!items) { items = parsed?.feed?.entry; if (items && !Array.isArray(items)) items = [items]; }
  if (!items || items.length === 0) return null;
  
  const validItems = [];
  for (const item of items) {
    const news = normalizeRssItem(item, source.name);
    if (news && news.title && news.url) {
      news.score = calculateRelevance(news.title, news.excerpt, news.source);
      validItems.push(news);
    }
  }
  
  // Ordenar por relevancia y devolver el mejor
  validItems.sort((a, b) => b.score - a.score);
  return validItems[0] || null;
}

async function tryHtmlFallback(source) {
  const html = await fetchURL(source.fallbackUrl);
  const $ = cheerio.load(html);
  const articles = [];
  
  // Buscar múltiples candidatos
  $('article h2 a, article h3 a, .news-item h2 a, .entry-title a').each((_, el) => {
    const href = $(el).attr('href');
    const title = stripHtml($(el).text());
    if (!href || !title) return;
    
    const url = encodeURI(href.startsWith('http') ? href : new URL(href, source.fallbackUrl).toString());
    
    // Filtrar
    if (/podcast|audio|galeria|opinion|deportes/i.test(`${title} ${url}`)) return;
    if (!isAboutHuelva(title, '', url)) return;
    
    articles.push({ 
      title, 
      excerpt: `Noticia destacada de ${source.name}.`, 
      url, 
      publishedAt: new Date().toISOString(), 
      source: source.name,
      score: calculateRelevance(title, '', source.name)
    });
  });
  
  articles.sort((a, b) => b.score - a.score);
  return articles[0] || null;
}

function cleanParagraph(text = '') {
  return text.replace(/\s+/g, ' ').trim();
}

function isUsefulParagraph(text = '') {
  const t = cleanParagraph(text);
  if (!t || t.length < 60) return false;
  if (t.length > 700) return false;
  if (/leer más|contenido relacionado|te recomendamos|newsletter|suscríbete|publicidad|comentarios|normas de participación|whatsapp|telegram|facebook|instagram|x\.|twitter|tiktok|vídeo|video|galería|galeria|podcast/i.test(t)) return false;
  if (/^([A-ZÁÉÍÓÚÑ][^.!?]{0,80})$/.test(t)) return false;
  return true;
}

function extractCandidateParagraphs($, root) {
  return root.find('p').map((_, p) => cleanParagraph($(p).text())).get().filter(isUsefulParagraph);
}

async function fetchFullContent(url) {
  try {
    console.log(`   🌐 Scrapeando contenido completo: ${url}`);
    const html = await fetchURL(url);
    const $ = cheerio.load(html);
    
    // Eliminar basura
    $('script, style, iframe, header, footer, nav, aside, .ads, .sidebar, .comments, .related, .social, .share, .banner, .newsletter').remove();
    
    const bodySelectors = [
      'article .article-body',
      'article .entry-content',
      'article .content-body',
      'article .cuerpo-noticia',
      'article .noticia-cuerpo',
      'article',
      'main article',
      'main'
    ];

    let bestParagraphs = [];

    for (const selector of bodySelectors) {
      $(selector).each((_, el) => {
        const paragraphs = extractCandidateParagraphs($, $(el));
        const totalLength = paragraphs.join(' ').length;
        if (paragraphs.length >= 3 && totalLength > bestParagraphs.join(' ').length) {
          bestParagraphs = paragraphs;
        }
      });
      if (bestParagraphs.join(' ').length > 500) break;
    }

    if (bestParagraphs.length === 0) {
      const fallbackParagraphs = $('main p, article p').map((_, p) => cleanParagraph($(p).text())).get().filter(isUsefulParagraph);
      bestParagraphs = fallbackParagraphs.slice(0, 8);
    }

    const deduped = [];
    const seen = new Set();
    for (const paragraph of bestParagraphs) {
      const key = paragraph.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(paragraph);
    }

    const content = deduped.slice(0, 8).join('\n\n').trim();
    
    if (content.length < 280) {
      console.log('   ⚠️ No se pudo extraer suficiente contenido limpio, usando extracto RSS.');
      return null;
    }
    
    return content;
  } catch (e) {
    console.log(`   ❌ Error al scrapear contenido completo: ${e.message}`);
    return null;
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function splitIntoParagraphs(text = '') {
  return text
    .split(/\n{2,}/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function toSentences(text = '') {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function scoreSentence(sentence = '', title = '') {
  const s = sentence.toLowerCase();
  let score = 0;
  if (sentence.length >= 70 && sentence.length <= 260) score += 2;
  if (/huelva|ayamonte|punta umbría|lepe|isla cristina|cartaya|moguer|aracena|almonte|universidad|guardia civil|ayuntamiento|junta/.test(s)) score += 3;
  if (/\d/.test(sentence)) score += 2;
  if (/ha |han |fue |será |se |detenido|interviene|anuncia|aprueba|recurre|celebra|acerca|incaut/.test(s)) score += 2;
  if (title && s.includes(title.toLowerCase().split(' ').slice(0, 3).join(' '))) score += 2;
  if (/publicidad|suscríbete|newsletter|leer más|comentarios|whatsapp|telegram|instagram|facebook|twitter|tiktok/.test(s)) score -= 5;
  return score;
}

function extractEditorialFacts(news, fullContent) {
  const cleanedExcerpt = cleanExcerpt(news.excerpt || '', news.title || '');
  const text = `${cleanedExcerpt}\n\n${fullContent || ''}`.trim();
  const titleWords = titleSignalWords(news.title);
  const normalizedTitle = normalizeForCompare(news.title);

  const candidates = toSentences(text)
    .filter(sentence => sentence.length >= 45 && sentence.length <= 240)
    .filter(sentence => {
      const lower = sentence.toLowerCase();
      if (/esta es la última hora|lo seguiremos de cerca|huelva\.cloud|fuente original|leer original|ver original/i.test(lower)) return false;
      if (/te recomendamos|suscríbete|newsletter|comentarios|normas de participación|publicidad/i.test(lower)) return false;
      return true;
    })
    .map(sentence => {
      const normalizedSentence = normalizeForCompare(sentence);
      const words = new Set(normalizedSentence.split(/\W+/).filter(w => w.length > 3));
      let overlap = 0;
      for (const word of words) if (titleWords.has(word)) overlap++;
      const score = scoreSentence(sentence, news.title) + overlap;
      return { sentence, normalizedSentence, overlap, score };
    })
    .filter(item => item.score > 2)
    .filter(item => item.overlap >= 1 || normalizedTitle.includes(item.normalizedSentence.slice(0, 24)))
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const seen = new Set();
  for (const item of candidates) {
    if (seen.has(item.normalizedSentence)) continue;
    seen.add(item.normalizedSentence);
    selected.push(item.sentence);
    if (selected.length >= 6) break;
  }

  const deduped = uniqueFacts(selected);
  if (deduped.length === 0 && !isWeakExcerpt(cleanedExcerpt)) deduped.push(cleanedExcerpt);
  return deduped;
}

function getLocationContext(text = '') {
  const haystack = text.toLowerCase();
  const locations = [
    'Huelva capital', 'Huelva', 'Ayamonte', 'Punta Umbría', 'Lepe', 'Isla Cristina', 'Cartaya',
    'Almonte', 'Moguer', 'Palos de la Frontera', 'Aracena', 'La Palma del Condado', 'Condado',
    'Sierra', 'Costa', 'Odiel', 'Muelle del Tinto', 'Universidad de Huelva', 'UHU', 'Puerto de Huelva'
  ];
  return locations.filter(location => haystack.includes(location.toLowerCase())).slice(0, 4);
}

function inferTopic(text = '') {
  const haystack = text.toLowerCase();
  if (/ayuntamiento|pleno|municipal|junta|diputación|tribunal|causa|recurso|juzgado/.test(haystack)) return 'institucional';
  if (/guardia civil|detenido|estafa|interviene|incaut|suceso|accidente|investigación policial/.test(haystack)) return 'sucesos';
  if (/feria|concierto|festival|teatro|agenda|cultura|exposición|aniversario/.test(haystack)) return 'cultura';
  if (/universidad|uhu|alumnado|colegio|instituto|educación|francofon/.test(haystack)) return 'educacion';
  if (/empresa|empleo|puerto|industria|inversión|econom/.test(haystack)) return 'economia';
  return 'general';
}

function cleanExcerpt(excerpt = '', title = '') {
  const raw = (excerpt || '').replace(/\s+/g, ' ').trim();
  if (!raw) return '';

  const normalizedTitle = normalizeForCompare(title);
  const sentences = toSentences(raw)
    .map(sentence => sentence.trim())
    .filter(Boolean)
    .filter(sentence => {
      const normalized = normalizeForCompare(sentence);
      if (!normalized) return false;
      if (/^hbn\.?$/.test(normalized)) return false;
      if (/detenidas?\s+\w+\s+personas|cinco toneladas de hachis|leer mas|suscribete|newsletter/.test(normalized)) return false;
      if (normalizedTitle && !hasEnoughTitleAlignment(title, [sentence]) && sentence.length < 140) return false;
      return true;
    });

  return sentences.join(' ').trim();
}

function uniqueFacts(facts = []) {
  const kept = [];
  for (const fact of facts) {
    const normalized = normalizeForCompare(fact);
    const isDuplicate = kept.some(existing => {
      const current = normalizeForCompare(existing);
      return current.includes(normalized) || normalized.includes(current);
    });
    if (!isDuplicate) kept.push(fact);
  }
  return kept;
}

function titleSignalWords(title = '') {
  return new Set(
    title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .split(/\W+/)
      .filter(word => word.length >= 4)
      .filter(word => !['huelva', 'provincia', 'sobre', 'desde', 'para', 'esta', 'este', 'primeros', 'primera'].includes(word))
  );
}

function normalizeForCompare(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasEnoughTitleAlignment(title = '', facts = []) {
  const signals = titleSignalWords(title);
  if (signals.size === 0) return true;
  const joined = normalizeForCompare(facts.join(' '));
  let matches = 0;
  for (const signal of signals) {
    if (joined.includes(signal)) matches++;
  }
  return matches >= Math.min(2, signals.size);
}

function isWeakExcerpt(text = '') {
  const clean = (text || '').trim();
  if (!clean) return true;
  if (/\.\.\.$/.test(clean)) return true;
  if (clean.length < 90) return true;
  if (/^hbn\./i.test(clean)) return true;
  return false;
}

function assessNewsQuality(news, fullContent, facts) {
  const issues = [];
  const excerptWeak = isWeakExcerpt(news.excerpt || '');
  const contentLength = (fullContent || '').trim().length;
  const factCount = facts.length;
  const aligned = hasEnoughTitleAlignment(news.title, facts);
  const firstFact = normalizeForCompare(facts[0] || '');
  const duplicateLead = firstFact && normalizeForCompare(news.excerpt || '').includes(firstFact);

  if (contentLength < 280) issues.push('full_content_short');
  if (factCount < 2) issues.push('too_few_facts');
  if (!aligned) issues.push('title_fact_mismatch');
  if (excerptWeak && contentLength < 280) issues.push('weak_source_material');
  if (duplicateLead && factCount < 2) issues.push('low_information_density');

  return {
    ok: issues.length === 0,
    issues,
    contentLength,
    factCount,
    aligned,
    excerptWeak,
    duplicateLead
  };
}

function buildContextParagraphs(news, fullContent) {
  const text = `${news.title}. ${news.excerpt}. ${fullContent || ''}`;
  const topic = inferTopic(text);
  const locations = getLocationContext(text);
  const placeLine = locations.length > 0
    ? `La noticia aterriza especialmente en ${locations.join(', ')}, así que no se queda en un titular abstracto: toca calle, instituciones o actividad real de la provincia.`
    : 'Aunque el titular sea puntual, el fondo es provincial: importa porque añade otra pieza al tablero diario de Huelva y su área de influencia.';

  switch (topic) {
    case 'institucional':
      return [
        'Aquí no basta con repetir el titular. Cuando se mueve una pieza institucional en Huelva, lo relevante no es solo quién recurre, anuncia o promete, sino qué cambia de verdad para vecinos, afectados y calendario político.',
        `${placeLine} En este tipo de asuntos conviene separar tres capas: el gesto público, la utilidad real y el tiempo que puede tardar en notarse algo fuera del papel.`
      ];
    case 'educacion':
      return [
        'Las noticias educativas y universitarias suelen parecer pequeñas hasta que se leen bien. Luego resulta que afectan a reputación de ciudad, atracción de talento y vida cotidiana de estudiantes, familias y profesorado.',
        `${placeLine} Si detrás hay universidad, centros educativos o colaboración institucional, el valor está en medir si esto se queda en foto o si deja programa, continuidad y efecto visible.`
      ];
    case 'cultura':
      return [
        'En cultura y agenda local el error típico es tratar cualquier anuncio como relleno amable. Pero cuando una cita gana tracción en Huelva, mueve hostelería, conversación y percepción de ciudad más de lo que parece.',
        `${placeLine} La pregunta buena no es si suena bonito, sino si de verdad activa gente, calendario y motivo para salir.`
      ];
    case 'sucesos':
      return [
        'En sucesos conviene bajar el ruido y subir la claridad. El titular llama, sí, pero lo útil para el lector es entender qué ha pasado, a quién afecta y qué lectura deja sobre seguridad, control o problemas repetidos en la provincia.',
        `${placeLine} Eso obliga a contar el hecho sin amarillismo y con un mínimo de contexto para no dejar la noticia en puro sobresalto.`
      ];
    case 'economia':
      return [
        'Cuando una noticia toca economía, empleo o industria en Huelva, la lectura buena no es decorativa: hay que mirar si eso genera actividad real, mejora márgenes locales o se queda en otra promesa con traje planchado.',
        `${placeLine} En una provincia que mezcla puerto, campo, costa y universidad, cada movimiento económico arrastra más piezas de las que aparenta.`
      ];
    default:
      return [
        'No todo titular provincial merece el mismo peso, pero sí una lectura con más criterio que copiar y pegar. La clave es traducir el hecho a impacto local reconocible y quitarle la grasa retórica con la que suele venir envuelto.',
        `${placeLine} Ahí es donde una noticia deja de ser ruido y empieza a servir.`
      ];
  }
}

async function rewriteWithAI(news, options = {}) {
  console.log('   🤖 Generando noticia completa con síntesis editorial interna...');

  const fullContent = options.fullContent ?? await fetchFullContent(news.url);
  const cleanedExcerpt = cleanExcerpt(news.excerpt || '', news.title || '');
  const baseText = (fullContent || cleanedExcerpt || news.title || '').trim();
  const facts = uniqueFacts(extractEditorialFacts({ ...news, excerpt: cleanedExcerpt }, fullContent));
  const quality = assessNewsQuality({ ...news, excerpt: cleanedExcerpt }, fullContent, facts);
  if (options.enforceQuality && !quality.ok) {
    const detail = quality.issues.join(', ') || 'unknown_quality_issue';
    throw new Error(`QUALITY_GATE:${detail}`);
  }

  const contextParagraphs = buildContextParagraphs({ ...news, excerpt: cleanedExcerpt }, fullContent);
  const locations = getLocationContext(`${news.title} ${cleanedExcerpt} ${baseText}`);
  const impactLine = locations.length > 0
    ? `La lectura práctica para Huelva.cloud es bastante simple: esto no va solo de ${locations[0]}, sino del efecto arrastre que puede dejar en la provincia y en la conversación local de los próximos días.`
    : 'La lectura práctica para Huelva.cloud es bastante simple: esto importa si termina teniendo traducción en calle, agenda pública o decisiones concretas, no si se queda en frase institucional.';

  const opening = facts[0] || cleanedExcerpt || news.title;
  const bodyFacts = uniqueFacts(facts.slice(1, 4));
  const watchFacts = uniqueFacts(facts.slice(4, 6)).filter(fact => !bodyFacts.some(body => normalizeForCompare(body) === normalizeForCompare(fact)));

  const htmlParts = [];
  htmlParts.push('<div class="news-synthesis">');
  htmlParts.push(`<p class="lead font-bold text-lg mb-4">${escapeHtml(news.title)}</p>`);
  htmlParts.push('<div class="body prose prose-sm mb-4">');

  htmlParts.push('<h2>Qué ha pasado</h2>');
  htmlParts.push(`<p>${escapeHtml(opening)}</p>`);
  if (bodyFacts.length > 0) {
    htmlParts.push(`<p>${escapeHtml(bodyFacts.join(' '))}</p>`);
  } else if (news.excerpt) {
    htmlParts.push(`<p>${escapeHtml(news.excerpt)}</p>`);
  }

  htmlParts.push('<h2>Qué significa para la provincia</h2>');
  contextParagraphs.forEach((paragraph) => {
    htmlParts.push(`<p>${escapeHtml(paragraph)}</p>`);
  });
  htmlParts.push(`<p>${escapeHtml(impactLine)}</p>`);

  htmlParts.push('<h2>Qué vigilar ahora</h2>');
  if (watchFacts.length > 0) {
    htmlParts.push(`<p>${escapeHtml(watchFacts.join(' '))}</p>`);
  } else if (bodyFacts.length > 0) {
    htmlParts.push(`<p>${escapeHtml(bodyFacts.join(' '))}</p>`);
  } else {
    htmlParts.push('<p>Ahora mismo conviene seguir si aparecen datos nuevos, una respuesta institucional con sustancia o una consecuencia concreta que saque esta historia del terreno del titular y la lleve al de los hechos comprobables.</p>');
  }
  htmlParts.push('<p>La prueba de verdad no es el ruido inicial, sino si en los próximos días aparecen consecuencias medibles, más detalle confirmado o movimientos que cambien algo fuera del papel.</p>');

  htmlParts.push('</div>');
  htmlParts.push('<div class="future border-t border-navy-10 pt-4 mt-6">');
  htmlParts.push(`<p class="text-xs text-navy-40 italic">Fuente original consultada: ${escapeHtml(news.source)} • <a href="${news.url}" target="_blank" rel="noopener" class="underline hover:text-terracotta">Leer original →</a></p>`);
  htmlParts.push('</div>');
  htmlParts.push('</div>');

  return htmlParts.join('\n');
}

async function main() {
  const forceMode = process.argv.includes('--force');
  
  console.log('🗞️ Scrape + Rewrite: generando noticia diaria');
  console.log(forceMode ? '   [Modo FORCE activado]' : '');
  console.log('');

  // Leer noticias existentes
  let existingNews = [];
  try {
    const existing = JSON.parse(await fs.readFile(NEWS_FILE, 'utf8').catch(() => '{}'));
    existingNews = existing.news || [];
  } catch (_) {}
  
  const existingUrls = new Set(existingNews.map(n => n.url));
  console.log(`📚 Noticias existentes: ${existingNews.length}`);

  const candidates = [];
  for (const source of SOURCES) {
    try {
      console.log(`📡 ${source.name}`);
      let item = await tryRSS(source);
      if (!item) { item = await tryHtmlFallback(source); }
      if (item) {
        if (existingUrls.has(item.url) && !forceMode) {
          console.log(`   ⚠️ Ya existe (skip, usa --force para forzar)`);
        } else {
          console.log(`   ✅ candidato (score: ${item.score})`);
          candidates.push(item);
        }
      } else {
        console.log('   ❌ sin candidato válido');
      }
    } catch (e) {
      console.log(`   ❌ ${e.message}`);
    }
  }

  if (candidates.length === 0) {
    console.log('\n❌ No se obtuvo ninguna noticia nueva sobre Huelva');
    process.exit(0); // Exit 0 = no es error, simplemente no hay novedades
  }

  // Ordenar por score y seleccionar el mejor
  candidates.sort((a, b) => b.score - a.score);
  const selected = candidates[0];
  
  console.log('\n📰 Noticia seleccionada:');
  console.log(`   Título: ${selected.title}`);
  console.log(`   Fuente: ${selected.source}`);
  console.log(`   Score: ${selected.score}`);

  console.log('\n✍️ Reescribiendo con IA...');
  const content = await rewriteWithAI(selected);

  const newItem = {
    title: selected.title,
    excerpt: selected.excerpt.slice(0, 200) + (selected.excerpt.length > 200 ? '...' : ''),
    content,
    url: selected.url,
    publishedAt: selected.publishedAt,
    source: selected.source,
    category: 'Noticias',
    image: null,
    external: false
  };

  // Combinar, eliminar duplicados por URL y limitar a 15
  const combined = existingUrls.has(newItem.url) && !forceMode
    ? existingNews
    : [newItem, ...existingNews];

  const finalNews = [];
  const seenUrls = new Set();
  for (const item of combined) {
    if (!item?.url || seenUrls.has(item.url)) continue;
    seenUrls.add(item.url);
    finalNews.push(item);
    if (finalNews.length >= 15) break;
  }

  const payload = {
    lastUpdated: new Date().toISOString(),
    count: finalNews.length,
    news: finalNews
  };

  await fs.writeFile(NEWS_FILE, JSON.stringify(payload, null, 2));
  
  console.log('');
  console.log('✅ Noticia guardada exitosamente');
  console.log(`📊 Total acumulado: ${finalNews.length} noticias`);
  console.log(`📁 Archivo: ${NEWS_FILE}`);
  
  // Indicar si hay cambios para commit
  if (!existingUrls.has(newItem.url) || forceMode) {
    console.log('🔄 Cambios pendientes de commit');
    process.exit(0); // Hay cambios
  } else {
    console.log('ℹ️ Sin cambios nuevos');
    process.exit(0);
  }
}

export {
  fetchFullContent,
  extractEditorialFacts,
  buildContextParagraphs,
  assessNewsQuality,
  rewriteWithAI
};

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error('❌ Error fatal:', err.message);
    process.exit(1);
  });
}
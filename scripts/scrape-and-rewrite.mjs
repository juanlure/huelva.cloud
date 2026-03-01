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

function generatePrompt(news) {
  return `Eres redactor jefe de Huelva.cloud, el medio local de referencia. Tu misión: reescribir esta noticia con copy potente, directo, sin relleno corporativo.

ESTRUCTURA OBLIGATORIA (usa estos subtítulos exactos en h2):

## Lead de impacto
Abre con gancho emocional. Qué pasó, en Huelva, ahora. Máximo 2 párrafos cortos. Primera frase debe ser memorable.

## El mensaje que importa  
Por qué esto importa para el lector local. Contexto que nadie más está dando. La historia detrás de la noticia. Datos concretos si los hay.

## El momento justo
Por qué pasa ahora (timing político, social, económico). Qué fuerzas convergen. Implicaciones para Huelva en los próximos meses.

## La pregunta que dejan
Implicaciones futuras. Cierre memorable que invite a reflexionar o compartir.

DATOS DE ENTRADA:
- Titular original: "${news.title}"
- Extracto: "${news.excerpt}"
- Fuente: ${news.source}

REGLAS DE ESTILO HUELVA.CLOUD:
- Tono: cercano, directo, con actitud. Somos onubenses hablando a onubenses.
- NUNCA uses frases como "según fuentes", "se informa que", "la institución ha destacado", "desde el Ayuntamiento se ha..."
- Usa negritas (<strong>) para énfasis estratégico
- Incluye nombres de barrios, pueblos o lugares específicos de Huelva
- Longitud: 400-600 palabras
- Escribe en HTML puro (párrafos con <p>, subtítulos con <h2>)
- NUNCA uses bloques de código markdown como \`\`\`html
- Cierra con: <p><em>Fuente consultada: ${news.source}. <a href="${news.url}" target="_blank" rel="noopener">Leer noticia completa →</a></em></p>

Ejemplo de estilo:
"El Ayuntamiento ha aprobado..." ❌
"La alcaldesa María José deja claro que..." ✅

Devuelve SOLO el HTML del artículo, sin explicaciones previas, sin markdown, sin bloques de código.`;
}

async function rewriteWithAI(news) {
  const tmpFile = `/tmp/huelva-prompt-${Date.now()}.txt`;
  try {
    const prompt = generatePrompt(news);
    await fs.writeFile(tmpFile, prompt, 'utf8');
    
    const oc = process.env.HOME + '/.npm-global/bin/openclaw';
    console.log('   🤖 Llamando a OpenClaw para reescribir...');
    
    const result = execSync(
      `${oc} agent --local --agent main --message-file "${tmpFile}" --json`,
      { encoding: 'utf-8', timeout: 180000 } // 3 minutos timeout
    );
    
    const data = JSON.parse(result);
    let content = data.payloads?.[0]?.text || '';
    
    // Limpiar posibles bloques de código
    content = content
      .replace(/```html\n?/gi, '')
      .replace(/```\n?$/gi, '')
      .replace(/^html\n/i, '')
      .trim();
    
    // Verificar que el contenido sea válido
    if (content.length < 200) {
      throw new Error('Contenido generado demasiado corto');
    }
    
    console.log(`   ✅ Artículo reescrito (${content.length} caracteres)`);
    return content;
  } catch (e) {
    console.log(`   ⚠️ AI falló: ${e.message}`);
    console.log('   📝 Usando fallback básico');
    return `<p><strong>${news.title}</strong></p>
<p>${news.excerpt}</p>
<p><em>Noticia de ${news.source}. <a href="${news.url}" target="_blank" rel="noopener">Leer noticia completa →</a></em></p>`;
  } finally {
    await fs.unlink(tmpFile).catch(() => {});
  }
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

  const humanDate = new Date(selected.publishedAt).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

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

  // Combinar y limitar a 15
  const combined = existingUrls.has(newItem.url) && !forceMode
    ? existingNews
    : [newItem, ...existingNews];
  const finalNews = combined.slice(0, 15);

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

main().catch((err) => {
  console.error('❌ Error fatal:', err.message);
  process.exit(1);
});
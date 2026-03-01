#!/usr/bin/env node
/**
 * Scraper + Generador de noticias con copy original
 * 1) Scrapea 1 noticia de fuentes locales
 * 2) Usa Gemini para reescribirla con estructura editorial propia
 * 3) Guarda como contenido original de Huelva.cloud
 */

import https from 'https';
import http from 'http';
import { parseString } from 'xml2js';
import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import * as cheerio from 'cheerio';

const NEWS_FILE = path.join(process.cwd(), 'src/content/external-news.json');

const SOURCES = [
  { name: 'Huelva Información', rss: 'https://www.huelvainformacion.es/rss/', fallbackUrl: 'https://www.huelvainformacion.es/huelva/' },
  { name: 'Huelva Buenas Noticias', rss: 'https://huelvabuenasnoticias.com/feed/', fallbackUrl: 'https://huelvabuenasnoticias.com/' },
  { name: 'Diario de Huelva', rss: 'https://www.diariodehuelva.es/feed/', fallbackUrl: 'https://www.diariodehuelva.es/' },
  { name: 'Europa Press Huelva', rss: 'https://www.europapress.es/andalucia/huelva/rss/', fallbackUrl: 'https://www.europapress.es/andalucia/huelva/' },
  { name: 'Huelva24', rss: 'https://www.huelva24.com/rss/', fallbackUrl: 'https://www.huelva24.com/' },
  { name: 'COPE Huelva', rss: 'https://www.cope.es/rss/actualidad', fallbackUrl: 'https://www.cope.es/emisoras/andalucia/huelva-provincia/huelva' },
  { name: 'Canal Sur Huelva', rss: 'https://www.canalsur.es/rss/', fallbackUrl: 'https://www.canalsur.es/noticias/andalucia/huelva/' },
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

function normalizeRssItem(item, sourceName) {
  const title = stripHtml(item?.title || 'Sin título');
  const excerpt = stripHtml(item?.description || item?.summary || '').slice(0, 300);
  const rawLink = typeof item?.link === 'string' ? item.link : (item?.link?.href || '');
  const link = encodeURI(rawLink);
  const publishedAt = item?.pubDate || item?.published || item?.updated || new Date().toISOString();
  if (/podcast|audio|galeria|opinion/i.test(`${title} ${link}`)) return null;
  return { title, excerpt, url: link, publishedAt, source: sourceName };
}

async function tryRSS(source) {
  const raw = await fetchURL(source.rss);
  const parsed = await parseRSS(raw);
  let items = parsed?.rss?.channel?.item;
  if (items && !Array.isArray(items)) items = [items];
  if (!items) { items = parsed?.feed?.entry; if (items && !Array.isArray(items)) items = [items]; }
  if (!items || items.length === 0) return null;
  for (const item of items) {
    const news = normalizeRssItem(item, source.name);
    if (news && news.title && news.url) return news;
  }
  return null;
}

async function tryHtmlFallback(source) {
  const html = await fetchURL(source.fallbackUrl);
  const $ = cheerio.load(html);
  const candidate = $('article a[href], .news a[href], .item a[href], h2 a[href], h3 a[href]').first();
  const href = candidate.attr('href');
  const title = stripHtml(candidate.text());
  if (!href || !title) return null;
  const url = encodeURI(href.startsWith('http') ? href : new URL(href, source.fallbackUrl).toString());
  if (/podcast|audio|galeria|opinion/i.test(`${title} ${url}`)) return null;
  return { title, excerpt: `Noticia destacada de ${source.name}.`, url, publishedAt: new Date().toISOString(), source: source.name };
}

function generatePrompt(news) {
  return `Eres redactor jefe de Huelva.cloud. Escribe esta noticia con copy potente, directo, sin relleno corporativo.

ESTRUCTURA OBLIGATORIA (usa estos subtítulos exactos):

## Lead de impacto
- Abre con una frase fuerte que enganche
- Qué pasó, en Huelva, ahora
- Máximo 2 párrafos

## El mensaje que importa  
- Por qué esto importa para el lector local
- Contexto que nadie más está dando
- La historia detrás de la noticia

## El momento justo
- Por qué pasa ahora (timing político, social, económico)
- Qué fuerzas convergen

## La pregunta que dejan / Lo que viene
- Implicaciones futuras
- Cierre memorable que invite a reflexionar

DATOS DE ENTRADA:
- Titular original: "${news.title}"
- Extracto: "${news.excerpt}"
- Fuente: ${news.source}

REGLAS DE ESTILO:
- Tono: cercano, directo, con actitud
- Sin frases como "según fuentes", "se informa que", "la institución ha destacado"
- Usa negritas para énfasis estratégico
- Incluye nombres de barrios y pueblos de Huelva cuando sea relevante
- Longitud: 500-700 palabras
- Escribe en HTML puro (párrafos con <p>, subtítulos con <h2>), NUNCA uses bloques de código markdown como \`\`\`html
- Cierra con "Fuente consultada: ${news.source}"

Devuelve SOLO el HTML del artículo, sin explicaciones, sin markdown, sin bloques de código.`;
}

async function rewriteWithAI(news) {
  const tmpFile = `/tmp/huelva-prompt-${Date.now()}.txt`;
  try {
    const prompt = generatePrompt(news);
    // Escribir prompt a archivo temporal para evitar problemas con caracteres especiales en shell
    await fs.writeFile(tmpFile, prompt, 'utf8');
    
    const oc = process.env.HOME + '/.npm-global/bin/openclaw';
    const result = execSync(
      `${oc} agent --local --agent main --message-file "${tmpFile}" --json`,
      { encoding: 'utf-8', timeout: 120000 }
    );
    
    const data = JSON.parse(result);
    let content = data.payloads?.[0]?.text || '';
    content = content.replace(/```html\n?/g, '').replace(/```\n?$/g, '').trim();
    return content;
  } catch (e) {
    // Fallback: construir un artículo básico en HTML sin IA
    console.log(`   ⚠️ AI falló, usando formato básico`);
    return `<p>${news.excerpt}</p><p><em>Noticia de ${news.source}. <a href="${news.url}" target="_blank" rel="noopener">Leer noticia original →</a></em></p>`;
  } finally {
    await fs.unlink(tmpFile).catch(() => {});
  }
}

async function main() {
  console.log('🗞️ Scrape + Rewrite: generando noticia diaria\n');

  const candidates = [];
  for (const source of SOURCES) {
    try {
      console.log(`📡 ${source.name}`);
      let item = await tryRSS(source);
      if (!item) { item = await tryHtmlFallback(source); }
      if (item) {
        console.log('   ✅ candidato');
        candidates.push(item);
      } else {
        console.log('   ❌ sin candidato');
      }
    } catch (e) {
      console.log(`   ❌ ${e.message}`);
    }
  }

  if (candidates.length === 0) {
    console.log('\n❌ No se obtuvo ninguna noticia');
    process.exit(1);
  }

  // Filtrar: solo noticias que mencionen Huelva o sean claramente locales
  const localCandidates = candidates.filter(n =>
    /huelva/i.test(`${n.title} ${n.excerpt} ${n.url}`)
  );
  const pool = localCandidates.length > 0 ? localCandidates : candidates;

  // Priorizar por frescura y fuente local
  const score = (n) => {
    const esFuenteLocal = /Huelva Información|Huelva24|COPE Huelva|Canal Sur Huelva/i.test(n.source) ? 1 : 0;
    const fecha = new Date(n.publishedAt).getTime() || 0;
    return esFuenteLocal * 100_000_000 + fecha;
  };
  pool.sort((a, b) => score(b) - score(a));
  const selected = pool[0];

  console.log('\n✍️ Reescribiendo con IA...');
  const content = await rewriteWithAI(selected);

  const humanDate = new Date(selected.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  // Leer noticias existentes para acumular (no sobrescribir)
  let existingNews = [];
  try {
    const existing = JSON.parse(await fs.readFile(NEWS_FILE, 'utf8').catch(() => '{}'));
    existingNews = existing.news || [];
  } catch (_) {}

  const newItem = {
    title: selected.title,
    excerpt: selected.excerpt.slice(0, 160) + '...',
    content,
    url: selected.url,
    publishedAt: selected.publishedAt,
    source: selected.source,
    category: 'Noticias',
    image: null,
    external: false
  };

  // Deduplicar por URL y añadir la nueva al principio
  const urlSet = new Set(existingNews.map(n => n.url));
  const combined = urlSet.has(newItem.url)
    ? existingNews  // ya existe, no duplicar
    : [newItem, ...existingNews];

  // Mantener máximo 15 noticias
  const finalNews = combined.slice(0, 15);

  const payload = {
    lastUpdated: new Date().toISOString(),
    count: finalNews.length,
    news: finalNews
  };

  await fs.writeFile(NEWS_FILE, JSON.stringify(payload, null, 2));
  console.log(`📚 Total noticias acumuladas: ${finalNews.length}`);

  console.log('\n✅ Noticia diaria guardada');
  console.log(`📰 ${selected.title}`);
  console.log(`📁 ${NEWS_FILE}`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

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
  return `Eres redactor de Huelva.cloud, medio digital local con voz cercana, directa y útil.

REESCRIBE la siguiente noticia como artículo propio, nunca copies literal. Estructura:
1) Lead impactante (qué pasó, en Huelva, ahora)
2) Contexto (por qué importa para el lector local)
3) Detalles relevantes (quién, cuándo, dónde, con datos si los hay)
4) Implicaciones o próximos pasos

Datos de entrada:
- Titular original: "${news.title}"
- Extracto: "${news.excerpt}"
- Fuente original: ${news.source}

REGLAS:
- Longitud: 400-600 palabras
- Tono: cercano, directo, sin relleno corporativo
- Sin frases como "según fuentes" o "se informa que"
- Cierra con una línea corta de contexto local

Devuelve solo el artículo, sin metadatos ni explicaciones.`;
}

async function rewriteWithAI(news) {
  try {
    const prompt = generatePrompt(news);
    // Usar openclaw agent --local con --agent main
    const result = execSync(
      `openclaw agent --local --agent main --message "${prompt.replace(/"/g, '\\"')}" --json`,
      { encoding: 'utf-8', timeout: 120000, env: { ...process.env } }
    );
    
    const data = JSON.parse(result);
    // La respuesta viene en payloads[0].text
    const content = data.payloads?.[0]?.text || '';
    return content.trim();
  } catch (e) {
    console.log(`   ⚠️ AI falló (${e.message}), usando extracto original`);
    return `<p>${news.excerpt}</p>`;
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

  // Priorizar por mención de Huelva y frescura
  const score = (n) => {
    const hayHuelva = /huelva/i.test(`${n.title} ${n.url}`) ? 2 : 0;
    const esFuenteLocal = /Huelva Información|Huelva24|COPE Huelva|Canal Sur Huelva/i.test(n.source) ? 1 : 0;
    const fecha = new Date(n.publishedAt).getTime() || 0;
    return hayHuelva * 1_000_000_000 + esFuenteLocal * 100_000_000 + fecha;
  };
  candidates.sort((a, b) => score(b) - score(a));
  const selected = candidates[0];

  console.log('\n✍️ Reescribiendo con IA...');
  const content = await rewriteWithAI(selected);

  const humanDate = new Date(selected.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  const payload = {
    lastUpdated: new Date().toISOString(),
    count: 1,
    news: [{
      title: selected.title,
      excerpt: selected.excerpt.slice(0, 160) + '...',
      content,
      url: selected.url,
      publishedAt: selected.publishedAt,
      source: selected.source,
      category: 'Noticias',
      image: null,
      external: false
    }]
  };

  await fs.writeFile(NEWS_FILE, JSON.stringify(payload, null, 2));

  console.log('\n✅ Noticia diaria guardada');
  console.log(`📰 ${selected.title}`);
  console.log(`📁 ${NEWS_FILE}`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

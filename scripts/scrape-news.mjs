#!/usr/bin/env node
/**
 * Scraper de 1 noticia diaria (categoría /noticias)
 * Estrategia:
 * 1) RSS (rápido y estable)
 * 2) Fallback HTML (cheerio) si un RSS falla
 */

import https from 'https';
import http from 'http';
import { parseString } from 'xml2js';
import { promises as fs } from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const NEWS_FILE = path.join(process.cwd(), 'src/content/external-news.json');

const SOURCES = [
  {
    name: 'Huelva Información',
    rss: 'https://www.huelvainformacion.es/rss/',
    fallbackUrl: 'https://www.huelvainformacion.es/huelva/'
  },
  {
    name: 'Europa Press Huelva',
    rss: 'https://www.europapress.es/andalucia/huelva/rss/',
    fallbackUrl: 'https://www.europapress.es/andalucia/huelva/'
  },
  {
    name: 'Huelva24',
    rss: 'https://www.huelva24.com/rss/',
    fallbackUrl: 'https://www.huelva24.com/'
  },
  {
    name: 'ABC Sevilla (Huelva)',
    rss: 'https://sevilla.abc.es/rss/feeds/abc_Andalucia.xml',
    fallbackUrl: 'https://sevilla.abc.es/andalucia/huelva/'
  },
  {
    name: 'Diario de Sevilla (Andalucía)',
    rss: 'https://www.diariodesevilla.es/rss/',
    fallbackUrl: 'https://www.diariodesevilla.es/andalucia/'
  },
  {
    name: 'El Español (Andalucía)',
    rss: 'https://www.elespanol.com/rss/',
    fallbackUrl: 'https://www.elespanol.com/espana/andalucia/'
  },
  {
    name: '20minutos Andalucía',
    rss: 'https://www.20minutos.es/rss/andalucia/',
    fallbackUrl: 'https://www.20minutos.es/minuteca/andalucia/'
  },
  {
    name: 'COPE Huelva',
    rss: 'https://www.cope.es/rss/actualidad',
    fallbackUrl: 'https://www.cope.es/emisoras/andalucia/huelva-provincia/huelva'
  },
  {
    name: 'Onda Cero Huelva',
    rss: 'https://www.ondacero.es/rss/',
    fallbackUrl: 'https://www.ondacero.es/emisoras/andalucia/huelva/'
  },
  {
    name: 'Canal Sur Huelva',
    rss: 'https://www.canalsur.es/rss/',
    fallbackUrl: 'https://www.canalsur.es/noticias/andalucia/huelva/'
  }
];

function fetchURL(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8'
      }
    }, (res) => {
      // Follow redirects
      if (res.statusCode && [301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        if (redirects > 5) return reject(new Error('Too many redirects'));
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).toString();
        return resolve(fetchURL(next, redirects + 1));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

function parseRSS(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false, trim: true }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function stripHtml(s = '') {
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function imageFromItem(item) {
  const media = item?.['media:content'] || item?.enclosure;
  if (media?.$?.url) return media.$.url;
  if (Array.isArray(media) && media[0]?.$?.url) return media[0].$.url;

  const desc = item?.description || '';
  const m = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function normalizeRssItem(item, sourceName) {
  const title = stripHtml(item?.title || 'Sin título');
  const excerpt = stripHtml(item?.description || item?.summary || '').slice(0, 220);
  const rawLink = typeof item?.link === 'string' ? item.link : (item?.link?.href || '');
  const link = encodeURI(rawLink);
  const publishedAt = item?.pubDate || item?.published || item?.updated || new Date().toISOString();
  const image = imageFromItem(item) || null;

  // Filtro básico para evitar piezas no-noticia
  if (/podcast|audio|galeria|opinion/i.test(`${title} ${link}`)) return null;

  return {
    title,
    excerpt: excerpt ? `${excerpt}...` : 'Leer noticia completa en el medio original.',
    url: link,
    publishedAt,
    source: sourceName,
    category: 'Noticias',
    image,
    external: true
  };
}

async function tryRSS(source) {
  const raw = await fetchURL(source.rss);
  const parsed = await parseRSS(raw);

  // RSS 2.0
  let items = parsed?.rss?.channel?.item;
  if (items && !Array.isArray(items)) items = [items];

  // Atom fallback
  if (!items) {
    items = parsed?.feed?.entry;
    if (items && !Array.isArray(items)) items = [items];
  }

  if (!items || items.length === 0) return null;

  // first valid item
  for (const item of items) {
    const news = normalizeRssItem(item, source.name);
    if (news && news.title && news.url) return news;
  }
  return null;
}

async function tryHtmlFallback(source) {
  const html = await fetchURL(source.fallbackUrl);
  const $ = cheerio.load(html);

  // Heurística genérica para primer enlace de noticia
  const candidate = $('article a[href], .news a[href], .item a[href], h2 a[href], h3 a[href]').first();
  const href = candidate.attr('href');
  const title = stripHtml(candidate.text());

  if (!href || !title) return null;

  const rawUrl = href.startsWith('http') ? href : new URL(href, source.fallbackUrl).toString();
  const url = encodeURI(rawUrl);

  // Filtro básico para evitar piezas no-noticia (podcast/audios)
  if (/podcast|audio|galeria|opinion/i.test(`${title} ${url}`)) return null;

  return {
    title,
    excerpt: `Noticia destacada de ${source.name}. Abre la fuente original para leerla completa.`,
    url,
    publishedAt: new Date().toISOString(),
    source: source.name,
    category: 'Noticias',
    image: null,
    external: true
  };
}

async function main() {
  console.log('🗞️ Scrape diario: 1 noticia local para /noticias\n');

  const candidates = [];

  for (const source of SOURCES) {
    try {
      console.log(`📡 RSS: ${source.name}`);
      const item = await tryRSS(source);
      if (item) {
        console.log('   ✅ OK (RSS)');
        candidates.push(item);
        continue;
      }
      throw new Error('RSS vacío');
    } catch (e) {
      console.log(`   ⚠️ RSS falló (${e.message}). Probando fallback HTML...`);
      try {
        const fallback = await tryHtmlFallback(source);
        if (fallback) {
          console.log('   ✅ OK (HTML fallback)');
          candidates.push(fallback);
        } else {
          console.log('   ❌ Sin candidato en fallback');
        }
      } catch (e2) {
        console.log(`   ❌ Fallback falló: ${e2.message}`);
      }
    }
  }

  if (candidates.length === 0) {
    console.log('\n❌ No se obtuvo ninguna noticia');
    process.exit(1);
  }

  // elegir la mejor: prioriza Huelva en título/URL y luego frescura
  const score = (n) => {
    const hayHuelva = /huelva/i.test(`${n.title} ${n.url}`) ? 2 : 0;
    const esFuenteLocal = /Huelva Información|Huelva24|COPE Huelva|Onda Cero Huelva|Canal Sur Huelva/i.test(n.source) ? 1 : 0;
    const fecha = new Date(n.publishedAt).getTime() || 0;
    return hayHuelva * 1_000_000_000 + esFuenteLocal * 100_000_000 + fecha;
  };
  candidates.sort((a, b) => score(b) - score(a));
  const selected = candidates[0];

  const payload = {
    lastUpdated: new Date().toISOString(),
    count: 1,
    news: [selected]
  };

  await fs.writeFile(NEWS_FILE, JSON.stringify(payload, null, 2));

  console.log('\n✅ Noticia diaria guardada');
  console.log(`📰 ${selected.title}`);
  console.log(`🔗 ${selected.url}`);
  console.log(`📁 ${NEWS_FILE}`);
}

main().catch((err) => {
  console.error('❌ Error fatal:', err.message);
  process.exit(1);
});

import * as cheerio from 'cheerio';

export interface ScrapedArticle {
  url: string;
  title: string;
  content: string;
  image?: string;
  source: string;
}

export async function scrapeArticle(url: string): Promise<ScrapedArticle | null> {
  console.log(`[SCRAPER] Extrayendo: ${url}`);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Huelva.is/1.0; +https://huelva.is)' // Ser educados
      }
    });
    
    if (!res.ok) throw new Error(`Status ${res.status}`);
    
    const html = await res.text();
    const $ = cheerio.load(html);

    // 1. Extraer Metadatos (OG Tags suelen ser lo más fiable)
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    const image = $('meta[property="og:image"]').attr('content');
    const siteName = $('meta[property="og:site_name"]').attr('content') || new URL(url).hostname;

    // 2. Extraer Contenido (Heurística simple: buscar article, main, o divs con mucho texto)
    // Eliminamos basura antes
    $('script, style, nav, header, footer, .ad, .comments, .cookie-banner').remove();

    let content = '';
    
    // Intentar selectores de contenido típicos
    const selectors = ['article', 'main', '.entry-content', '.post-content', '#content'];
    
    for (const sel of selectors) {
      if ($(sel).length > 0) {
        content = $(sel).first().text().trim();
        break;
      }
    }

    // Fallback: Body text
    if (content.length < 200) {
      content = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 5000); // Limite por seguridad
    } else {
       // Limpiar espacios extra
       content = content.replace(/\s+/g, ' ').trim();
    }

    if (!title || content.length < 50) {
        console.warn("[SCRAPER] Contenido insuficiente o título vacío.");
        return null;
    }

    return {
      url,
      title,
      content,
      image,
      source: siteName
    };

  } catch (e) {
    console.error(`[SCRAPER] Error scraping ${url}:`, e);
    return null;
  }
}

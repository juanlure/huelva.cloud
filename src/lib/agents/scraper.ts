import * as cheerio from 'cheerio';

export interface ScrapedArticle {
  url: string;
  title: string;
  content: string;
  image?: string;
  gallery?: string[];
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

    // 1.5 Extract Gallery (Search for imgs in content areas before removing elements)
    const gallery: string[] = [];
    const contentSelectors = ['article', 'main', '.entry-content', '.post-content', '#content', '.gallery', 'figure'];
    
    // Create a temporary cheerio instance for content selection to avoid messing up with original DOM too early if needed
    // But here we are just searching.
    const potentialImages = new Set<string>();

    contentSelectors.forEach(sel => {
        $(sel).find('img').each((_, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src');
            if (src && src.startsWith('http') && !src.includes('pixel') && !src.includes('analytics')) {
                // Filter small icons based on dimensions if available
                const w = parseInt($(el).attr('width') || '0');
                const h = parseInt($(el).attr('height') || '0');
                if ((w === 0 || w > 300) && (h === 0 || h > 200)) { // Simple heuristic
                    potentialImages.add(src);
                }
            }
        });
    });

    // Also add the og:image if not present
    if (image) potentialImages.add(image);

    // Limit gallery to 10 images
    Array.from(potentialImages).slice(0, 10).forEach(img => gallery.push(img));


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
      gallery, // New field
      source: siteName
    };

  } catch (e) {
    console.error(`[SCRAPER] Error scraping ${url}:`, e);
    return null;
  }
}

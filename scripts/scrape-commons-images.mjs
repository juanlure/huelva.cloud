#!/usr/bin/env node
/**
 * Scraping de imágenes de Wikimedia Commons con Playwright
 * Busca imágenes específicas y extrae URLs directas para descarga
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import https from 'https';

const OUTPUT_DIR = 'public/images/guides';

const SEARCHES = [
  {
    filename: 'huelva-puerto.jpg',
    query: 'Puerto de Huelva',
    altQueries: ['Port of Huelva', 'Puerto comercial Huelva']
  },
  {
    filename: 'huelva-gran-teatro.jpg',
    query: 'Gran Teatro Huelva',
    altQueries: ['Teatro Huelva', 'Gran Teatro de Huelva']
  },
  {
    filename: 'fiesta-tradicional-huelva.jpg',
    query: 'Romería Huelva',
    altQueries: ['Fiestas Huelva', 'Colombinas Huelva']
  },
  {
    filename: 'sierra-aracena.jpg',
    query: 'Sierra de Aracena',
    altQueries: ['Aracena naturaleza', 'Parque natural Aracena']
  },
  {
    filename: 'ermita-rocio.jpg',
    query: 'Ermita del Rocío',
    altQueries: ['El Rocío Huelva', 'Santuario Rocío']
  },
  {
    filename: 'muelle-tinto.jpg',
    query: 'Muelle del Tinto',
    altQueries: ['Muelle Tinto Huelva', 'Riotinto Huelva']
  },
  {
    filename: 'ayamonte-guadiana.jpg',
    query: 'Ayamonte',
    altQueries: ['Puente Guadiana', 'Río Guadiana Ayamonte']
  }
];

async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Huelva.is/1.0)' }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, { 
          headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (finalRes) => {
          finalRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function validateImage(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    // Check JPEG magic bytes
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) return 'JPEG';
    // Check PNG magic bytes
    if (buffer[0] === 0x89 && buffer[1] === 0x50) return 'PNG';
    // Check if it's HTML
    const start = buffer.slice(0, 100).toString().toLowerCase();
    if (start.includes('<!doctype') || start.includes('<html')) return 'HTML';
    return 'UNKNOWN';
  } catch {
    return 'ERROR';
  }
}

async function scrapeWithPlaywright() {
  console.log('🎭 Iniciando scraping con Playwright...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const results = [];
  
  for (const search of SEARCHES) {
    console.log(`🔍 Buscando: ${search.query}...`);
    const page = await context.newPage();
    
    try {
      // Navigate to Wikimedia Commons search
      const searchUrl = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(search.query)}&title=Special:MediaSearch&type=image`;
      await page.goto(searchUrl, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for search results
      await page.waitForSelector('.sd-image-results__image img, .fileinfotab', { timeout: 10000 });
      
      // Try to get the first image result
      const imageData = await page.evaluate(() => {
        // Try different selectors
        const selectors = [
          '.sd-image-results__image img',
          '.thumb img',
          '.filehistory img',
          '.mw-file-description img'
        ];
        
        for (const selector of selectors) {
          const img = document.querySelector(selector);
          if (img) {
            return {
              src: img.src,
              alt: img.alt || '',
              title: img.title || ''
            };
          }
        }
        return null;
      });
      
      if (imageData && imageData.src) {
        // Convert thumbnail URL to full size
        let fullUrl = imageData.src;
        if (fullUrl.includes('/thumb/')) {
          fullUrl = fullUrl.replace(/\/thumb\//, '/').replace(/\/[^\/]+$/, '');
        }
        if (!fullUrl.startsWith('http')) {
          fullUrl = 'https:' + fullUrl;
        }
        
        results.push({
          filename: search.filename,
          query: search.query,
          url: fullUrl,
          alt: imageData.alt
        });
        console.log(`  ✓ Encontrada: ${fullUrl.substring(0, 60)}...`);
      } else {
        console.log(`  ✗ No se encontró imagen para: ${search.query}`);
        results.push({
          filename: search.filename,
          query: search.query,
          url: null,
          error: 'No image found'
        });
      }
      
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      results.push({
        filename: search.filename,
        query: search.query,
        url: null,
        error: error.message
      });
    }
    
    await page.close();
  }
  
  await browser.close();
  return results;
}

async function downloadImages(results) {
  console.log('\n📥 Descargando imágenes...\n');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  let success = 0;
  let failed = 0;
  
  for (const result of results) {
    if (!result.url) {
      console.log(`⏭️  Saltando ${result.filename} (sin URL)`);
      failed++;
      continue;
    }
    
    const outputPath = path.join(OUTPUT_DIR, result.filename);
    process.stdout.write(`📥 ${result.filename}... `);
    
    try {
      await downloadFile(result.url, outputPath);
      const type = await validateImage(outputPath);
      
      if (type === 'JPEG' || type === 'PNG') {
        const stats = await fs.stat(outputPath);
        console.log(`✓ ${type} ${(stats.size/1024).toFixed(1)}KB`);
        success++;
      } else {
        console.log(`✗ Archivo inválido (${type})`);
        await fs.unlink(outputPath).catch(() => {});
        failed++;
      }
    } catch (error) {
      console.log(`✗ Error: ${error.message}`);
      failed++;
    }
  }
  
  return { success, failed };
}

async function main() {
  console.log('='.repeat(60));
  console.log('🖼️  Scraping de Wikimedia Commons con Playwright');
  console.log('='.repeat(60) + '\n');
  
  try {
    const results = await scrapeWithPlaywright();
    
    // Save results to JSON for reference
    await fs.writeFile(
      path.join(OUTPUT_DIR, '../image-search-results.json'),
      JSON.stringify(results, null, 2)
    );
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Resultados de búsqueda:');
    console.log('='.repeat(60));
    results.forEach(r => {
      const status = r.url ? '✓' : '✗';
      console.log(`${status} ${r.filename}: ${r.url ? r.url.substring(0, 50) + '...' : r.error}`);
    });
    
    const { success, failed } = await downloadImages(results);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Resumen final:');
    console.log(`✅ Descargadas: ${success}/${results.length}`);
    console.log(`❌ Fallidas: ${failed}/${results.length}`);
    console.log('='.repeat(60));
    
    if (failed > 0) {
      console.log('\n⚠️  Para las imágenes fallidas, revisa:');
      console.log('   docs/MISSING_IMAGES_URLS.md');
      console.log('   public/image-search-results.json');
    }
    
  } catch (error) {
    console.error('\n💥 Error fatal:', error.message);
    process.exit(1);
  }
}

main();

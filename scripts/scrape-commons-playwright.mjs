#!/usr/bin/env node
/**
 * Scrapeo de imágenes Wikimedia Commons con Playwright
 * Navega, busca, extrae URLs de imágenes reales
 */

import { chromium } from 'playwright';
import https from 'https';
import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = '/home/claw1/.openclaw/workspace/huelva-is/public/images/guides';

const SEARCHES = [
  { name: 'huelva-plaza', query: 'Huelva plaza' },
  { name: 'huelva-puerto', query: 'Puerto Huelva' },
  { name: 'huelva-muelle', query: 'Muelle Tinto Huelva' },
  { name: 'huelva-catedral', query: 'Catedral Huelva' },
  { name: 'choco-frito', query: 'choco frito tapa' },
  { name: 'gamba-huelva', query: 'gamba blanca Huelva' }
];

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (finalRes) => handleDownload(finalRes, outputPath, resolve, reject));
      } else {
        handleDownload(res, outputPath, resolve, reject);
      }
    }).on('error', reject);
  });
}

function handleDownload(res, outputPath, resolve, reject) {
  if (res.statusCode !== 200) {
    reject(new Error(`HTTP ${res.statusCode}`));
    return;
  }
  
  const chunks = [];
  res.on('data', chunk => chunks.push(chunk));
  res.on('end', async () => {
    try {
      const buffer = Buffer.concat(chunks);
      const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50;
      
      if (!isJpeg && !isPng) {
        reject(new Error('Not valid image'));
        return;
      }
      
      if (buffer.length < 10000) {
        reject(new Error('Too small'));
        return;
      }
      
      await fs.writeFile(outputPath, buffer);
      resolve({ size: buffer.length, type: isJpeg ? 'JPEG' : 'PNG' });
    } catch (e) {
      reject(e);
    }
  });
}

async function scrapeCommons() {
  console.log('🎭 Iniciando Playwright para Wikimedia Commons...\n');
  
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  let success = 0;
  let failed = 0;
  
  for (const item of SEARCHES) {
    console.log(`🔍 ${item.name}: "${item.query}"`);
    
    const page = await context.newPage();
    
    try {
      // Ir a Commons y buscar
      const searchUrl = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(item.query)}&title=Special:MediaSearch&go=Go&type=image`;
      await page.goto(searchUrl, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Esperar a que carguen los resultados
      await page.waitForSelector('.sd-image-result, .results-info, .search-no-results', { timeout: 10000 });
      
      // Verificar si hay resultados
      const noResults = await page.locator('.search-no-results').count();
      if (noResults > 0) {
        console.log('  ✗ Sin resultados');
        failed++;
        await page.close();
        continue;
      }
      
      // Extraer URLs de las primeras imágenes
      const imageUrls = await page.evaluate(() => {
        const results = [];
        const images = document.querySelectorAll('.sd-image-result img, .gallerybox img, .thumb img');
        
        images.forEach(img => {
          const src = img.src;
          if (src && (src.includes('upload.wikimedia.org') || src.includes('wikipedia/commons'))) {
            // Convertir thumbnail a imagen original si es posible
            const fullUrl = src.replace(/\/thumb\//, '/').replace(/\/\d+px-[^\/]+$/, '');
            results.push(fullUrl);
          }
        });
        
        return [...new Set(results)].slice(0, 3); // Primeras 3 únicas
      });
      
      console.log(`  Encontradas ${imageUrls.length} imágenes`);
      
      if (imageUrls.length === 0) {
        console.log('  ✗ No se extrajeron URLs');
        failed++;
        await page.close();
        continue;
      }
      
      // Intentar descargar la primera válida
      let downloaded = false;
      for (const url of imageUrls) {
        const outputPath = path.join(OUTPUT_DIR, `${item.name}.jpg`);
        
        try {
          await downloadImage(url, outputPath);
          console.log(`  ✓ Descargada: ${url.substring(0, 50)}...`);
          success++;
          downloaded = true;
          break;
        } catch (e) {
          console.log(`  ✗ Falló ${url.substring(0, 40)}: ${e.message}`);
        }
      }
      
      if (!downloaded) {
        console.log('  ✗ Ninguna imagen descargable');
        failed++;
      }
      
    } catch (e) {
      console.log(`  ✗ Error: ${e.message}`);
      failed++;
    }
    
    await page.close();
    
    // Pequeña pausa entre búsquedas
    await new Promise(r => setTimeout(r, 2000));
  }
  
  await browser.close();
  
  console.log(`\n✅ ${success} imágenes descargadas`);
  console.log(`❌ ${failed} fallidas`);
  console.log(`📁 Guardadas en: ${OUTPUT_DIR}`);
}

scrapeCommons().catch(console.error);

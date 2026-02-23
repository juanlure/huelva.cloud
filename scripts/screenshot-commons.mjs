#!/usr/bin/env node
/**
 * Screenshot de búsquedas en Wikimedia Commons
 * Genera capturas para que puedas elegir las mejores imágenes manualmente
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = '.qa/commons-screenshots';

const SEARCHES = [
  { name: 'huelva-puerto', query: 'Puerto de Huelva' },
  { name: 'huelva-gran-teatro', query: 'Gran Teatro Huelva' },
  { name: 'fiesta-tradicional', query: 'Romería Huelva' },
  { name: 'sierra-aracena', query: 'Sierra de Aracena' },
  { name: 'ermita-rocio', query: 'Ermita del Rocío' },
  { name: 'muelle-tinto', query: 'Muelle del Tinto' },
  { name: 'ayamonte-guadiana', query: 'Ayamonte' }
];

async function takeScreenshots() {
  console.log('📸 Capturando búsquedas de Wikimedia Commons...\n');
  
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  for (const search of SEARCHES) {
    console.log(`📷 ${search.name}: ${search.query}`);
    const page = await context.newPage();
    
    try {
      // Search on Wikimedia Commons
      const searchUrl = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(search.query)}&title=Special:MediaSearch&type=image`;
      await page.goto(searchUrl, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for results and take screenshot
      await page.waitForSelector('.sd-image-results__image, .results-info', { timeout: 10000 });
      await page.waitForTimeout(2000); // Let images load
      
      const screenshotPath = path.join(OUTPUT_DIR, `${search.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  ✓ Guardado: ${screenshotPath}`);
      
      // Also try to get the first image URL
      const firstImage = await page.evaluate(() => {
        const img = document.querySelector('.sd-image-results__image img');
        if (img) {
          let src = img.src;
          // Convert to full size
          if (src.includes('/thumb/')) {
            src = src.replace(/\/thumb\//, '/').replace(/\/[^\/]+$/, '');
          }
          return src;
        }
        return null;
      });
      
      if (firstImage) {
        console.log(`  🔗 URL: ${firstImage}`);
      }
      
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      // Take error screenshot anyway
      const screenshotPath = path.join(OUTPUT_DIR, `${search.name}-error.png`);
      await page.screenshot({ path: screenshotPath });
    }
    
    await page.close();
  }
  
  await browser.close();
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Screenshots guardados en:', OUTPUT_DIR);
  console.log('Revisa las imágenes y elige las mejores para descargar.');
  console.log('='.repeat(60));
}

takeScreenshots().catch(console.error);

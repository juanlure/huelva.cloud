#!/usr/bin/env node
/**
 * Descarga automática desde Wikimedia Commons vía API
 * Busca imágenes por categoría y descarga las primeras válidas
 */

import https from 'https';
import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = 'public/images/guides';

// Categorías en Commons a buscar
const CATEGORIES = [
  { name: 'huelva-plaza', category: 'Plaza_de_las_Monjas_(Huelva)', alt: 'Category:Huelva' },
  { name: 'huelva-puerto', category: 'Port_of_Huelva', alt: 'Puerto_de_Huelva' },
  { name: 'huelva-muelle', category: 'Muelle_del_Tinto', alt: 'Category:Muelle_de_la_Compañía_Riotinto' },
  { name: 'huelva-playa', category: 'Beaches_of_Huelva', alt: 'Playas_de_Huelva' },
  { name: 'choco-frito', category: 'Choco_frito', alt: 'Sepia_a_la_romana' },
  { name: 'gamba-blanca', category: 'Palaemon_serratus', alt: 'Gamba_blanca' }
];

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

async function apiRequest(params) {
  const query = new URLSearchParams({
    ...params,
    format: 'json',
    origin: '*'
  });
  
  return new Promise((resolve, reject) => {
    https.get(`${COMMONS_API}?${query}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } 
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function getImagesFromCategory(category, limit = 5) {
  try {
    const data = await apiRequest({
      action: 'query',
      list: 'categorymembers',
      cmtitle: `Category:${category}`,
      cmtype: 'file',
      cmlimit: limit
    });
    
    return data.query?.categorymembers?.map(m => m.title.replace('File:', '')) || [];
  } catch (e) {
    return [];
  }
}

async function getImageUrl(filename) {
  try {
    const data = await apiRequest({
      action: 'query',
      titles: `File:${filename}`,
      prop: 'imageinfo',
      iiprop: 'url|size'
    });
    
    const pages = data.query?.pages;
    const page = pages ? Object.values(pages)[0] : null;
    return page?.imageinfo?.[0]?.url || null;
  } catch (e) {
    return null;
  }
}

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (finalRes) => {
          handleDownload(finalRes, outputPath, resolve, reject);
        }).on('error', reject);
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
      
      // Validate JPEG/PNG
      const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50;
      
      if (!isJpeg && !isPng) {
        reject(new Error('Not valid image'));
        return;
      }
      
      if (buffer.length < 10000) {
        reject(new Error('Too small (< 10KB)'));
        return;
      }
      
      await fs.writeFile(outputPath, buffer);
      resolve({ size: buffer.length, type: isJpeg ? 'JPEG' : 'PNG' });
    } catch (e) {
      reject(e);
    }
  });
}

async function main() {
  console.log('🖼️  Descarga automática Wikimedia Commons\n');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  let success = 0;
  let failed = 0;
  
  for (const item of CATEGORIES) {
    console.log(`🔍 ${item.name}...`);
    
    // Try main category
    let images = await getImagesFromCategory(item.category, 3);
    
    // Try alt if empty
    if (images.length === 0 && item.alt) {
      images = await getImagesFromCategory(item.alt, 3);
    }
    
    if (images.length === 0) {
      console.log(`  ✗ No images found in category`);
      failed++;
      continue;
    }
    
    // Try to download first valid image
    let downloaded = false;
    for (const img of images) {
      const url = await getImageUrl(img);
      if (!url) continue;
      
      const outputPath = path.join(OUTPUT_DIR, `${item.name}.jpg`);
      
      try {
        const result = await downloadImage(url, outputPath);
        console.log(`  ✓ ${img.substring(0, 40)}... (${(result.size/1024).toFixed(1)}KB)`);
        success++;
        downloaded = true;
        break;
      } catch (e) {
        console.log(`  ✗ ${img}: ${e.message}`);
      }
    }
    
    if (!downloaded) {
      console.log(`  ✗ Could not download any image`);
      failed++;
    }
  }
  
  console.log(`\n✅ ${success} descargadas, ❌ ${failed} fallidas`);
  console.log(`📁 Guardadas en: ${OUTPUT_DIR}`);
}

main().catch(console.error);

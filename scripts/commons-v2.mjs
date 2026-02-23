#!/usr/bin/env node
/**
 * Versión 2: nombres de categoría más probables
 */

import https from 'https';
import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = 'public/images/guides';

const ATTEMPTS = [
  { name: 'huelva-plaza', categories: ['Huelva', 'Plaza_de_las_Monjas', 'Category:Huelva'] },
  { name: 'huelva-puerto', categories: ['Port_of_Huelva', 'Puerto_de_Huelva', 'Port_of_Huelva', 'Huelva'] },
  { name: 'huelva-muelle', categories: ['Muelle_del_Tinto', 'Puerto_de_Huelva', 'Huelva'] },
  { name: 'huelva-ciudad', categories: ['Huelva', 'Category:Huelva'] },
  { name: 'choco-frito', categories: ['Choco_frito', 'Sepia_a_la_romana'] }
];

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

async function apiRequest(params) {
  const query = new URLSearchParams({ format: 'json', origin: '*', ...params });
  return new Promise((resolve, reject) => {
    https.get(`${COMMONS_API}?${query}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function searchFiles(search, limit = 10) {
  // Use search API instead of category
  try {
    const data = await apiRequest({
      action: 'query',
      list: 'search',
      srsearch: `${search} filetype:bitmap`,
      srnamespace: 6, // File namespace
      srlimit: limit
    });
    return data.query?.search?.map(s => s.title.replace('File:', '')) || [];
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
      iiprop: 'url'
    });
    const pages = data.query?.pages;
    return pages ? Object.values(pages)[0]?.imageinfo?.[0]?.url : null;
  } catch (e) {
    return null;
  }
}

async function download(url, path) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (final) => downloadToBuffer(final, path, resolve, reject));
      } else {
        downloadToBuffer(res, path, resolve, reject);
      }
    }).on('error', reject);
  });
}

function downloadToBuffer(res, outputPath, resolve, reject) {
  if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
  const chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', async () => {
    const buf = Buffer.concat(chunks);
    const isJpg = buf[0] === 0xFF && buf[1] === 0xD8;
    const isPng = buf[0] === 0x89 && buf[1] === 0x50;
    if (!isJpg && !isPng) { reject(new Error('Invalid')); return; }
    await fs.writeFile(outputPath, buf);
    resolve({ size: buf.length });
  });
}

async function main() {
  console.log('🔍 Buscando imágenes en Commons...\n');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  let ok = 0, fail = 0;
  
  for (const item of ATTEMPTS) {
    console.log(`📷 ${item.name}:`);
    let found = false;
    
    for (const search of item.categories) {
      const files = await searchFiles(search, 5);
      
      for (const file of files.slice(0, 3)) {
        const url = await getImageUrl(file);
        if (!url) continue;
        
        try {
          const out = path.join(OUTPUT_DIR, `${item.name}.jpg`);
          const r = await download(url, out);
          console.log(`  ✓ ${file.substring(0, 35)} (${(r.size/1024).toFixed(0)}KB)`);
          ok++; found = true; break;
        } catch (e) {
          console.log(`  ✗ ${file}: ${e.message}`);
        }
      }
      
      if (found) break;
    }
    
    if (!found) { console.log(`  ✗ No encontrado`); fail++; }
  }
  
  console.log(`\n✅ ${ok} OK, ❌ ${fail} fallidas`);
}

main();

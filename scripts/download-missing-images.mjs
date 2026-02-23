#!/usr/bin/env node
/**
 * Descargador de imágenes específicas para Huelva.is
 * Basado en nombres de archivo probables de Wikimedia Commons
 */

import fs from 'fs/promises';
import https from 'https';
import path from 'path';

const OUTPUT_DIR = 'public/images/guides';

// Lista de imágenes a descargar con posibles nombres en Commons
const IMAGES_TO_DOWNLOAD = [
  {
    filename: 'huelva-puerto.jpg',
    // Puerto de Huelva
    possibleNames: [
      'Puerto_de_Huelva.jpg',
      'Puerto_de_Huelva_01.jpg',
      'Port_of_Huelva.jpg',
      'Puerto_comercial_de_Huelva.jpg'
    ]
  },
  {
    filename: 'huelva-gran-teatro.jpg',
    // Gran Teatro de Huelva
    possibleNames: [
      'Gran_Teatro_de_Huelva.jpg',
      'Teatro_Grande_de_Huelva.jpg',
      'Gran_Teatro_Huelva.jpg',
      'Huelva_-_Gran_Teatro.jpg'
    ]
  },
  {
    filename: 'fiesta-tradicional-huelva.jpg',
    // Fiesta tradicional / Romería / Evento
    possibleNames: [
      'Romeria_de_Huelva.jpg',
      'Fiesta_tradicional_Huelva.jpg',
      'Colombinas_Huelva.jpg',
      'Huelva_-_Festival.jpg'
    ]
  },
  {
    filename: 'sierra-aracena.jpg',
    // Sierra de Aracena
    possibleNames: [
      'Sierra_de_Aracena.jpg',
      'Sierra_de_Aracena_y_Picos_de_Aroche.jpg',
      'Aracena_sierra.jpg',
      'Parque_natural_Sierra_de_Aracena.jpg'
    ]
  },
  {
    filename: 'ermita-rocio.jpg',
    // Ermita del Rocío
    possibleNames: [
      'Ermita_del_Rocio.jpg',
      'Ermita_de_El_Rocio.jpg',
      'Santuario_de_la_Virgen_del_Rocio.jpg',
      'El_Rocio_ermita.jpg',
      'Aldea_del_Rocio.jpg'
    ]
  },
  {
    filename: 'muelle-tinto.jpg',
    // Muelle del Tinto
    possibleNames: [
      'Muelle_del_Tinto.jpg',
      'Muelle_del_Tinto_Huelva.jpg',
      'Muelle_Tinto.jpg',
      'Muelle_de_Riotinto.jpg',
      'Muelle_de_la_Cia_Riotinto.jpg'
    ]
  },
  {
    filename: 'ayamonte-guadiana.jpg',
    // Ayamonte y Guadiana
    possibleNames: [
      'Ayamonte.jpg',
      'Puente_internacional_del_Guadiana.jpg',
      'Guadiana_Ayamonte.jpg',
      'Rio_Guadiana_Ayamonte.jpg',
      'Ayamonte_Huelva.jpg'
    ]
  }
];

const BASE_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath';

async function downloadImage(filename, commonsName) {
  const outputPath = path.join(OUTPUT_DIR, filename);
  const url = `${BASE_URL}/${commonsName}`;
  
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Huelva.is/1.0)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 30000
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const newUrl = res.headers.location;
        https.get(newUrl, options, (finalRes) => {
          handleResponse(finalRes, outputPath, filename, resolve, reject);
        }).on('error', reject);
        return;
      }
      
      handleResponse(res, outputPath, filename, resolve, reject);
    }).on('error', reject).on('timeout', () => {
      reject(new Error('Timeout'));
    });
  });
}

function handleResponse(res, outputPath, filename, resolve, reject) {
  if (res.statusCode !== 200) {
    reject(new Error(`HTTP ${res.statusCode}`));
    return;
  }

  const chunks = [];
  res.on('data', chunk => chunks.push(chunk));
  res.on('end', async () => {
    try {
      const buffer = Buffer.concat(chunks);
      
      // Validar que es imagen (JPEG/PNG magic bytes)
      const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50;
      
      if (!isJpeg && !isPng) {
        const start = buffer.slice(0, 100).toString().toLowerCase();
        if (start.includes('<!doctype') || start.includes('<html')) {
          reject(new Error('Received HTML instead of image'));
          return;
        }
        reject(new Error(`Unknown file format`));
        return;
      }

      if (buffer.length < 1024) {
        reject(new Error(`File too small (${buffer.length} bytes)`));
        return;
      }

      await fs.writeFile(outputPath, buffer);
      resolve({ 
        success: true, 
        filename, 
        size: buffer.length,
        type: isJpeg ? 'JPEG' : 'PNG'
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function ensureDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function main() {
  console.log('🖼️  Descargando imágenes específicas para Huelva.is\n');
  await ensureDir();

  let success = 0;
  let failed = 0;

  for (const img of IMAGES_TO_DOWNLOAD) {
    process.stdout.write(`📥 ${img.filename}... `);
    
    let downloaded = false;
    for (const name of img.possibleNames) {
      try {
        const result = await downloadImage(img.filename, name);
        console.log(`✓ ${(result.size/1024).toFixed(1)}KB ${result.type} (${name})`);
        success++;
        downloaded = true;
        break;
      } catch (e) {
        continue;
      }
    }
    
    if (!downloaded) {
      console.log(`✗ No encontrado en Commons`);
      failed++;
      console.log(`  Intenta buscar manualmente en: https://commons.wikimedia.org/wiki/Special:Search?search=${encodeURIComponent(img.possibleNames[0].replace(/_/g, ' '))}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Success: ${success}/${IMAGES_TO_DOWNLOAD.length}`);
  console.log(`❌ Failed: ${failed}/${IMAGES_TO_DOWNLOAD.length}`);
  
  if (failed > 0) {
    console.log('\n⚠️  Para las imágenes fallidas:');
    console.log('1. Busca manualmente en https://commons.wikimedia.org');
    console.log('2. Encuentra el nombre exacto del archivo');
    console.log('3. Descarga con: curl -L -o public/images/guides/NOMBRE.jpg https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_EXACTO.jpg');
  }
}

main().catch(console.error);

#!/usr/bin/env node
/**
 * Robust Image Downloader - Fallback version
 * Uses direct Wikimedia Commons Special:FilePath with validation
 */

import fs from 'fs/promises';
import https from 'https';
import path from 'path';

const OUTPUT_DIR = 'public/images/guides';
const USER_AGENT = 'Mozilla/5.0 (compatible; Huelva.is/1.0)';
const BASE_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath';

// Images that MUST exist with verified Commons filenames
const CORE_IMAGES = [
  {
    filename: 'huelva-plaza-las-monjas.jpg',
    commonsName: 'Huelva_-_Plaza_de_las_Monjas.jpg',
    altNames: ['Plaza_de_las_Monjas_Huelva.jpg']
  },
  {
    filename: 'huelva-estacion-sevilla.jpg',
    commonsName: 'Huelva_-_Estaci%C3%B3n_de_Sevilla_01.jpg',
    altNames: ['Estaci%C3%B3n_de_Sevilla_Huelva.jpg']
  },
  {
    filename: 'gambas-blancas-huelva.jpg',
    commonsName: 'Gambas_blancas_de_Huelva.jpg',
    altNames: []
  },
  {
    filename: 'choquitos-fritos.jpg',
    commonsName: 'Choquitos_fritos.jpg',
    altNames: []
  },
  {
    filename: 'muelle-tinto-huelva.jpg',
    commonsName: 'Muelle_del_Tinto,_Huelva,_Espa%C3%B1a,_2015-12-09,_DD_26.JPG',
    altNames: ['Muelle_de_Riotinto_Huelva.jpg']
  },
  {
    filename: 'barrio-reina-victoria.jpg',
    commonsName: 'Barrio_Reina_Victoria_Huelva.jpg',
    altNames: ['Barrio_Obrero_Reina_Victoria_Huelva.jpg']
  },
  {
    filename: 'choco-frito-tapa.jpg',
    commonsName: 'Choco_frito.jpg',
    altNames: ['Choco_frito_Huelva.jpg']
  },
  {
    filename: 'coquinas-huelva.jpg',
    commonsName: 'Coquinas.jpg',
    altNames: ['Coquinas_al_pil_pil_Huelva.jpg']
  },
  {
    filename: 'cafe-vaso-huelva.jpg',
    commonsName: 'A_small_cup_of_coffee.JPG',
    altNames: ['Caf%C3%A9_Huelva.jpg']
  },
  {
    filename: 'corte-jamon-iberico.jpg',
    commonsName: 'Corte_de_jam%C3%B3n_ib%C3%A9rico.jpg',
    altNames: ['Corte_de_jamon_iberico_Huelva.jpg']
  },
  {
    filename: 'jamon-iberico-bellota.jpg',
    commonsName: 'Jam%C3%B3n_ib%C3%A9rico_de_bellota_100%25_(2015241812814).jpg',
    altNames: []
  },
  {
    filename: 'jamones-secadero.jpg',
    commonsName: 'Jamones_en_secadero.jpg',
    altNames: ['Secadero_de_jamones_Huelva.jpg']
  },
  {
    filename: 'ayuntamiento-huelva.jpg',
    commonsName: 'Ayuntamiento_de_Huelva.jpg',
    altNames: []
  },
  {
    filename: 'barrio-reina-victoria-hero.jpg',
    commonsName: 'Barrio_Obrero_Reina_Victoria_Huelva.jpg',
    altNames: []
  },
  {
    filename: 'muelle-tinto-riotinto.jpg',
    commonsName: 'Muelle_de_mineral_de_la_compa%C3%B1%C3%ADa_Riotinto%2C_Huelva%2C_Espa%C3%B1a%2C_2015-12-08%2C_DD_26.JPG',
    altNames: []
  },
  {
    filename: 'iglesia-rocio-huelva.jpg',
    commonsName: 'Iglesia_del_Roc%C3%ADo_(Huelva)_02.jpg',
    altNames: ['Iglesia_del_Rocio_Huelva.jpg']
  },
  {
    filename: 'santuario-cinta-huelva.jpg',
    commonsName: 'Santuario_de_La_Cinta_(Huelva).jpg',
    altNames: []
  },
  {
    filename: 'monumento-colon-monjas.jpg',
    commonsName: 'Monumento_Cristobal_Col%C3%B3n_Plaza_Monjas_Huelva.jpg',
    altNames: []
  },
  {
    filename: 'muelle-tinto-sunset.jpg',
    commonsName: 'Muelle-del-Tinto.jpg',
    altNames: ['Muelle_Tinto_atardecer_Huelva.jpg']
  },
  {
    filename: 'marismas-odiel.jpg',
    commonsName: 'Marismas_del_Odiel.jpg',
    altNames: ['Parque_Natural_Marismas_del_Odiel.jpg']
  },
  {
    filename: 'jamon-jabugo-fino.png',
    commonsName: 'Jam%C3%B3n_de_Jabugo_y_Fino_Quinta.png',
    altNames: []
  },
  {
    filename: 'playa-punta-umbria.jpg',
    commonsName: 'Playa_de_Punta_Umbria_(Huelva).jpg',
    altNames: []
  },
  {
    filename: 'calle-huelva-centro.jpg',
    commonsName: 'Calle_Concepci%C3%B3n_(Huelva).jpg',
    altNames: ['Calle_Concepcion_Huelva.jpg']
  },
  {
    filename: 'choco-frito-hero.jpg',
    commonsName: 'Choco_frito.jpg',
    altNames: []
  }
];

async function downloadImage(filename, commonsName) {
  const outputPath = path.join(OUTPUT_DIR, filename);
  const url = `${BASE_URL}/${commonsName}`;
  
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 30000
    };

    https.get(url, options, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        const newUrl = res.headers.location;
        console.log(`  ↳ Redirect to: ${newUrl.substring(0, 60)}...`);
        
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
      
      // Validate it's an image (JPEG/PNG magic bytes)
      const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50;
      
      if (!isJpeg && !isPng) {
        // Check if it's HTML (common error)
        const start = buffer.slice(0, 100).toString().toLowerCase();
        if (start.includes('<!doctype') || start.includes('<html')) {
          reject(new Error('Received HTML instead of image'));
          return;
        }
        reject(new Error(`Unknown file format (first bytes: ${buffer.slice(0,4).toString('hex')})`));
        return;
      }

      // Check minimum size (1KB)
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
  console.log('🖼️  Robust Image Downloader for Huelva.is\n');
  await ensureDir();

  let success = 0;
  let failed = 0;
  const errors = [];

  for (const img of CORE_IMAGES) {
    process.stdout.write(`📥 ${img.filename}... `);
    
    try {
      // Try main name
      const result = await downloadImage(img.filename, img.commonsName);
      console.log(`✓ ${(result.size/1024).toFixed(1)}KB ${result.type}`);
      success++;
    } catch (e) {
      // Try alt names
      let altSuccess = false;
      for (const altName of img.altNames) {
        try {
          process.stdout.write(`  ↳ Trying alt: ${altName}... `);
          const result = await downloadImage(img.filename, altName);
          console.log(`✓ ${(result.size/1024).toFixed(1)}KB ${result.type}`);
          success++;
          altSuccess = true;
          break;
        } catch (altError) {
          console.log(`✗ ${altError.message}`);
        }
      }
      
      if (!altSuccess) {
        console.log(`✗ ${e.message}`);
        failed++;
        errors.push({ filename: img.filename, error: e.message });
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Success: ${success}/${CORE_IMAGES.length}`);
  console.log(`❌ Failed: ${failed}/${CORE_IMAGES.length}`);
  
  if (errors.length > 0) {
    console.log('\n⚠️  Failed downloads:');
    errors.forEach(e => console.log(`  - ${e.filename}: ${e.error}`));
  }
}

main().catch(console.error);

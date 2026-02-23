#!/usr/bin/env node
/**
 * Descarga directa desde Wikimedia Commons usando la API
 * Intenta nombres de archivo comunes y verifica si existen
 */

import https from 'https';
import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = 'public/images/guides';

// Lista de imágenes con múltiples intentos de nombres de archivo
const IMAGES = [
  {
    output: 'huelva-puerto.jpg',
    attempts: [
      'Puerto_de_Huelva.jpg',
      'Huelva_puerto.jpg',
      'Port_of_Huelva.jpg',
      'Puerto_comercial_de_Huelva.jpg',
      'Huelva_-_Puerto.jpg'
    ]
  },
  {
    output: 'huelva-gran-teatro.jpg',
    attempts: [
      'Gran_Teatro_de_Huelva.jpg',
      'Gran_Teatro_Huelva.jpg',
      'Huelva_-_Gran_Teatro.jpg',
      'Teatro_Grande_Huelva.jpg'
    ]
  },
  {
    output: 'fiesta-tradicional-huelva.jpg',
    attempts: [
      'Romeria_de_Huelva.jpg',
      'Colombinas_Huelva.jpg',
      'Fiestas_de_Huelva.jpg',
      'Festival_Huelva.jpg',
      'Huelva_-_Fiestas.jpg'
    ]
  },
  {
    output: 'sierra-aracena.jpg',
    attempts: [
      'Sierra_de_Aracena.jpg',
      'Sierra_Aracena.jpg',
      'Parque_natural_Sierra_de_Aracena.jpg',
      'Aracena_-_Sierra.jpg',
      'Aracena_paisaje.jpg'
    ]
  },
  {
    output: 'ermita-rocio.jpg',
    attempts: [
      'Ermita_del_Rocio.jpg',
      'Ermita_de_El_Rocio.jpg',
      'Santuario_de_la_Virgen_del_Rocio.jpg',
      'El_Rocio_-_Ermita.jpg',
      'Aldea_del_Rocio.jpg',
      'Virgen_del_Rocio.jpg'
    ]
  },
  {
    output: 'muelle-tinto.jpg',
    attempts: [
      'Muelle_del_Tinto.jpg',
      'Muelle_Tinto.jpg',
      'Muelle_de_Riotinto.jpg',
      'Muelle_Tinto_Huelva.jpg',
      'Huelva_-_Muelle_del_Tinto.jpg',
      'Muelle_de_la_Compania_Riotinto.jpg'
    ]
  },
  {
    output: 'ayamonte-guadiana.jpg',
    attempts: [
      'Ayamonte.jpg',
      'Ayamonte_Huelva.jpg',
      'Puente_internacional_del_Guadiana.jpg',
      'Guadiana_Ayamonte.jpg',
      'Rio_Guadiana.jpg',
      'Huelva_-_Ayamonte.jpg'
    ]
  }
];

function checkFileExists(filename) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}`;
    https.get(url, { 
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (Huelva.is Bot)' }
    }, (res) => {
      if (res.statusCode === 200) {
        resolve({ exists: true, url, size: res.headers['content-length'] });
      } else {
        resolve({ exists: false });
      }
    }).on('error', () => resolve({ exists: false }));
  });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Huelva.is Bot)' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        https.get(res.headers.location, { 
          headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (finalRes) => {
          if (finalRes.statusCode !== 200) {
            reject(new Error(`HTTP ${finalRes.statusCode}`));
            return;
          }
          
          const chunks = [];
          finalRes.on('data', chunk => chunks.push(chunk));
          finalRes.on('end', async () => {
            const buffer = Buffer.concat(chunks);
            
            // Validate JPEG
            if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) {
              reject(new Error('Not a valid JPEG'));
              return;
            }
            
            await fs.writeFile(outputPath, buffer);
            resolve({ size: buffer.length });
          });
        }).on('error', reject);
      } else if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', async () => {
          const buffer = Buffer.concat(chunks);
          
          if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) {
            reject(new Error('Not a valid JPEG'));
            return;
          }
          
          await fs.writeFile(outputPath, buffer);
          resolve({ size: buffer.length });
        });
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔍 Verificando existencia de imágenes en Wikimedia Commons...\n');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const results = [];
  
  for (const img of IMAGES) {
    process.stdout.write(`📷 ${img.output}: `);
    
    let found = false;
    for (const attempt of img.attempts) {
      const check = await checkFileExists(attempt);
      if (check.exists) {
        console.log(`✓ Encontrado: ${attempt}`);
        
        try {
          const outputPath = path.join(OUTPUT_DIR, img.output);
          const download = await downloadFile(check.url, outputPath);
          console.log(`  ↓ Descargado: ${(download.size/1024).toFixed(1)}KB`);
          results.push({ output: img.output, status: 'success', filename: attempt, size: download.size });
          found = true;
          break;
        } catch (e) {
          console.log(`  ✗ Error descargando: ${e.message}`);
        }
      }
    }
    
    if (!found) {
      console.log(`✗ No encontrado`);
      results.push({ output: img.output, status: 'not_found', attempted: img.attempts });
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Resumen:');
  const success = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'not_found').length;
  console.log(`✅ Descargadas: ${success}/${IMAGES.length}`);
  console.log(`❌ No encontradas: ${failed}/${IMAGES.length}`);
  console.log('='.repeat(60));
  
  // Save results
  await fs.writeFile(
    path.join(OUTPUT_DIR, '../download-results.json'),
    JSON.stringify(results, null, 2)
  );
  
  if (failed > 0) {
    console.log('\n⚠️  Imágenes no encontradas. Busca manualmente en:');
    console.log('https://commons.wikimedia.org');
    console.log('\nO usa el comando:');
    console.log('curl -L -o public/images/guides/NOMBRE.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_ARCHIVO.jpg"');
  }
}

main().catch(console.error);

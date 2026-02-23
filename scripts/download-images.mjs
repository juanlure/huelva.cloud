#!/usr/bin/env node
/**
 * Wikimedia Commons Image Downloader for Huelva.is
 * 
 * Features:
 * - Searches Wikimedia Commons via API
 * - Validates downloaded files are actual images
 * - Organizes by category
 * - Fallback system for missing images
 * - Deduplication
 */

import fs from 'fs/promises';
import path from 'path';
import https from 'https';
import { fileTypeFromBuffer } from 'file-type';

const OUTPUT_DIR = 'public/images/guides';
const USER_AGENT = 'Huelva.is Bot (contact@huelva.is)';

// Wikimedia Commons API endpoint
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

// Categories and search terms for Huelva
const IMAGE_CATEGORIES = {
  'gastronomia': {
    terms: ['gambas huelva', 'choco frito huelva', 'coquinas huelva', 'jamon iberico huelva', 'tapas huelva'],
    minWidth: 800,
    fallback: '/images/guides/coquinas-huelva.jpg'
  },
  'monumentos': {
    terms: ['plaza monjas huelva', 'ayuntamiento huelva', 'catedral huelva', 'monumento colon huelva'],
    minWidth: 1200,
    fallback: '/images/guides/huelva-plaza-las-monjas.jpg'
  },
  'muelle-tinto': {
    terms: ['muelle tinto huelva', 'muelle mineral huelva', 'puerto huelva'],
    minWidth: 1200,
    fallback: '/images/guides/huelva-plaza-las-monjas.jpg'
  },
  'naturaleza': {
    terms: ['marismas odiel', 'parque moret huelva', 'playa punta umbria'],
    minWidth: 1200,
    fallback: '/images/guides/huelva-plaza-las-monjas.jpg'
  },
  'barrios': {
    terms: ['barrio reina victoria huelva', 'barrio obrero huelva'],
    minWidth: 800,
    fallback: '/images/guides/huelva-plaza-las-monjas.jpg'
  },
  'eventos': {
    terms: ['festival cine huelva', 'colombinas huelva', 'carnaval huelva'],
    minWidth: 800,
    fallback: '/images/guides/huelva-plaza-las-monjas.jpg'
  }
};

// Specific must-have images with exact filenames
const REQUIRED_IMAGES = {
  'huelva-plaza-las-monjas.jpg': 'Plaza de las Monjas Huelva',
  'coquinas-huelva.jpg': 'Coquinas al pil pil Huelva',
  'choco-frito-tapa.jpg': 'Choco frito tapa Huelva',
  'cafe-vaso-huelva.jpg': 'Café vaso Huelva',
  'corte-jamon-iberico.jpg': 'Corte jamón ibérico',
  'choco-frito-hero.jpg': 'Choco frito Huelva'
};

class CommonsDownloader {
  constructor() {
    this.downloaded = new Set();
    this.errors = [];
  }

  async ensureDir() {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Search for images on Wikimedia Commons
  async searchImages(query, limit = 10) {
    const params = new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: `${query} filetype:bitmap`,
      srnamespace: 6, // File namespace
      format: 'json',
      origin: '*',
      srlimit: limit
    });

    const url = `${COMMONS_API}?${params.toString()}`;
    
    return new Promise((resolve, reject) => {
      https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json.query?.search || []);
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }

  // Get file info including direct URL
  async getFileInfo(filename) {
    const params = new URLSearchParams({
      action: 'query',
      titles: `File:${filename}`,
      prop: 'imageinfo',
      iiprop: 'url|size|mime',
      format: 'json',
      origin: '*'
    });

    const url = `${COMMONS_API}?${params.toString()}`;
    
    return new Promise((resolve, reject) => {
      https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const pages = json.query?.pages;
            const page = pages ? Object.values(pages)[0] : null;
            resolve(page?.imageinfo?.[0] || null);
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }

  // Download file with validation
  async downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      
      https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        res.on('data', chunk => chunks.push(chunk));
        res.on('end', async () => {
          try {
            const buffer = Buffer.concat(chunks);
            
            // Validate it's an image
            const fileType = await fileTypeFromBuffer(buffer);
            if (!fileType || !['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(fileType.mime)) {
              reject(new Error(`Invalid file type: ${fileType?.mime || 'unknown'}`));
              return;
            }

            // Check minimum dimensions if possible
            // (would need sharp or similar, skipping for now)

            await fs.writeFile(outputPath, buffer);
            resolve({ path: outputPath, size: buffer.length, mime: fileType.mime });
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }

  // Download a specific required image
  async downloadRequiredImage(filename, searchTerm) {
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    // Skip if already exists and is valid
    try {
      const existing = await fs.readFile(outputPath);
      const ft = await fileTypeFromBuffer(existing);
      if (ft && ft.mime.startsWith('image/')) {
        console.log(`✓ ${filename} already exists and is valid`);
        return { skipped: true, filename };
      }
    } catch {
      // File doesn't exist or is invalid, continue
    }

    try {
      // Search for the image
      const results = await this.searchImages(searchTerm, 5);
      
      for (const result of results) {
        const filenameFromResult = result.title.replace('File:', '');
        const info = await this.getFileInfo(filenameFromResult);
        
        if (!info?.url) continue;

        try {
          const downloaded = await this.downloadFile(info.url, outputPath);
          console.log(`✓ Downloaded ${filename} (${(downloaded.size/1024).toFixed(1)}KB)`);
          return { success: true, filename, ...downloaded };
        } catch (e) {
          console.log(`  ✗ Failed ${filenameFromResult}: ${e.message}`);
          continue;
        }
      }
      
      throw new Error('No valid images found in search results');
    } catch (e) {
      this.errors.push({ filename, error: e.message });
      console.log(`✗ Failed to download ${filename}: ${e.message}`);
      return { failed: true, filename, error: e.message };
    }
  }

  // Download category images
  async downloadCategoryImages(category, config) {
    console.log(`\n📁 Category: ${category}`);
    const results = [];

    for (const term of config.terms) {
      const searchResults = await this.searchImages(term, 3);
      
      for (const result of searchResults) {
        const filename = result.title.replace('File:', '').replace(/[^a-zA-Z0-9.-]/g, '_');
        const outputName = `${category}-${filename}`;
        
        if (this.downloaded.has(outputName)) continue;
        
        const outputPath = path.join(OUTPUT_DIR, outputName);
        const info = await this.getFileInfo(result.title.replace('File:', ''));
        
        if (!info?.url) continue;
        if (info.width < config.minWidth) {
          console.log(`  ℹ Skipping ${outputName} (too small: ${info.width}px)`);
          continue;
        }

        try {
          const downloaded = await this.downloadFile(info.url, outputPath);
          this.downloaded.add(outputName);
          console.log(`  ✓ ${outputName} (${info.width}x${info.height})`);
          results.push({ category, filename: outputName, ...downloaded });
          
          // Only get 2 images per category for now
          if (results.filter(r => r.category === category).length >= 2) break;
        } catch (e) {
          console.log(`  ✗ ${outputName}: ${e.message}`);
        }
      }
      
      if (results.filter(r => r.category === category).length >= 2) break;
    }

    return results;
  }

  // Main execution
  async run() {
    console.log('🖼️  Wikimedia Commons Downloader for Huelva.is\n');
    
    await this.ensureDir();

    // Step 1: Download required core images
    console.log('📥 Downloading required core images...');
    for (const [filename, searchTerm] of Object.entries(REQUIRED_IMAGES)) {
      await this.downloadRequiredImage(filename, searchTerm);
    }

    // Step 2: Download category images
    console.log('\n📥 Downloading category images...');
    const categoryResults = [];
    for (const [category, config] of Object.entries(IMAGE_CATEGORIES)) {
      const results = await this.downloadCategoryImages(category, config);
      categoryResults.push(...results);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Summary:');
    console.log(`  Core images: ${Object.keys(REQUIRED_IMAGES).length}`);
    console.log(`  Category images: ${categoryResults.length}`);
    console.log(`  Errors: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n⚠️  Errors:');
      this.errors.forEach(e => console.log(`  - ${e.filename}: ${e.error}`));
    }

    console.log('\n✅ Done!');
  }
}

// Install file-type if needed
async function ensureDependencies() {
  try {
    await import('file-type');
  } catch {
    console.log('Installing dependencies...');
    const { execSync } = await import('child_process');
    execSync('npm install file-type', { cwd: process.cwd(), stdio: 'inherit' });
  }
}

// Run
ensureDependencies().then(() => {
  const downloader = new CommonsDownloader();
  downloader.run().catch(console.error);
});

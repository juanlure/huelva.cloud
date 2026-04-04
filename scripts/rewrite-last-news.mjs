#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const repoRoot = '/home/claw1/.openclaw/workspace/huelva-is';
const newsFile = path.join(repoRoot, 'src/content/external-news.json');
const moduleUrl = pathToFileURL(path.join(repoRoot, 'scripts/scrape-and-rewrite.mjs')).href;
const mod = await import(moduleUrl);

const raw = await fs.readFile(newsFile, 'utf8');
const data = JSON.parse(raw);
const limit = Number(process.argv[2] || 10);
const enforceQuality = process.argv.includes('--quality');
const dropBad = process.argv.includes('--drop-bad');

const updatedNews = [];
let rewritten = 0;
let dropped = 0;

for (let i = 0; i < data.news.length; i++) {
  const item = data.news[i];
  if (i < limit) {
    console.log(`Reescribiendo [${i + 1}/${Math.min(limit, data.news.length)}]: ${item.title}`);
    try {
      const content = await mod.rewriteWithAI(item, { enforceQuality });
      updatedNews.push({ ...item, content });
      rewritten++;
    } catch (error) {
      console.log(`   ❌ ${error.message}`);
      if (dropBad) {
        dropped++;
        continue;
      }
      updatedNews.push(item);
    }
  } else {
    updatedNews.push(item);
  }
}

data.news = updatedNews;
data.count = updatedNews.length;
data.lastUpdated = new Date().toISOString();
await fs.writeFile(newsFile, JSON.stringify(data, null, 2));
console.log(`✅ Reescritas ${rewritten} noticias`);
if (dropBad) console.log(`🗑️ Eliminadas ${dropped} noticias por quality gate`);

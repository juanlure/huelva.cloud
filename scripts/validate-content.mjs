import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const articlesFile = path.join(root, 'src/content/articles.ts');
const publicDir = path.join(root, 'public');

const text = fs.readFileSync(articlesFile, 'utf8');

const articleBlocks = [...text.matchAll(/\{[\s\S]*?slug:\s*'([^']+)'[\s\S]*?image:\s*'([^']*)'[\s\S]*?content:\s*`([\s\S]*?)`[\s\S]*?\}/g)];

const errors = [];

for (const [, slug, imageRaw, content] of articleBlocks) {
  const image = (imageRaw || '').trim();

  if (!image) {
    errors.push(`${slug}: missing image`);
    continue;
  }

  if (/^https?:\/\//i.test(image)) {
    errors.push(`${slug}: remote image not allowed (${image})`);
    continue;
  }

  if (!image.startsWith('/')) {
    errors.push(`${slug}: image must be absolute public path (/images/...)`);
    continue;
  }

  const localPath = path.join(publicDir, image);
  if (!fs.existsSync(localPath)) {
    errors.push(`${slug}: image file not found at public${image}`);
    continue;
  }

  const head = fs.readFileSync(localPath, { encoding: 'utf8', flag: 'r' }).slice(0, 300).toLowerCase();
  if (head.includes('<html') || head.includes('<!doctype html')) {
    errors.push(`${slug}: image file is HTML, not a real image (${image})`);
  }

  // Inline image is recommended. If missing, api.ts injects a safe fallback at render time.
  // We keep this as non-blocking to avoid breaking publish flow.
}


if (errors.length) {
  console.error('\n❌ Content validation failed:\n');
  for (const err of errors) console.error(`- ${err}`);
  console.error('\nFix these before publishing.\n');
  process.exit(1);
}

console.log(`✅ Content validation OK (${articleBlocks.length} artículos)`);

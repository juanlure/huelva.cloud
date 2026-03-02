import fs from 'fs';
import path from 'path';
import https from 'https';
import { searchImage } from '../src/lib/agents/image-researcher';
import externalNewsData from '../src/content/external-news.json';

const ARTICLES_FILE = path.join(process.cwd(), 'src/content/articles.ts');
const NEWS_FILE = path.join(process.cwd(), 'src/content/external-news.json');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/nourished');

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        resolve(false);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', () => {
      fs.unlink(destPath, () => {});
      resolve(false);
    });
  });
}

async function nourishArticles() {
  console.log('--- Nourishing Local Articles ---');
  let content = fs.readFileSync(ARTICLES_FILE, 'utf8');
  
  // We need to find articles where image is null or a placeholder we want to replace
  // For this first pass, let's target specific slugs or those with null
  // But wait, our LOCAL_ARTICLES is a TS file, we can import it to know what's there
  const { LOCAL_ARTICLES } = await import('../src/content/articles');
  
  for (const article of LOCAL_ARTICLES) {
    // If image is null or generic plaza monjas too much
    if (!article.image || article.image.includes('plaza-las-monjas')) {
      console.log(`Nourishing: ${article.title}...`);
      const result = await searchImage(article.title, article.category.toLowerCase());
      
      if (result && result.selected_image.url) {
        const ext = result.selected_image.url.split('.').pop()?.split('?')[0] || 'jpg';
        const filename = `${article.slug}.${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        
        const success = await downloadImage(result.selected_image.url, destPath);
        if (success) {
          const newPath = `/images/nourished/${filename}`;
          console.log(`  ✓ Success: ${newPath}`);
          
          // Replace in string. This is naive but works for simple structures.
          // Look for the slug then the image property
          const escapedSlug = article.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const slugRegex = new RegExp(`slug:\\s*'${escapedSlug}'`, 'g');
          const match = slugRegex.exec(content);
          if (match) {
            const startIndex = match.index;
            // Find the image property after this slug
            const imageRegex = /image:\s*['"][^'"]*['"]|image:\s*null/g;
            imageRegex.lastIndex = startIndex;
            const imageMatch = imageRegex.exec(content);
            if (imageMatch && imageMatch.index < startIndex + 1000) { // Safety bound
              content = content.substring(0, imageMatch.index) + 
                        `image: '${newPath}'` + 
                        content.substring(imageMatch.index + imageMatch[0].length);
            }
          }
        }
      }
    }
  }
  
  fs.writeFileSync(ARTICLES_FILE, content);
}

async function nourishNews() {
  console.log('--- Nourishing External News ---');
  const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
  let updated = false;
  
  for (const item of newsData.news) {
    if (!item.image) {
      console.log(`Nourishing News: ${item.title}...`);
      // Use searchImage for news too
      const result = await searchImage(item.title, 'noticias');
      
      if (result && result.selected_image.url) {
        const slug = Buffer.from(item.url).toString('base64').substring(0, 10);
        const ext = result.selected_image.url.split('.').pop()?.split('?')[0] || 'jpg';
        const filename = `news-${slug}.${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        
        const success = await downloadImage(result.selected_image.url, destPath);
        if (success) {
          (item as any).image = `/images/nourished/${filename}`;
          console.log(`  ✓ Success: ${(item as any).image}`);
          updated = true;
        }
      }
    }
  }
  
  if (updated) {
    newsData.lastUpdated = new Date().toISOString();
    fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2));
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  await nourishArticles();
  await nourishNews();
  console.log('✅ Nourishment complete!');
}

main().catch(console.error);

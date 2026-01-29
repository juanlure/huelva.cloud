
import fs from 'fs';
import path from 'path';

const filesToScan = [
    'src/components/guides/SurvivalGuide.tsx',
    'src/components/guides/ChocoTranslator.tsx',
    'src/components/guides/CoffeeTranslator.tsx',
    'src/components/guides/JamonTranslator.tsx',
    'src/components/guides/NeighborhoodsGuide.tsx',
    'src/components/guides/WeekendItinerary.tsx',
    'src/app/guias/supervivencia/page.tsx',
    'src/app/guias/choco/page.tsx',
    'src/app/guias/cafe/page.tsx',
    'src/app/guias/jamon/page.tsx',
    'src/app/guias/barrios/page.tsx',
    'src/app/guias/48-horas/page.tsx',
    'src/app/guias/page.tsx'
];

const urlRegex = /https?:\/\/[^"'\s)]+/g;

const allUrls = new Set<string>();
const fileMap: Record<string, string[]> = {};

filesToScan.forEach(filePath => {
    try {
        const fullPath = path.resolve(process.cwd(), filePath);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const matches = content.match(urlRegex);
            if (matches) {
                fileMap[filePath] = [];
                matches.forEach(url => {
                    // Clean up the URL if it grabbed trailing characters
                    let cleanUrl = url;
                    if (cleanUrl.endsWith(',')) cleanUrl = cleanUrl.slice(0, -1);
                    // specific filter for our case
                    if (cleanUrl.match(/\.(jpg|jpeg|png|webp|gif|svg)/i) || cleanUrl.includes('wikimedia') || cleanUrl.includes('unsplash')) {
                        allUrls.add(cleanUrl);
                        fileMap[filePath].push(cleanUrl);
                    }
                });
            }
        } else {
            console.log(`File not found: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
    }
});

console.log(JSON.stringify({
    uniqueUrls: Array.from(allUrls),
    byFile: fileMap
}, null, 2));

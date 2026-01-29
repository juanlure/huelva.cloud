import fs from 'fs';
import path from 'path';
import https from 'https';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const IMAGES_TO_DOWNLOAD = [
    // Survival Guide
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Huelva_-_Plaza_de_las_monjas.jpg/1920px-Huelva_-_Plaza_de_las_monjas.jpg', name: 'huelva-plaza-las-monjas.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Huelva_-_Estaci%C3%B3n_de_Sevilla_01.jpg/1280px-Huelva_-_Estaci%C3%B3n_de_Sevilla_01.jpg', name: 'huelva-estacion-sevilla.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Gambas_blancas_de_Huelva.jpg/1280px-Gambas_blancas_de_Huelva.jpg', name: 'gambas-blancas-huelva.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Choquitos_fritos.jpg/1280px-Choquitos_fritos.jpg', name: 'choquitos-fritos.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Muelle_del_Tinto%2C_Huelva%2C_Espa%C3%B1a%2C_2015-12-09%2C_DD_26.JPG/1920px-Muelle_del_Tinto%2C_Huelva%2C_Espa%C3%B1a%2C_2015-12-09%2C_DD_26.JPG', name: 'muelle-tinto-huelva.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Barrio_Reina_Victoria_Huelva.jpg/1280px-Barrio_Reina_Victoria_Huelva.jpg', name: 'barrio-reina-victoria.jpg' },

    // Choco Translator
    { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Choco_frito.jpg?width=800', name: 'choco-frito-tapa.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Coquinas.jpg/1280px-Coquinas.jpg', name: 'coquinas-huelva.jpg' },

    // Coffee Translator
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Huelva_-_Estaci%C3%B3n_de_Sevilla_01.jpg/1600px-Huelva_-_Estaci%C3%B3n_de_Sevilla_01.jpg', name: 'huelva-estacion-sevilla-hero.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG', name: 'cafe-vaso-huelva.jpg' },

    // Jamon Translator
    { url: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Corte_de_jam%C3%B3n_ib%C3%A9rico.jpg', name: 'corte-jamon-iberico.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Jam%C3%B3n_ib%C3%A9rico_de_bellota_100%25_%282015241812814%29.jpg', name: 'jamon-iberico-bellota.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Jamones_en_secadero.jpg', name: 'jamones-secadero.jpg' },

    // Neighborhoods Guide
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ayuntamiento_de_Huelva.jpg/1280px-Ayuntamiento_de_Huelva.jpg', name: 'ayuntamiento-huelva.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Barrio_Obrero_Reina_Victoria_Huelva.jpg/1280px-Barrio_Obrero_Reina_Victoria_Huelva.jpg', name: 'barrio-reina-victoria-hero.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Muelle_de_mineral_de_la_compa%C3%B1%C3%ADa_Riotinto%2C_Huelva%2C_Espa%C3%B1a%2C_2015-12-08%2C_DD_26.JPG/1280px-Muelle_de_mineral_de_la_compa%C3%B1%C3%ADa_Riotinto%2C_Huelva%2C_Espa%C3%B1a%2C_2015-12-08%2C_DD_26.JPG', name: 'muelle-tinto-riotinto.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Iglesia_del_Roc%C3%ADo_%28Huelva%29_02.jpg/1280px-Iglesia_del_Roc%C3%ADo_%28Huelva%29_02.jpg', name: 'iglesia-rocio-huelva.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Santuario_de_La_Cinta_%28Huelva%29.jpg/1280px-Santuario_de_La_Cinta_%28Huelva%29.jpg', name: 'santuario-cinta-huelva.jpg' },

    // Weekend Itinerary
    { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Monumento_Cristobal_Col%C3%B3n_Plaza_Monjas_Huelva.jpg', name: 'monumento-colon-monjas.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Muelle-del-Tinto.jpg/1200px-Muelle-del-Tinto.jpg', name: 'muelle-tinto-sunset.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Marismas_del_Odiel.jpg/1280px-Marismas_del_Odiel.jpg', name: 'marismas-odiel.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jam%C3%B3n_de_Jabugo_y_Fino_Quinta.png/800px-Jam%C3%B3n_de_Jabugo_y_Fino_Quinta.png', name: 'jamon-jabugo-fino.png' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Playa_de_Punta_Umbria_%28Huelva%29.jpg/1280px-Playa_de_Punta_Umbria_%28Huelva%29.jpg', name: 'playa-punta-umbria.jpg' },

    // Pages
    { url: 'https://images.unsplash.com/photos/cobblestone-street-lined-with-white-buildings-under-blue-sky--dKb_Bj_h_I?w=1600&q=80', name: 'calle-huelva-centro.jpg' },
    { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Choco_frito.jpg?width=1600', name: 'choco-frito-hero.jpg' },
];

const DOWNLOAD_DIR = path.join(process.cwd(), 'public/images/guides');

if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

async function downloadImage(url: string, filename: string) {
    const filePath = path.join(DOWNLOAD_DIR, filename);

    console.log(`Downloading ${filename}...`);
    return new Promise<void>((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location!, filename).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            const fileStream = fs.createWriteStream(filePath);
            streamPipeline(response, fileStream)
                .then(() => {
                    console.log(`Saved ${filename}`);
                    resolve();
                })
                .catch(reject);
        });
        request.on('error', (err) => reject(err));
    });
}

async function main() {
    const errors: any[] = [];
    for (const image of IMAGES_TO_DOWNLOAD) {
        try {
            await downloadImage(image.url, image.name);
        } catch (error) {
            console.error(`Error downloading ${image.name}:`, error);
            errors.push({ name: image.name, error });
        }
    }

    if (errors.length > 0) {
        console.log(`Finished with ${errors.length} errors.`);
        process.exit(1);
    } else {
        console.log('All images downloaded successfully.');
    }
}

main();

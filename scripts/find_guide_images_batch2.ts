
import { searchRealWebImage } from '../src/lib/agents/image-researcher';

async function main() {
    const guideTopics = {
        choco: [
            'Choco frito Huelva plato real',
            'Coquinas de Huelva al ajillo',
            'Gamba blanca de Huelva plato',
        ],
        jamon: [
            'Plato jamón ibérico bellota Huelva',
            'Dehesa Huelva cerdos ibéricos',
            'Jamón de Jabugo corte cuchillo',
        ],
        cafe: [
            'Café en vaso de cristal Huelva', // Specific to Huelva style
        ],
        neighborhoods: [
            'Barrio Reina Victoria Huelva',
            'Santuario de la Cinta Huelva',
            'Plaza de las Monjas Huelva'
        ],
        weekend: [
            'Muelle del Tinto atardecer',
            'Monasterio de la Rábida Huelva',
            'Playa de Punta Umbría atardecer'
        ]
    };

    console.log("Searching for real images for remaining guides...");

    for (const [guide, topics] of Object.entries(guideTopics)) {
        console.log(`\n=== Guide: ${guide} ===`);
        for (const topic of topics) {
            console.log(`Searching for: ${topic}`);
            // searchRealWebImage is async
            const result = await searchRealWebImage(topic);
            if (result) {
                console.log(`[FOUND]: ${result.selected_image.url}`);
            } else {
                console.log(`[NOT FOUND]`);
            }
        }
    }
}

main().catch(console.error);

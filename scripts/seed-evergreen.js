const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// URLs de imágenes de Unsplash (gratis, libres de derechos)
const IMAGES = {
    choco: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?q=80&w=1200&fit=crop', // Calamares fritos
    playa: 'https://images.unsplash.com/photos/fishing-boat-rests-on-a-sandy-beach-at-sunset-NnoYxm4hlxg?q=80&w=1200&fit=crop', // Barco en playa al atardecer
    tapas: 'https://images.unsplash.com/photos/a-white-plate-topped-with-meat-and-vegetables-zbO0yIqHk0g?q=80&w=1200&fit=crop', // Tapas variadas
    architecture: 'https://images.unsplash.com/photos/white-buildings-line-a-narrow-european-street-Gl4DrBl80sA?q=80&w=1200&fit=crop', // Casas blancas andaluzas
    muelle: 'https://images.unsplash.com/photos/a-sunset-over-a-harbor-with-boats-in-the-water-fcSEoJKPWcY?q=80&w=1200&fit=crop', // Puerto al atardecer
    nature: 'https://images.unsplash.com/photos/a-sandy-beach-with-boats-on-the-water-ipNgawmitwU?q=80&w=1200&fit=crop', // Playa con barcos
};

const articles = [
    {
        slug: 'ruta-del-choco',
        title: 'La Ruta del Choco: Donde el Choco es Religión',
        excerpt: 'Si vienes a Huelva y no comes choco, es como ir a Roma y no ver al Papa. O peor, como ir a la playa y que haya levante. Aquí te digo dónde ir de verdad.',
        content: `
<p>Vamos a ver, que nos conocemos. Si estás buscando "los 10 mejores sitios para brunch", tira para Sevilla. Aquí hemos venido a mancharnos de alioli y a que el camarero nos llame "caballero" o "niña" con un plato de chocos fritos por delante.</p>

<h2>La Santísima Trinidad: Frito, a la plancha o con habas</h2>
<p>El choco es versátil, como un buen mediocentro del Recre. En Huelva, el choco no es comida, es un estado de ánimo. Si vas a un sitio y el choco está correoso, levántate y vete. El choco tiene que estar más tierno que un primer beso en las Marismas.</p>

<div id="interactive-root" data-component="scorecard"></div>
<script type="application/json" id="interactive-data">
{
  "title": "Mide tu Nivel de Pureza Choquera",
  "items": [
    { "id": "tierno", "label": "Ternura del bicho", "icon": "🦑" },
    { "id": "alioli", "label": "Potencia del alioli", "icon": "🧄" },
    { "id": "ambiente", "label": "Griterío local", "icon": "🗣️" },
    { "id": "precio", "label": "Precio honesto", "icon": "💶" }
  ]
}
</script>

<h2>¿Dónde ir? (Honestidad Brutal)</h2>
<ul>
    <li><strong>El Azabache:</strong> Calle Rico, 17. ⭐4.5/5 en TripAdvisor. Jamónazo que te hace llorar.</li>
    <li><strong>Er Chiclanero:</strong> C/ José Nogueira, 8. ⭐4.7/5. Marisco tan fresco que casi se mueve.</li>
    <li><strong>Casa Miguel:</strong> Plaza de las Monjas, 5. Los tollos con tomate son una religión.</li>
    <li><strong>El Comodoro:</strong> C/ Puerto, 12. Ensaladilla de atún que te cambia la vida.</li>
</ul>

<blockquote>
    "Un choco bien frito soluciona cualquier crisis existencial. Palabra de onubense."
</blockquote>

<p>Y recuerda: si el camarero te pregunta si quieres "sepia", corrígele inmediatamente. Es <strong>CHOCO</strong>. No nos hagas pasar vergüenza.</p>
        `,
        category: 'Gastronomía',
        image_url: IMAGES.choco,
        author: 'Rocío Limón',
        is_ai: true,
        tags: '{choco,tapas,gastronomía,restaurantes,marisco}',
        published_at: new Date().toISOString()
    },
    {
        slug: 'muelle-del-tinto-atardecer',
        title: 'El Muelle del Tinto: El Atardecer más Fotogénico de Huelva',
        excerpt: '1.165 metros de hierro industrial sobre el Río Odiel. Construido en 1874, este muelle británico es el lugar perfecto para ver el sol morir mientras aprendes historia.',
        content: `
<p>Hay atardeceres y atardeceres. Y luego está el atardecer desde el Muelle del Tinto. Si no has venido aquí con tu cámara móvil, básicamente no has estado en Huelva.</p>

<h2>Un poco de historia (para que parezca culto)</h2>
<p>Este muelle fue construido entre 1874 y 1876 por la Río Tinto Company, una empresa británica que exportaba mineral desde las minas de Riotinto. Sí, Huelva fue casi inglés. Por eso tienes casas victorianas en plena Andalucía.</p>

<p>El muelle tiene 1.165 metros de largo. Es tan largo que cuando caminas hasta el final, te sientes como explorador de una civilización perdida. Una civilización de hierro oxidado y agua marrón.</p>

<h2>El secreto del atardecer</h2>
<p>El truco es llegar 30 minutos antes del ocaso. En verano eso es sobre las 21:30. El sol se pone tras las marismas del Odiel, el agua se pone dorada, y el muelle hace siluetas que parecen de película.</p>

<p><strong>PRO TIP:</strong> Si vienes en pareja, es el momento perfecto para esa foto que demuestra lo bien viajáis. Si vienes solo, pues hazte un selfie que muestre qué solo no estás.</p>

<h2>Cómo llegar</h2>
<ul>
    <li><strong>Coch:</strong> Parking Punta del Sebo (gratis)</li>
    <li><strong>A pie:</strong> 30 min desde el centro por la Avenida de Andalucía</li>
    <li><strong>Autobús:</strong> L2 hasta parada "Estación"</li>
</ul>

<p>Aviso legal: No, no puedes subir al muelle. Está vallado. Pero las fotos desde el lateral son igual de épicas.</p>
        `,
        category: 'Playa y Naturaleza',
        image_url: IMAGES.muelle,
        author: 'Juan María "El Experto" Sánchez',
        is_ai: true,
        tags: '{muelle,atardecer,fotos,historia,rio tinto,británico}',
        published_at: new Date().toISOString()
    },
    {
        slug: 'playas-huelva-ocultas',
        title: 'Playas que los turistas no conocen (y tú tampoco)',
        excerpt: 'Todo el mundo va a Punta Umbría o Matalascañas. Pero el verdadero tesoro está en Cuesta Maneli. Te cuento el secreto.',
        content: `
<p>Vamos a ser claros: Matalascañas tiene su encanto si te gustan los apartamentos en vertical, las sombrillas a 5€ por día y sentirte como una sardina en lata.</p>

<p>Pero si quieres playa de verdad, sigue leyendo.</p>

<h2>Cuesta Maneli: La Joya Oculta</h2>
<p>Entre Matalascañas y Mazagón hay una playa que no tiene paseo marítimo, ni chiringuitos, ni música a volumen de concierto. Solo arena, agua y paz. Se llama <strong>Cuesta Maneli</strong> y es, según muchos, la mejor playa de Huelva.</p>

<p><strong>Por qué es especial:</strong></p>
<ul>
    <li>Arena dorada finita (no la típica arena sucia de algunas playas)</li>
    <li> Aguas cristalinas (cuando no hay levante, claro)</li>
    <li>Naturismo opcional (si ese es tu rollo)</li>
    <li>Cero aglomeración</li>
</ul>

<h2>Cómo llegar sin morir en el intento</h2>
<ol>
    <li>Coch por la A-49 hacia Huelva</li>
    <li>Desvío a Matalascañas (A-480)</li>
    <li>Antes de llegar al camping, parking a la izquierda</li>
    <li>Caminar 5 min por sendero de madera</li>
</ol>

<p>Advertencia: No hay servicios. Ni aseos, ni duchas, ni kiosko. Lleva agua y sombrero. Y por el amor de dios, recoge tu basura.</p>

<h2>Otras joyas menores</h2>
<ul>
    <li><strong>Playa del Parador (Mazagón):</strong> Frambuesas que sobresalen del agua. Aguas cristalinas.</li>
    <li><strong>Castilla:</strong> 7km de arena virgen entre Mazagón y Matalascañas.</li>
    <li><strong>El Portil:</strong> Buen compromiso entre servicios y naturaleza.</li>
</ul>
        `,
        category: 'Playa y Naturaleza',
        image_url: IMAGES.playa,
        author: 'María "La Sirena' Pineda',
        is_ai: true,
        tags: '{playas,naturaleza,cuesta maneli,mazagón,ocultas}',
        published_at: new Date().toISOString()
    },
    {
        slug: 'barrio-britanico-reina-victoria',
        title: 'El Barrio Inglés que parece Londres pero es Huelva',
        excerpt: 'Casas victorianas, tejados a dos aguas y jardines. No, no estás en Londres. Estás en Huelva. Te explico cómo un barrio minero se convirtió en patrimonio.',
        content: `
<p>Imagina esto: estás caminando por Huelva, temperatura de 35°C, sol a tope. De repente, giras la esquina y parece que has teletransportado a un suburbio de Londres. Casas con tejado inclinado, jardineras, brick walls.</p>

<p>Bienvenido al Barrio Reina Victoria.</p>

<h2>¿Por qué hay casas inglesas en Huelva?</h2>
<p>En 1916, la Río Tinto Company decidió que sus trabajadores británicos necesitaban casas dignas. Así que mandaron planos de Londres y construyeron 71 casas con todas las comodidades de la época.</p>

<p>El resultado: un barrio que es una mezcla rara de arquitectura inglesa y andaluza. Casas victorianas con azulejos. Jardines ingleses con naranjos. Un híbrado que funciona de una manera extraña.</p>

<h2>Qué ver (son solo casas, pero te lo cuento bonito)</h2>
<ul>
    <li><strong>Calle Reina Victoria:</strong> La calle principal. Las casas están numeradas y todas parecen diferentes pero son iguales.</li>
    <li><strong>Iglesia de San José:</strong> Pequeña, acogedora, con toque británico.</li>
    <li><strong>Plaza del Príncipe:</strong> El corazón del barrio. Buen sitio para sentarse y imaginar que estás en 1920.</li>
</ul>

<h2>Dato curioso</h2>
<p>En 2002 fue declarado Bien de Interés Cultural (BIC). Así que ya sabes: si alguien quiere derribarlas para hacer un bloque de pisos, que se olvide.</p>

<p><strong>PRO TIP:</strong> El mejor momento para visitarlo es por la mañana, con luz suave. Las paredes blancas brillan y los jardines están verdes. Por la tarde el sol pega fuerte y todo parece planchado.</p>
        `,
        category: 'Cultura y Historia',
        image_url: IMAGES.architecture,
        author: 'Pedro "El Historiador" García',
        is_ai: true,
        tags: '{barrio inglés,reina victoria,arquitectura,historia,británico}',
        published_at: new Date().toISOString()
    },
    {
        slug: 'marismas-odeli-flamencos',
        title: 'Marismas del Odiel: Donde los Flamencos son más que de plástico',
        excerpt: '2.700 hectáreas de marismas, 300 especies de aves y más flamencos de los que has visto en toda tu vida. Guía para no parecer un turista.',
        content: `
<p>Huelva tiene un superpoder secreto: las Marismas del Odiel. Un paraje natural de 2.700 hectáreas que es como una guardería para pájaros, pero en serio.</p>

<h2>¿Qué son las Marismas?</h2>
<p>Básicamente son zonas húmedas donde el agua dulce de los ríos se mezcla con el agua salada del mar. El resultado es un ecosistema único donde los pájaros viven como reyes.</p>

<p>Tiene 300+ especies de aves. 300. Lee otra vez. Tres ceros.</p>

<h2>Los protagonistas: Flamencos</h2>
<p>Sí, flamencos de verdad. Rosados, largos, con patas flacas. Caminan por el agua como si les debiéramos dinero. Y los hay a montones.</p>

<p><strong>Cuándo verlos:</strong></p>
<ul>
    <li>Primavera: temporada de cría. Muchísimos.</li>
    <li>Verano: menos, pero siguen ahí.</li>
    <li>Invierno: se refugian aquí del frío del norte.</li>
</ul>

<h2>Cómo visitar sin perderse</h2>
<ol>
    <li><strong>Centro de visitantes Anastasio Senra:</strong> Empieza aquí. Tienes exposiciones, telescopios y gente que sabe cosas.</li>
    <li><strong>Ruta Calatilla-Bacuta:</strong> 8km ida y vuelta. Sendero fácil. Lleva agua y calzado cómodo.</li>
    <li><strong>Ruta en tren:</strong> Sí, hay un trenecito turístico. Perfecto si quieres ir sin caminar.</li>
</ol>

<h2>Qué llevar (aprende de mis errores)</h2>
<ul>
    <li>Agua (mucho sol)</li>
    <li>Sombrero (el sol no perdona)</li>
    <li>Binoculares (si quieres ver de cerca)</li>
    <li>Cámara (losInstagram lo piden)</li>
</ul>

<p>Aviso: No molestes a los animales. No hace falta gritarles para que miren a tu cámara. No seas ese turista.</p>
        `,
        category: 'Playa y Naturaleza',
        image_url: IMAGES.nature,
        author: 'Ana "Ornitológica' Romero',
        is_ai: true,
        tags: '{marismas,flamencos,naturaleza,aves,paraje natural}',
        published_at: new Date().toISOString()
    },
];

async function seed() {
    console.log("🚀 Insertando artículos evergreen...");

    for (const article of articles) {
        console.log(`   Insertando: ${article.slug}`);
        const { data, error } = await supabase
            .from('articles')
            .upsert([article], { onConflict: 'slug' });

        if (error) {
            console.error(`   ❌ Error en ${article.slug}:`, error);
        } else {
            console.log(`   ✅ ${article.slug} publicado con éxito.`);
        }
    }

    console.log("\n📊 Resumen:");
    console.log(`   ${articles.length} artículos insertados/actualizados`);
    console.log(`   Categorías: ${[...new Set(articles.map(a => a.category))].join(', ')}`);
}

seed();

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const guide = {
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
    <li><strong>El Puerto:</strong> Un clásico. No esperes manteles de lino. Espera ruido, servilletas de papel que no limpian y el mejor producto que tus ojos verán.</li>
    <li><strong>Isla Chica:</strong> El barrio. Aquí es donde se cuece la verdad. Si el bar tiene serrín en el suelo, vas bien encaminado.</li>
</ul>

<blockquote>
    "Un choco bien frito soluciona cualquier crisis existencial. Palabra de onubense."
</blockquote>

<p>Y recuerda: si el camarero te pregunta si quieres "sepia", corrígele inmediatamente. Es <strong>CHOCO</strong>. No nos hagas pasar vergüenza.</p>
    `,
    category: 'Gastronomía',
    image_url: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?q=80&w=1200&fit=crop',
    author: 'Rocío Limón',
    is_ai: true,
    published_at: new Date().toISOString()
};

async function seed() {
    console.log("🚀 Insertando guía de la Ruta del Choco...");
    const { data, error } = await supabase
        .from('articles')
        .upsert([guide], { onConflict: 'slug' });

    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("✅ Guía publicada con éxito.");
    }
}

seed();

#!/usr/bin/env node
/**
 * Generador de artículos diarios para huelva.is
 * Crea un artículo nuevo basado en temas predefinidos
 */

import fs from 'fs/promises';
import path from 'path';

const WORKSPACE = '/home/claw1/.openclaw/workspace/huelva-is';
const ARTICLES_FILE = path.join(WORKSPACE, 'src/content/articles.ts');

// Temas pendientes para artículos
const PENDING_TOPICS = [
  {
    slug: 'jabugo-pueblo-jamon',
    title: 'Jabugo: el pueblo donde el jamón es ley',
    category: 'Guías Locales',
    image: '/images/guides/corte-jamon-iberico.jpg',
    excerpt: 'Guía de Jabugo: el pueblo más famoso por su jamón, qué ver, dónde comer y cómo llegar.',
    author: 'Antonio Torre'
  },
  {
    slug: 'matalascanas-playa-guia',
    title: 'Matalascañas: la playa más grande de Huelva',
    category: 'Guías Locales',
    image: '/images/guides/matalascanas-playa.jpg',
    excerpt: 'Guía completa de Matalascañas: kilómetros de playa, dunas, y el mejor ambiente veraniego.',
    author: 'Lucía Colombina'
  },
  {
    slug: 'la-antilla-veraneo',
    title: 'La Antilla: el veraneo tradicional onubense',
    category: 'Guías Locales',
    image: '/images/guides/la-antilla-playa.jpg',
    excerpt: 'La Antilla lleva décadas siendo destino de verano. Historia, qué ofrece, y por qué sigue funcionando.',
    author: 'Lucía Colombina'
  },
  {
    slug: 'pinar-huelva-naturaleza',
    title: 'Los pinares de Huelva: naturaleza entre la playa y la ría',
    category: 'Guías Locales',
    image: '/images/guides/pinar-huelva.jpg',
    excerpt: 'Los pinares de la costa onubense: ecosistema único, rutas, y cómo disfrutarlos.',
    author: 'Antonio Torre'
  },
  {
    slug: 'costa-huelva-kilometros',
    title: 'La Costa de Huelva: más de 120 kilómetros de playa',
    category: 'Guías Locales',
    image: '/images/guides/costa-huelva.jpg',
    excerpt: 'De Ayamonte a Matalascañas: todas las playas de la costa onubense, sus diferencias y qué esperar.',
    author: 'Lucía Colombina'
  },
  {
    slug: 'virgen-rocio-romeria',
    title: 'La Virgen del Rocío: historia de la Blanca Paloma',
    category: 'Eventos',
    image: '/images/guides/virgen-rocio.jpg',
    excerpt: 'Historia y significado de la Virgen del Rocío, la devoción más importante de Huelva.',
    author: 'Antonio Torre'
  },
  {
    slug: 'moguer-pueblo-colombino',
    title: 'Moguer: pueblo colombino y tierra de Juan Ramón Jiménez',
    category: 'Guías Locales',
    image: '/images/guides/moguer-huelva.jpg',
    excerpt: 'Moguer es mucho más que el lugar de nacimiento de Juan Ramón: historia, qué ver, y cómo llegar.',
    author: 'Antonio Torre'
  },
  {
    slug: 'quercus-dehesa-huelva',
    title: 'La dehesa onubense: encinas, alcornoques y jamón',
    category: 'Guías Locales',
    image: '/images/guides/quercus.jpg',
    excerpt: 'El ecosistema de la dehesa: qué es, dónde verla, y por qué es esencial para el jamón ibérico.',
    author: 'Antonio Torre'
  },
  {
    slug: 'tortilla-camarones-huelva',
    title: 'Tortilla de camarones: el plato que no esperas',
    category: 'Gastronomía',
    image: '/images/guides/coquinas-huelva.jpg',
    excerpt: 'La tortilla de camarones es una rareza gastronómica de la costa onubense. Cómo es y dónde probarla.',
    author: 'Rocío Limón'
  },
  {
    slug: 'carrillada-iberica-huelva',
    title: 'Carrillada ibérica: el guiso de la Sierra',
    category: 'Gastronomía',
    image: '/images/guides/corte-jamon-iberico.jpg',
    excerpt: 'La carrillada de cerdo ibérico es un clásico de la Sierra de Huelva. Receta, historia, dónde comerla.',
    author: 'Rocío Limón'
  },
  {
    slug: 'cortegana-castillo-sierra',
    title: 'Cortegana: castillo medieval en el corazón de la Sierra',
    category: 'Guías Locales',
    image: '/images/guides/aracena-pueblo.jpg',
    excerpt: 'Cortegana y su castillo: uno de los pueblos más bonitos de la Sierra de Huelva.',
    author: 'Antonio Torre'
  },
  {
    slug: 'alajar-peña-arias',
    title: 'Alájar: el pueblo colgado de la Peña de Arias Montano',
    category: 'Guías Locales',
    image: '/images/guides/aracena-pueblo.jpg',
    excerpt: 'Alájar es uno de los pueblos más pintorescos de Huelva, dominado por la Peña de Arias Montano.',
    author: 'Antonio Torre'
  },
  {
    slug: 'senderismo-huelva-rutas',
    title: 'Senderismo en Huelva: 5 rutas imprescindibles',
    category: 'Guías Locales',
    image: '/images/guides/donana-huelva.jpg',
    excerpt: 'Rutas de senderismo para todos los niveles en Huelva: desde la Sierra hasta la costa.',
    author: 'Antonio Torre'
  },
  {
    slug: 'cicloturismo-huelva',
    title: 'Cicloturismo en Huelva: pedalear entre el mar y la Sierra',
    category: 'Guías Locales',
    image: '/images/guides/huelva-aerea.jpg',
    excerpt: 'Rutas en bicicleta por Huelva: desde la costa hasta la Sierra, para todos los niveles.',
    author: 'Lucía Colombina'
  },
  {
    slug: 'observacion-aves-huelva',
    title: 'Observación de aves en Huelva: flamencos y mucho más',
    category: 'Guías Locales',
    image: '/images/guides/donana-huelva.jpg',
    excerpt: 'Huelva es paraíso para observadores de aves. Dónde ir, cuándo, y qué especies ver.',
    author: 'Antonio Torre'
  }
];

async function getCurrentArticleCount() {
  const content = await fs.readFile(ARTICLES_FILE, 'utf-8');
  const matches = content.match(/slug:/g);
  return matches ? matches.length : 0;
}

async function getUsedSlugs() {
  const content = await fs.readFile(ARTICLES_FILE, 'utf-8');
  const matches = content.match(/slug: '([^']+)'/g);
  return matches ? matches.map(m => m.replace(/slug: '/, '').replace(/'/, '')) : [];
}

async function generateArticle(topic, number) {
  const now = new Date();
  const publishedAt = now.toISOString();
  
  return `
  // ${number}. ${topic.title}
  {
    slug: '${topic.slug}',
    title: '${topic.title}',
    excerpt: '${topic.excerpt}',
    category: '${topic.category}',
    image: '${topic.image}',
    publishedAt: '${publishedAt}',
    author: '${topic.author}',
    isAi: true,
    content: \`
      \u003cp\u003e[CONTENIDO PENDIENTE DE GENERAR]\u003c/p\u003e
      
      \u003cp\u003eEste artículo fue creado automáticamente el ${now.toLocaleDateString('es-ES')}. El contenido completo se añadirá próximamente.\u003c/p\u003e

      \u003cblockquote\u003eArtículo en construcción. Vuelve pronto para leer el contenido completo.\u003c/blockquote\u003e
    \`
  },`;
}

async function main() {
  console.log('📝 Generador de artículos diarios para huelva.is');
  console.log('');

  const currentCount = await getCurrentArticleCount();
  console.log(`📊 Artículos actuales: ${currentCount}`);

  const usedSlugs = await getUsedSlugs();
  
  // Encontrar temas no usados
  const availableTopics = PENDING_TOPICS.filter(t => !usedSlugs.includes(t.slug));
  
  if (availableTopics.length === 0) {
    console.log('⚠️  No hay temas pendientes disponibles');
    process.exit(0);
  }

  // Seleccionar un tema aleatorio
  const topic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
  console.log(`🆕 Nuevo artículo: ${topic.title}`);

  const newArticle = await generateArticle(topic, currentCount + 1);
  
  // Leer archivo actual
  let content = await fs.readFile(ARTICLES_FILE, 'utf-8');
  
  // Insertar antes del cierre final
  const insertPosition = content.lastIndexOf('];');
  if (insertPosition === -1) {
    console.error('❌ No se encontró posición de inserción');
    process.exit(1);
  }

  const newContent = content.slice(0, insertPosition) + newArticle + '\n' + content.slice(insertPosition);
  
  await fs.writeFile(ARTICLES_FILE, newContent);
  console.log('✅ Artículo añadido al archivo');
  
  console.log('');
  console.log('⚠️  Nota: Este script crea el esqueleto del artículo.');
  console.log('   El contenido completo debe ser escrito manualmente o con ayuda de IA.');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});

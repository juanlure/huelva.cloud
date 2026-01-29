import Link from 'next/link';
import { Compass, Clock, Users, MapPin, ArrowRight, Award, Coffee } from 'lucide-react';

const guides = [
  {
    slug: 'supervivencia',
    title: 'Guía de Supervivencia',
    description: 'Transporte, horarios, slang y secretos locales para moverte por Huelva sin parecer turista.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80',
    icon: <Compass size={28} />,
    badge: 'Lo más leído',
    color: 'from-amber-500 to-orange-600',
    stats: '5 secciones'
  },
  {
    slug: '48-horas',
    title: '48 Horas en Huelva',
    description: 'Itinerario personalizado: comida, cultura y costa. Elige tu vibe y descubre la ciudad.',
    image: 'https://images.unsplash.com/photo-1620733723572-11c52f7c2fd5?auto=format&fit=crop&w=1200&q=80',
    icon: <Clock size={28} />,
    badge: 'Itinerario',
    color: 'from-blue-500 to-cyan-600',
    stats: '4 vibes'
  },
  {
    slug: 'choco',
    title: 'Traductor de Choco',
    description: 'Aprende a pedir como un verdadero choquero. Vocabulario local con pronunciación.',
    image: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?auto=format&fit=crop&w=1200&q=80',
    icon: <Users size={28} />,
    badge: 'Interactivo',
    color: 'from-terracotta to-red-600',
    stats: '28 términos'
  },
  {
    slug: 'jamon',
    title: 'Traductor de Jamón',
    description: 'Bellota, Cebo de Campo, Cebo. Descubre las diferencias que marcan el precio y sabor.',
    image: 'https://images.unsplash.com/photo-1624653554176-59a16f39d150?auto=format&fit=crop&w=1200&q=80',
    icon: <Award size={28} />,
    badge: 'Premium',
    color: 'from-amber-600 to-yellow-600',
    stats: '4 categorías'
  },
  {
    slug: 'cafe',
    title: 'Traductor de Café',
    description: 'Solo, Cortado, Mitad, Manchado, Sombra, Nube. Los ratios sagrados del café onubense.',
    image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80',
    icon: <Coffee size={28} />,
    badge: 'Nuevo',
    color: 'from-stone-600 to-stone-800',
    stats: '9 tipos'
  },
  {
    slug: 'barrios',
    title: 'Barrios de Huelva',
    description: 'Centro, Reina Victoria, Paseo de la Cinta... Encuentra tu barrio perfecto.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80',
    icon: <MapPin size={28} />,
    badge: 'Interactivo',
    color: 'from-purple-500 to-pink-600',
    stats: '6 barrios'
  }
];

import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';

async function DynamicGuidesGrid() {
  const articles = await getArticles('guias'); // 'guias' maps to 'Guías Locales'

  if (articles.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, idx) => (
        <ArticleCard
          key={idx}
          {...article}
          imageUrl={article.image} // Adapter: api returns 'image', component expects 'imageUrl'
          publishedAt={article.date}
          readTime={parseInt(article.readTime)}
          author={{ name: article.author }}
        />
      ))}
    </div>
  );
}

export default async function GuidesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-navy pt-32 pb-32 px-6">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-terracotta/10 border border-terracotta/20 mb-8">
              <Compass size={16} className="text-terracotta" />
              <span className="text-sm font-bold text-terracotta uppercase tracking-widest">
                Guías Interactivas
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              No solo información.
              <br />
              <span className="text-terracotta italic">Experiencias.</span>
            </h1>

            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              Descubre Huelva como un local a través de nuestras guías interactivas diseñadas
              para ayudarte a explorar la ciudad como un verdadero onubense.
            </p>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="container py-20">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden border border-navy-10 hover:border-terracotta/50 hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${guide.image})` }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-navy text-xs font-bold uppercase tracking-wider rounded-full">
                        {guide.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg ${guide.color}`}>
                      {guide.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-display text-xl font-semibold text-navy mb-3 group-hover:text-terracotta transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-navy-60 text-sm leading-relaxed mb-4">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-navy-40">{guide.stats}</span>
                      <span className="text-terracotta font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explorar
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Guides Section - Articles from DB */}
      <section className="bg-sand/30 py-20 border-t border-navy-10">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-display text-4xl font-semibold text-navy mb-4">
                  Más Guías Locales
                </h2>
                <p className="text-navy-60 text-lg">
                  Artículos y recomendaciones escritas por nuestros expertos locales.
                </p>
              </div>
              <Link
                href="/guias"
                className="hidden md:flex items-center gap-2 text-terracotta font-medium hover:gap-3 transition-all"
              >
                Ver todo <ArrowRight size={20} />
              </Link>
            </div>

            {/* Requires fetching data - We need to make the component async and fetch articles */}
            {/* Note: In Next.js App Router, page components are server components by default */}
            <DynamicGuidesGrid />
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container py-20">
        <div className="max-w-content mx-auto">
          <div className="bg-gradient-to-r from-terracotta to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-display text-2xl md:text-3xl font-semibold mb-4">
              ¿Pruebas a ser choquero?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Descubre cuánto de Huelva llevas dentro con nuestro test interactivo.
            </p>
            <Link
              href="/#quiz"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-navy rounded-full font-bold hover:bg-navy-90 transition-all"
            >
              Hacer el test
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

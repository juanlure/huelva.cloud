import Link from 'next/link';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import Quiz from '@/components/quiz/Quiz';
import { ArrowRight, TrendingUp, Compass, Clock, Users, Sparkles } from 'lucide-react';
import TrendingLabel from '@/components/ui/TrendingLabel';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const articles = await getArticles();

  // Separate featured from regular articles
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1, 7);

  // Interactive guides data - Images from actual Spain/Andalusia locations
  const interactiveGuides = [
    {
      title: 'Guía de Supervivencia en Huelva',
      subtitle: 'Transporte, horarios, slang y secretos locales',
      image: 'https://images.unsplash.com/photos/cobblestone-street-lined-with-white-buildings-under-blue-sky--dKb_Bj_h_I?w=1200&q=80', // Carmona, Andalusia - perfect white buildings
      icon: <Compass size={24} />,
      href: '/guias/supervivencia',
      badge: 'Lo más leído'
    },
    {
      title: '48 Horas en Huelva',
      subtitle: 'Un finsemana perfecto: comida, cultura y mar',
      image: 'https://images.unsplash.com/photos/cityscape-with-historic-buildings-and-blue-sky-TGeob-v7JAU?w=1200&q=80', // Sevilla skyline - represents Andalusian cities
      icon: <Clock size={24} />,
      href: '/guias/48-horas',
      badge: 'Itinerario'
    },
    {
      title: 'Traductor de Choco',
      subtitle: 'Aprende a pedir como un verdadero choquero',
      image: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?w=1200&q=80', // Fried calamari - perfect for choco guide
      icon: <Users size={24} />,
      href: '/guias/choco',
      badge: 'Interactivo'
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section - Editorial Layout */}
      <section className="relative min-h-screen flex items-center bg-cream overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-terracotta/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-navy/5 to-transparent rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center py-24">
            {/* Badge */}
            <div className="flex justify-center mb-8 opacity-0 animate-fade-in-up">
              <TrendingLabel />
            </div>

            {/* Decorative Element */}
            <div className="flex justify-center mb-8 opacity-0 animate-fade-in-up delay-100">
              <div className="decorative-line" />
            </div>

            {/* Main Headline */}
            <h1 className="text-display font-semibold text-navy mb-8 opacity-0 animate-fade-in-up delay-200" style={{ lineHeight: 0.95 }}>
              Huelva como{' '}
              <span className="relative inline-block">
                <span className="text-terracotta italic">nunca</span>
                <svg className="absolute -bottom-3 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="#D4553A" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              {' '}te la habían contado
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-navy-60 leading-relaxed max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in-up delay-300">
              Sin rodeos, sin turismos. Solo lo mejor de nuestra tierra
              contado por gente que sabe lo que es un buen plato de chocos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up delay-400">
              <a
                href="#trending"
                className="btn btn-primary group"
              >
                Empezar a leer
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#guias"
                className="btn btn-outline"
              >
                Explorar guías
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-navy-10 opacity-0 animate-fade-in delay-500">
              <div className="flex items-center gap-2 text-sm text-navy-40">
                <Sparkles size={16} className="text-terracotta" />
                <span>+50 guías locales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-40">
                <Users size={16} className="text-terracotta" />
                <span>Escrito por onubenses</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-40">
                <Clock size={16} className="text-terracotta" />
                <span>Actualizado semanalmente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
          <div className="w-6 h-10 rounded-full border-2 border-navy-20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-terracotta rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending" className="editorial-section bg-white">
        <div className="container">
          <div className="max-w-content mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={20} className="text-terracotta" />
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">
                Lo que la gente está leyendo esta semana
              </span>
            </div>

            <h2 className="text-display text-4xl md:text-5xl font-semibold text-navy mb-16">
              Tendencias
            </h2>

            {/* Featured Article */}
            {featuredArticle && (
              <div className="mb-16 opacity-0 animate-fade-in-up">
                <ArticleCard
                  {...featuredArticle}
                  imageUrl={featuredArticle.image}
                  author={{ name: featuredArticle.author }}
                  publishedAt={featuredArticle.date}
                  readTime={parseInt(featuredArticle.readTime)}
                  featured
                />
              </div>
            )}

            {/* Article Grid - Asymmetric Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularArticles.map((article, idx) => (
                <div
                  key={article.slug}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <ArticleCard
                    {...article}
                    imageUrl={article.image}
                    author={{ name: article.author }}
                    publishedAt={article.date}
                    readTime={parseInt(article.readTime)}
                  />
                </div>
              ))}
            </div>

            {/* View All Link */}
            <div className="mt-16 text-center">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-navy-60 hover:text-terracotta font-medium transition-colors group"
              >
                <span>Ver todos los artículos</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Guides Section - Dark */}
      <section id="guias" className="editorial-section bg-navy text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)' }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-widest mb-6">
                <Sparkles size={16} />
                <span>Guías Interactivas</span>
              </div>

              <h2 className="text-display text-4xl md:text-5xl font-semibold mb-6">
                No solo información.
                <br />
                <span className="text-terracotta italic">Experiencias.</span>
              </h2>

              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Descubre Huelva como un local a través de nuestras guías interactivas diseñadas
                para ayudarte a explorar la ciudad como un verdadero onubense.
              </p>
            </div>

            {/* Guide Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interactiveGuides.map((guide, idx) => (
                <Link
                  key={idx}
                  href={guide.href}
                  className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-terracotta/50 transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Image with overlay */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${guide.image})` }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-terracotta">
                        {guide.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4 text-terracotta">
                      {guide.icon}
                    </div>
                    <h3 className="text-display text-xl font-semibold text-white mb-3 group-hover:text-terracotta transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {guide.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-terracotta font-medium text-sm">
                      <span>Explorar guía</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/30 text-sm">Más guías próximamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="editorial-section bg-sand">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-display text-4xl font-semibold text-navy mb-4">
                ¿Eres Choquero o Guiri?
              </h2>
              <p className="text-navy-60 text-lg">
                Descubre cuánto de Huelva llevas dentro con este test rápido.
              </p>
            </div>
            <Quiz />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="editorial-section bg-white">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display text-4xl font-semibold text-navy mb-4">
                Explora por categoría
              </h2>
              <p className="text-navy-60 text-lg">
                Encuentra exactamente lo que buscas.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Comer', icon: '🦐', desc: 'Gastronomía', count: 12, href: '/comer', color: 'bg-orange-50 hover:bg-orange-100' },
                { title: 'Eventos', icon: '🎭', desc: 'Agenda', count: 8, href: '/eventos', color: 'bg-purple-50 hover:bg-purple-100' },
                { title: 'Alojarse', icon: '🏨', desc: 'Hoteles', count: 6, href: '/alojarse', color: 'bg-blue-50 hover:bg-blue-100' },
                { title: 'Guías', icon: '🗺️', desc: 'Descubrir', count: 15, href: '/guias', color: 'bg-green-50 hover:bg-green-100' },
              ].map((cat, idx) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group p-6 rounded-2xl border border-navy-10 hover:border-terracotta/30 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 ${cat.color} transition-transform group-hover:scale-110`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-display text-lg font-semibold text-navy mb-1 group-hover:text-terracotta transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-navy-50 text-sm">{cat.desc}</p>
                  <span className="absolute top-4 right-4 text-xs font-medium text-navy-20">{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="editorial-section bg-terracotta text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-content mx-auto text-center">
            <h2 className="text-display text-3xl md:text-4xl font-semibold mb-4">
              Únete a la comunidad
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Recibe las mejores recomendaciones de Huelva directamente en tu email.
              Una vez por semana, sin spam.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 rounded-full text-navy focus:outline-none focus:ring-4 focus:ring-white/30 bg-white"
              />
              <button className="btn btn-secondary bg-navy hover:bg-navy-900">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

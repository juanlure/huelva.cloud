import Link from 'next/link';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import Quiz from '@/components/quiz/Quiz';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, TrendingUp, Compass, Clock, Users, Sparkles } from 'lucide-react';

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
      image: '/images/guides/huelva-plaza-las-monjas.jpg',
      icon: <Compass size={24} />,
      href: '/guias/supervivencia',
      badge: 'Lo más leído'
    },
    {
      title: '48 Horas en Huelva',
      subtitle: 'Un finsemana perfecto: comida, cultura y mar',
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80',
      icon: <Clock size={24} />,
      href: '/guias/48-horas',
      badge: 'Itinerario'
    },
    {
      title: 'Traductor de Choco',
      subtitle: 'Aprende a pedir como un verdadero choquero',
      image: 'https://images.unsplash.com/photo-1599487483441-df3f705139fb?auto=format&fit=crop&w=1200&q=80',
      icon: <Users size={24} />,
      href: '/guias/choco',
      badge: 'Interactivo'
    },
    {
      title: 'Traductor de Jamón',
      subtitle: 'Bellota, Cebo de Campo, Cebo. Las diferencias.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
      icon: <Users size={24} />,
      href: '/guias/jamon',
      badge: 'Nuevo'
    },
    {
      title: 'Traductor de Café',
      subtitle: 'Solo, Cortado, Mitad, Manchado...',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80',
      icon: <Users size={24} />,
      href: '/guias/cafe',
      badge: 'Nuevo'
    },
    {
      title: 'Barrios de Huelva',
      subtitle: 'Encuentra tu barrio perfecto',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80',
      icon: <Compass size={24} />,
      href: '/guias/barrios',
      badge: 'Interactivo'
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section - Dynamic with Framer Motion */}
      <HeroSection />

      {/* Trending Section */}
      <section id="trending" className="editorial-section bg-white">
        <div className="container">
          <div className="max-w-content mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={20} className="text-terracotta" />
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">
                Lo más leído esta semana
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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

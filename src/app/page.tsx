import Link from 'next/link';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import Quiz from '@/components/quiz/Quiz';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, TrendingUp, Compass, Clock, MapPin, CalendarDays, Star, Award, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const articles = await getArticles();

  // Get featured and organize content
  const featuredArticle = articles[0];
  const trendingArticles = articles.slice(1, 7);
  const gastronomyArticles = articles.filter(a => a.category === 'Gastronomía').slice(0, 3);
  const guidesArticles = articles.filter(a => a.category === 'Guías Locales').slice(0, 4);
  const eventsArticles = articles.filter(a => a.category === 'Eventos').slice(0, 3);

  // Stats
  const stats = {
    totalArticles: articles.length,
    totalImages: 43,
    categories: [...new Set(articles.map(a => a.category))].length,
    lastUpdated: articles[0]?.date || null
  };

  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Discover Section - Featured Content */}
      <section id="descubre" className="py-24 bg-cream">
        <div className="container">
          <div className="max-w-content mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <Star size={20} className="text-terracotta" />
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">
                Destacado
              </span>
            </div>

            <h2 className="text-display text-4xl md:text-5xl font-semibold text-navy mb-6">
              Descubre Huelva
            </h2>

            <p className="text-xl text-navy-60 max-w-2xl mb-16">
              Artículos seleccionados para que empieces a conocer la ciudad como un local.
            </p>

            {/* Featured Article */}
            {featuredArticle && (
              <div className="mb-16">
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

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingArticles.map((article, idx) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  imageUrl={article.image}
                  author={{ name: article.author }}
                  publishedAt={article.date}
                  readTime={parseInt(article.readTime)}
                />
              ))}
            </div>

            {/* View All */}
            <div className="mt-16 text-center">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-navy-60 hover:text-terracotta font-medium transition-colors group"
              >
                <span>Ver todos los artículos ({stats.totalArticles})</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gastronomy Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/50 to-transparent" />
        
        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award size={20} className="text-terracotta" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">
                    Gastronomía
                  </span>
                </div>
                <h2 className="text-display text-4xl font-semibold text-navy">
                  Comer en Huelva
                </h2>
              </div>
              <Link
                href="/comer"
                className="hidden md:inline-flex items-center gap-2 text-terracotta hover:text-terracotta/80 font-medium transition-colors"
              >
                <span>Ver todo</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gastronomyArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  imageUrl={article.image}
                  author={{ name: article.author }}
                  publishedAt={article.date}
                  readTime={parseInt(article.readTime)}
                  compact
                />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/comer"
                className="inline-flex items-center gap-2 text-terracotta font-medium"
              >
                <span>Ver todo</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section - Dark */}
      <section id="guias" className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)' }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-widest mb-6">
                <Sparkles size={16} />
                <span>Guías Locales</span>
              </div>

              <h2 className="text-display text-4xl md:text-5xl font-semibold mb-6">
                Explora la provincia
              </h2>

              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Desde la capital hasta la Sierra, desde el puerto hasta las playas. 
                Todo lo que necesitas saber para moverte por Huelva.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {guidesArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-terracotta/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${article.image})` }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-white/40 text-sm mb-2">{article.category}</p>
                    <h3 className="font-semibold text-white text-lg group-hover:text-terracotta transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/guias"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
              >
                <span>Ver todas las guías</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-sand/40">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CalendarDays size={20} className="text-terracotta" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">
                    Agenda
                  </span>
                </div>

                <h2 className="text-display text-4xl font-semibold text-navy mb-6">
                  Eventos y planes
                </h2>

                <p className="text-xl text-navy-60 mb-8">
                  Desde la Romería del Rocío hasta la Feria de las Colombinas. 
                  Todo lo que pasa en Huelva y no te puedes perder.
                </p>

                <Link
                  href="/eventos"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta hover:bg-terracotta/90 text-white font-semibold rounded-full transition-all duration-300"
                >
                  <span>Ver agenda completa</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="space-y-4">
                {eventsArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/article/${article.slug}`}
                    className="block bg-white rounded-2xl p-6 border border-navy-10 hover:border-terracotta/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${article.image})` }}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-navy-40 mb-1">{article.category}</p>
                        <h3 className="font-semibold text-navy group-hover:text-terracotta transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-navy-50 line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="py-24 bg-white">
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

      {/* Stats Section */}
      <section className="py-24 bg-navy text-white">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <p className="text-5xl font-bold text-terracotta mb-2">{stats.totalArticles}</p>
                <p className="text-white/60">Artículos publicados</p>
              </div>
              <div className="p-6">
                <p className="text-5xl font-bold text-terracotta mb-2">{stats.totalImages}</p>
                <p className="text-white/60">Imágenes</p>
              </div>
              <div className="p-6">
                <p className="text-5xl font-bold text-terracotta mb-2">{stats.categories}</p>
                <p className="text-white/60">Categorías</p>
              </div>
              <div className="p-6">
                <p className="text-5xl font-bold text-terracotta mb-2">∞</p>
                <p className="text-white/60">Chocos fritos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-terracotta text-white relative overflow-hidden">
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
              <button className="px-8 py-4 bg-navy hover:bg-navy/90 text-white font-semibold rounded-full transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

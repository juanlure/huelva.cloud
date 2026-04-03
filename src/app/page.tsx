import Link from 'next/link';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import Quiz from '@/components/quiz/Quiz';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, TrendingUp, CalendarDays, Star, Award, Sparkles, CloudSun, Newspaper, MapPin, Compass, BedDouble, Mail, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const articles = await getArticles();
  const comer = await getArticles('comer');
  const guias = await getArticles('guias');
  const eventos = await getArticles('eventos');
  const noticias = await getArticles('noticias');
  const alojarse = await getArticles('alojarse');

  const featuredArticle = guias[0] || comer[0] || eventos[0] || articles[0];
  const trendingArticles = [...guias.slice(1, 3), ...comer.slice(0, 2), ...eventos.slice(0, 2)].slice(0, 6);
  const gastronomyArticles = comer.slice(0, 3);
  const guidesArticles = guias.slice(0, 4);
  const eventsArticles = eventos.slice(0, 3);
  const newsArticles = noticias.slice(0, 3);
  const lodgingArticles = alojarse.slice(0, 3);

  const stats = {
    totalArticles: articles.length,
    totalImages: 43,
    categories: [...new Set(articles.map(a => a.category))].length,
    lastUpdated: articles[0]?.date || null,
  };

  return (
    <main className="w-full overflow-hidden">
      <HeroSection />

      <section className="relative py-10 bg-white border-b border-navy/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-[1.75rem] border border-white/70 bg-cream/90 backdrop-blur-xl p-6 shadow-[0_18px_60px_rgba(26,42,58,0.06)]">
              <p className="text-xs uppercase tracking-widest text-navy/40 font-semibold mb-2">Promesa</p>
              <h3 className="text-display text-2xl text-navy mb-2">Huelva sin folleto</h3>
              <p className="text-navy/60 text-sm leading-relaxed">Más criterio editorial, menos bloque genérico que podría pertenecer a cualquier ciudad.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/70 bg-white/90 backdrop-blur-xl p-6 shadow-[0_18px_60px_rgba(26,42,58,0.06)]">
              <p className="text-xs uppercase tracking-widest text-navy/40 font-semibold mb-2">Cobertura</p>
              <h3 className="text-display text-2xl text-navy mb-2">Capital + provincia</h3>
              <p className="text-navy/60 text-sm leading-relaxed">Costa, sierra, escapadas, agenda, gastronomía y utilidad real para moverse mejor.</p>
            </div>
            <div className="rounded-[1.75rem] border border-terracotta/20 bg-gradient-to-br from-terracotta to-orange-600 text-white p-6 shadow-[0_20px_70px_rgba(212,85,58,0.26)]">
              <p className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-2">Colaboraciones</p>
              <h3 className="text-display text-2xl mb-2">Publicidad con sentido</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-4">Marcas y negocios que quieran aparecer aquí: mejor bien integrados que cutres.</p>
              <Link href="mailto:jlromero@flowia.pro" className="inline-flex items-center gap-2 text-sm font-semibold">
                jlromero@flowia.pro <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="descubre" className="py-24 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-terracotta/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-navy/5 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Star size={20} className="text-terracotta" />
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Destacado</span>
            </div>

            <h2 className="text-display text-4xl md:text-5xl font-semibold text-navy mb-6">
              Huelva de verdad
            </h2>

            <p className="text-xl text-navy-60 max-w-2xl mb-16">
              La portada tiene que vender sensación de producto cuidado desde el primer scroll: editorial, local y con más intención visual.
            </p>

            {featuredArticle && (
              <div className="mb-16">
                <ArticleCard
                  {...featuredArticle}
                  imageUrl={featuredArticle.image}
                  author={{ name: featuredArticle.author }}
                  publishedAt={featuredArticle.publishedAtISO}
                  readTime={parseInt(featuredArticle.readTime)}
                  featured
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  imageUrl={article.image}
                  author={{ name: article.author }}
                  publishedAt={article.publishedAtISO}
                  readTime={parseInt(article.readTime)}
                />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-navy-60 hover:text-terracotta font-medium transition-colors group"
              >
                <span>Explorar todo el archivo ({stats.totalArticles})</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 right-0 w-[36rem] h-[36rem] bg-orange-100/50 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="grid lg:grid-cols-[1.05fr_1.95fr] gap-10 items-start">
              <div className="sticky top-28">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Award size={20} className="text-terracotta" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Gastronomía</span>
                </div>
                <h2 className="text-display text-4xl font-semibold text-navy mb-5">Comer en Huelva</h2>
                <p className="text-lg text-navy/60 mb-8">
                  Choco, coquinas, desayunos, tapeo y criterio. Si esta parte no abre el apetito, la home está fallando.
                </p>
                <Link href="/comer" className="inline-flex items-center gap-2 btn btn-primary">
                  Ver gastronomía <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {gastronomyArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    {...article}
                    imageUrl={article.image}
                    author={{ name: article.author }}
                    publishedAt={article.publishedAtISO}
                    readTime={parseInt(article.readTime)}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-[#fffdf9] to-sand/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 left-0 w-[30rem] h-[30rem] bg-sky-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="grid lg:grid-cols-[1.05fr_1.95fr] gap-10 items-start">
              <div className="sticky top-28">
                <div className="inline-flex items-center gap-3 mb-4">
                  <BedDouble size={20} className="text-sky-600" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Alojamiento</span>
                </div>
                <h2 className="text-display text-4xl font-semibold text-navy mb-5">Dormir bien también vende provincia</h2>
                <p className="text-lg text-navy/60 mb-8">
                  Hoteles, apartamentos y zonas con sentido. Esta parte puede captar intención comercial muy buena si se ve seria.
                </p>
                <Link href="/alojarse" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors shadow-[0_16px_40px_rgba(2,132,199,0.24)]">
                  Ver alojamientos <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {lodgingArticles.length > 0 ? lodgingArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    {...article}
                    imageUrl={article.image}
                    author={{ name: article.author }}
                    publishedAt={article.publishedAtISO}
                    readTime={parseInt(article.readTime)}
                    compact
                  />
                )) : (
                  <div className="md:col-span-2 xl:col-span-3 rounded-[2rem] border border-white/70 bg-white/85 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(26,42,58,0.06)]">
                    <p className="text-xs uppercase tracking-widest text-sky-600 font-semibold mb-3">Próxima capa</p>
                    <h3 className="text-display text-3xl text-navy mb-3">Aquí hay oportunidad clara</h3>
                    <p className="text-navy/60 max-w-2xl">
                      Falta volumen en alojamiento, pero visualmente ya lo dejamos preparado para que cuando entren piezas nuevas no parezca una categoría secundaria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="guias" className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid" />
        <div className="absolute -top-20 -right-10 w-[26rem] h-[26rem] bg-terracotta/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-white/6 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-widest mb-6 border border-white/10">
                <Sparkles size={16} />
                <span>Guías Locales</span>
              </div>

              <h2 className="text-display text-4xl md:text-5xl font-semibold mb-6">Explora la provincia con estilo</h2>
              <p className="text-xl text-white/65 max-w-2xl mx-auto">
                Menos tono institucional y más sensación editorial premium. Que den ganas de clicar aunque no hayas venido buscando nada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {guidesArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group relative overflow-hidden rounded-[1.75rem] bg-white/8 border border-white/10 hover:border-terracotta/50 transition-all duration-300 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${article.image})` }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-navy via-navy/45 to-transparent" />
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-white/45 text-xs uppercase tracking-widest mb-2">Guía local</p>
                    <h3 className="font-semibold text-white text-xl leading-tight group-hover:text-terracotta transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-5 gap-4">
              {[
                { href: '/alojarse', title: 'Dónde alojarse', copy: 'La base correcta cambia todo el viaje.' },
                { href: '/que-ver', title: 'Qué ver', copy: 'Qué sí compensa y qué relleno te puedes ahorrar.' },
                { href: '/playas', title: 'Playas', copy: 'Costa elegida por tipo de día, no por fama vacía.' },
                { href: '/donde-comer', title: 'Dónde comer', copy: 'Para filtrar mejor entre ruido y sitios que sí entregan.' },
                { href: '/fin-de-semana', title: 'Fin de semana', copy: 'Escapada de 48h con ritmo, criterio y cero checklist.' },
              ].map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-[1.5rem] border border-white/10 bg-white/6 backdrop-blur-sm p-5 text-left hover:border-terracotta/50 hover:bg-white/10 transition-all duration-300"
                >
                  <p className="text-[11px] uppercase tracking-widest text-white/45 mb-2">Flagship</p>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-terracotta transition-colors">{guide.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{guide.copy}</p>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/guias"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/16 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
              >
                <span>Ver todas las guías</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sand/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-[24rem] h-[24rem] bg-terracotta/8 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CalendarDays size={20} className="text-terracotta" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Agenda</span>
                </div>

                <h2 className="text-display text-4xl font-semibold text-navy mb-6">Eventos y planes</h2>
                <p className="text-xl text-navy-60 mb-8">
                  Tiene que sentirse como agenda viva: elegante, clara y con ganas de descubrir algo, no como un simple listado triste.
                </p>
                <Link href="/agenda" className="inline-flex items-center gap-2 btn btn-primary">
                  Ver agenda viva <ArrowRight size={18} />
                </Link>
              </div>

              <div className="space-y-4">
                {eventsArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/article/${article.slug}`}
                    className="block bg-white/82 backdrop-blur-xl rounded-[1.75rem] p-6 border border-white/70 hover:border-terracotta/30 shadow-[0_18px_60px_rgba(26,42,58,0.08)] transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-22 h-22 min-w-22 rounded-2xl bg-cover bg-center flex-shrink-0 shadow-md"
                        style={{ backgroundImage: `url(${article.image})`, width: 88, height: 88 }}
                      />
                      <div className="flex-1">
                        <p className="text-[11px] uppercase tracking-widest text-terracotta font-semibold mb-2">Evento</p>
                        <h3 className="font-semibold text-navy group-hover:text-terracotta transition-colors mb-2 text-lg leading-tight">
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

      <section className="py-24 bg-white border-t border-navy/5">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="grid lg:grid-cols-4 gap-6">
              <Link href="/agenda" className="group rounded-[2rem] border border-white/70 bg-cream/90 backdrop-blur-xl p-8 hover:border-terracotta/40 hover:shadow-[0_24px_80px_rgba(26,42,58,0.12)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta/10 text-terracotta mb-5">
                  <CalendarDays size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold text-navy mb-3 group-hover:text-terracotta transition-colors">Agenda al día</h2>
                <p className="text-navy/60 mb-5">Hoy, esta semana y este finde. Acceso rápido, limpio y premium.</p>
                <span className="inline-flex items-center gap-2 text-terracotta font-semibold">Abrir agenda <ArrowRight size={18} /></span>
              </Link>

              <Link href="/tiempo" className="group rounded-[2rem] border border-white/70 bg-white/90 backdrop-blur-xl p-8 hover:border-sky-400/40 hover:shadow-[0_24px_80px_rgba(26,42,58,0.12)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 text-sky-600 mb-5">
                  <CloudSun size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold text-navy mb-3">Tiempo útil</h2>
                <p className="text-navy/60 mb-5">Para playa, sierra o paseo. Mejor decisión, mejor UX.</p>
                <span className="inline-flex items-center gap-2 text-sky-600 font-semibold">Ver previsión <ArrowRight size={18} /></span>
              </Link>

              <Link href="/noticias" className="group rounded-[2rem] border border-white/70 bg-sand/60 backdrop-blur-xl p-8 hover:border-navy/20 hover:shadow-[0_24px_80px_rgba(26,42,58,0.12)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy/10 text-navy mb-5">
                  <Newspaper size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold text-navy mb-3">Noticias locales</h2>
                <p className="text-navy/60 mb-5">Actualidad provincial tratada con cara de medio serio, no de feed improvisado.</p>
                <span className="inline-flex items-center gap-2 text-navy font-semibold">Ir a noticias <ArrowRight size={18} /></span>
              </Link>

              <Link href="mailto:jlromero@flowia.pro" className="group rounded-[2rem] border border-terracotta/15 bg-gradient-to-br from-terracotta to-orange-600 p-8 text-white hover:shadow-[0_24px_80px_rgba(212,85,58,0.28)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/14 text-white mb-5">
                  <Mail size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold mb-3">Publicidad y marcas</h2>
                <p className="text-white/82 mb-5">Si alguien quiere visibilidad en Huelva, mejor una integración cuidada que un parche feo.</p>
                <span className="inline-flex items-center gap-2 text-white font-semibold">Contactar <ArrowRight size={18} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {newsArticles.length > 0 && (
        <section className="py-24 bg-sand/30">
          <div className="container">
            <div className="max-w-content mx-auto">
              <div className="flex items-center justify-between mb-12 gap-6 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp size={20} className="text-terracotta" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Actualidad</span>
                  </div>
                  <h2 className="text-display text-4xl font-semibold text-navy">Radar local</h2>
                  <p className="text-navy/60 mt-3 max-w-2xl">
                    La parte informativa también tiene que verse premium: limpia, visible y con sensación de medio cuidado.
                  </p>
                </div>
                <Link href="/noticias" className="inline-flex items-center gap-2 text-terracotta font-semibold hover:gap-3 transition-all">
                  Ver noticias <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    {...article}
                    imageUrl={article.image}
                    author={{ name: article.author }}
                    publishedAt={article.publishedAtISO}
                    readTime={parseInt(article.readTime)}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-navy/10 bg-cream/80 mb-5">
                <Compass size={16} className="text-terracotta" />
                <span className="text-xs font-semibold uppercase tracking-widest text-navy/50">Interactivo</span>
              </div>
              <h2 className="text-display text-4xl font-semibold text-navy mb-4">¿Eres Choquero o Guiri?</h2>
              <p className="text-navy-60 text-lg">Un bloque juguetón, pero presentado con más mimo que antes.</p>
            </div>
            <Quiz />
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 rounded-[1.75rem] border border-white/10 bg-white/5">
                <p className="text-5xl font-bold text-terracotta mb-2">{stats.totalArticles}</p>
                <p className="text-white/60">Artículos publicados</p>
              </div>
              <div className="p-6 rounded-[1.75rem] border border-white/10 bg-white/5">
                <p className="text-5xl font-bold text-terracotta mb-2">{stats.totalImages}</p>
                <p className="text-white/60">Imágenes</p>
              </div>
              <div className="p-6 rounded-[1.75rem] border border-white/10 bg-white/5">
                <p className="text-5xl font-bold text-terracotta mb-2">{stats.categories}</p>
                <p className="text-white/60">Categorías</p>
              </div>
              <div className="p-6 rounded-[1.75rem] border border-white/10 bg-white/5">
                <p className="text-5xl font-bold text-terracotta mb-2">∞</p>
                <p className="text-white/60">Chocos fritos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-terracotta text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute -top-16 right-0 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <div className="max-w-content mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
              <MapPin size={16} />
              <span className="text-xs font-semibold uppercase tracking-widest">Comunidad local</span>
            </div>
            <h2 className="text-display text-3xl md:text-4xl font-semibold mb-4">Únete a la comunidad</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Remate más limpio, más editorial y más premium. El cierre también importa.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
              <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5">
                <div className="inline-flex items-center gap-2 mb-3 text-white/85 font-semibold"><CheckCircle2 size={16} /> Guías útiles</div>
                <p className="text-white/70 text-sm">Rutas, barrios, sitios donde comer y planes que sí merecen clic.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5">
                <div className="inline-flex items-center gap-2 mb-3 text-white/85 font-semibold"><CheckCircle2 size={16} /> Agenda viva</div>
                <p className="text-white/70 text-sm">Selección con más criterio y menos relleno.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5">
                <div className="inline-flex items-center gap-2 mb-3 text-white/85 font-semibold"><CheckCircle2 size={16} /> Noticias locales</div>
                <p className="text-white/70 text-sm">Actualidad con cara de producto serio.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 rounded-full text-navy focus:outline-none focus:ring-4 focus:ring-white/30 bg-white shadow-lg"
              />
              <button className="px-8 py-4 bg-navy hover:bg-navy/90 text-white font-semibold rounded-full transition-colors shadow-lg">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import Quiz from '@/components/quiz/Quiz';
import HeroSection from '@/components/HeroSection';
import CommercialLink from '@/components/CommercialLink';
import { ArrowRight, TrendingUp, CalendarDays, Star, Award, Sparkles, CloudSun, Newspaper, MapPin, Compass, BedDouble, Mail, CheckCircle2 } from 'lucide-react';

export const revalidate = 300;

export default async function Home() {
  const articles = await getArticles();
  const comer = await getArticles('comer');
  const guias = await getArticles('guias');
  const eventos = await getArticles('eventos');
  const noticias = await getArticles('noticias');
  const alojarse = await getArticles('alojarse');

  const featuredArticle = noticias[0] || guias[0] || comer[0] || eventos[0] || articles[0];
  const trendingArticles = [...noticias.slice(1, 3), ...guias.slice(0, 2), ...comer.slice(0, 2)].slice(0, 6);
  const gastronomyArticles = comer.slice(0, 3);
  const guidesArticles = guias.slice(0, 4);
  const eventsArticles = eventos.slice(0, 3);
  const newsArticles = noticias.slice(0, 4);
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

      <section className="relative py-8 md:py-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,252,247,0.92))] border-b border-navy/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,85,58,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(15,26,36,0.04),transparent_24%)]" />
        <div className="container relative z-10">
          <div className="grid xl:grid-cols-[1.45fr_0.95fr] gap-4 mb-4">
            <div className="rounded-[1.9rem] border border-white/70 bg-white/90 backdrop-blur-xl p-6 md:p-7 shadow-[0_18px_60px_rgba(26,42,58,0.06)]">
              <p className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-3">Empieza por aquí</p>
              <h2 className="text-display text-3xl md:text-4xl text-navy mb-4">Empieza por el centro, come bien y no pierdas medio viaje en relleno.</h2>
              <p className="text-navy/65 text-base leading-relaxed max-w-3xl mb-6">
                Si vienes por primera vez, la jugada sensata es simple: quédate con lo que sí compensa ver, reserva una mesa que no falle y ordena el fin de semana sin improvisar como un guiri castigado.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { href: '/que-ver', title: 'Qué ver', copy: 'La guía madre para separar lo que sí compensa del relleno.', eyebrow: 'Primera visita' },
                  { href: '/donde-comer', title: 'Dónde comer', copy: 'Donde más fácil se convierte intención en plan real y mesa reservable.', eyebrow: 'Decisión rápida' },
                  { href: '/fin-de-semana', title: 'Fin de semana', copy: 'La forma más útil de ordenar 24-48 horas sin checklist torpe.', eyebrow: 'Escapada' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[1.5rem] border border-navy/8 bg-cream/70 p-5 hover:border-terracotta/30 hover:bg-white transition-all"
                  >
                    <p className="text-[11px] uppercase tracking-widest text-navy/40 font-semibold mb-2">{item.eyebrow}</p>
                    <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-terracotta transition-colors">{item.title}</h3>
                    <p className="text-sm text-navy/60 leading-relaxed">{item.copy}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-terracotta/20 bg-gradient-to-br from-terracotta to-orange-600 text-white p-6 shadow-[0_20px_70px_rgba(212,85,58,0.26)]">
              <p className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-2">Negocio local</p>
              <h3 className="text-display text-2xl mb-3">Publicidad con sentido</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-5">Negocios, marcas y eventos con encaje local. Mejor integrados con criterio que puestos ahí a martillazos.</p>
              <ul className="space-y-2 text-sm text-white/82 mb-5">
                <li>• Visibilidad editorial</li>
                <li>• Campañas y eventos</li>
                <li>• Contacto directo y claro</li>
              </ul>
              <CommercialLink surface="home_top_collab" href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold">
                Ver opciones <ArrowRight size={16} />
              </CommercialLink>
            </div>
          </div>
        </div>
      </section>

      <section id="descubre" className="py-16 md:py-24 bg-[linear-gradient(180deg,#fffdf9_0%,#faf6ef_100%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.16]" />
        <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-terracotta/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-navy/5 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Star size={20} className="text-terracotta" />
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Destacado</span>
            </div>

            <h2 className="text-display text-3xl md:text-5xl font-semibold text-navy mb-5 md:mb-6">
              Lo que más sentido tiene ver ahora en Huelva
            </h2>

            <p className="text-base md:text-xl text-navy-60 max-w-2xl mb-10 md:mb-16">
              Una portada para decidir rápido: qué merece atención hoy y qué piezas te ahorran vueltas tontas al planear Huelva.
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
                <span>Explorar Huelva.cloud ({stats.totalArticles})</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,252,248,0.86))] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 right-0 w-[36rem] h-[36rem] bg-orange-100/50 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="grid lg:grid-cols-[1.05fr_1.95fr] gap-10 items-start">
              <div className="lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Award size={20} className="text-terracotta" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Gastronomía</span>
                </div>
                <h2 className="text-display text-4xl font-semibold text-navy mb-5">Dónde comer sin caer en lo obvio</h2>
                <p className="text-lg text-navy/60 mb-8">
                  Aquí no venimos a hablar de comida en abstracto: venimos a decidir dónde desayunar, dónde tapear y en qué mesa sí compensa sentarse.
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

      <section className="py-16 md:py-24 bg-[linear-gradient(180deg,#fffdf9_0%,rgba(245,238,227,0.84)_100%)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 left-0 w-[30rem] h-[30rem] bg-sky-200/20 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="grid lg:grid-cols-[1.05fr_1.95fr] gap-10 items-start">
              <div className="lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-3 mb-4">
                  <BedDouble size={20} className="text-sky-600" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy-40">Alojamiento</span>
                </div>
                <h2 className="text-display text-4xl font-semibold text-navy mb-5">Dónde alojarse sin fastidiarte el viaje</h2>
                <p className="text-lg text-navy/60 mb-8">
                  Hoteles, apartamentos y zonas con sentido. Aquí la clave no es la foto de la habitación, sino dormir donde el plan te salga fácil.
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

      <section id="guias" className="py-16 md:py-24 bg-[linear-gradient(180deg,#172635_0%,#0f1822_100%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-grid" />
        <div className="absolute -top-20 -right-10 w-[26rem] h-[26rem] bg-terracotta/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-white/6 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-widest mb-6 border border-white/10">
                <Sparkles size={16} />
                <span>Guías Locales</span>
              </div>

              <h2 className="text-display text-4xl md:text-5xl font-semibold mb-6">Las guías que de verdad sostienen el producto</h2>
              <p className="text-xl text-white/65 max-w-2xl mx-auto">
                Estas son las piezas que más ayudan a decidir viaje, comida y plan. Si están finas, empujan negocio e indexación; si flojean, arrastran al resto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {guidesArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group relative overflow-hidden rounded-[1.9rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.05))] border border-white/10 hover:border-terracotta/50 transition-all duration-300 shadow-[0_20px_70px_rgba(0,0,0,0.20)] backdrop-blur-sm"
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

      <section className="py-16 md:py-24 bg-sand/50 relative overflow-hidden">
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

                <h2 className="text-display text-4xl font-semibold text-navy mb-6">Agenda con pulso</h2>
                <p className="text-xl text-navy-60 mb-8">
                  Hoy, esta semana y este finde. No para rellenar, sino para que alguien encuentre plan sin tener que abrir diez pestañas.
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

      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="container">
          <div className="max-w-content mx-auto">
            <div className="grid lg:grid-cols-4 gap-6">
              <Link href="/agenda" className="group rounded-[2rem] border border-white/70 bg-cream/90 backdrop-blur-xl p-8 hover:border-terracotta/40 hover:shadow-[0_24px_80px_rgba(26,42,58,0.12)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta/10 text-terracotta mb-5">
                  <CalendarDays size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold text-navy mb-3 group-hover:text-terracotta transition-colors">Agenda al día</h2>
                <p className="text-navy/60 mb-5">La puerta rápida para quien quiere plan ya, sin dar vueltas tontas.</p>
                <span className="inline-flex items-center gap-2 text-terracotta font-semibold">Abrir agenda <ArrowRight size={18} /></span>
              </Link>

              <Link href="/tiempo" className="group rounded-[2rem] border border-white/70 bg-white/90 backdrop-blur-xl p-8 hover:border-sky-400/40 hover:shadow-[0_24px_80px_rgba(26,42,58,0.12)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 text-sky-600 mb-5">
                  <CloudSun size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold text-navy mb-3">Tiempo útil</h2>
                <p className="text-navy/60 mb-5">Para decidir playa, sierra o paseo con algo más de cabeza.</p>
                <span className="inline-flex items-center gap-2 text-sky-600 font-semibold">Ver previsión <ArrowRight size={18} /></span>
              </Link>

              <Link href="/noticias" className="group rounded-[2rem] border border-white/70 bg-sand/60 backdrop-blur-xl p-8 hover:border-navy/20 hover:shadow-[0_24px_80px_rgba(26,42,58,0.12)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy/10 text-navy mb-5">
                  <Newspaper size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold text-navy mb-3">Noticias locales</h2>
                <p className="text-navy/60 mb-5">Actualidad provincial presentada como medio cuidado, no como feed montado con prisa.</p>
                <span className="inline-flex items-center gap-2 text-navy font-semibold">Ir a noticias <ArrowRight size={18} /></span>
              </Link>

              <CommercialLink surface="home_contact_card" href="/contact" className="group rounded-[2rem] border border-terracotta/15 bg-gradient-to-br from-terracotta to-orange-600 p-8 text-white hover:shadow-[0_24px_80px_rgba(212,85,58,0.28)] transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/14 text-white mb-5">
                  <Mail size={22} />
                </div>
                <h2 className="text-display text-2xl font-semibold mb-3">Publicidad y marcas</h2>
                <p className="text-white/82 mb-5">Si alguien quiere visibilidad en Huelva, aquí ya hay una puerta clara para hacerlo sin ensuciar el producto.</p>
                <span className="inline-flex items-center gap-2 text-white font-semibold">Contactar <ArrowRight size={18} /></span>
              </CommercialLink>
            </div>
          </div>
        </div>
      </section>

      {newsArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-sand/30">
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
                    Noticias visibles y bien empaquetadas para que la home también respire actualidad, no solo guías evergreen.
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

      <section className="py-16 md:py-24 bg-white">
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

      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
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

      <section className="py-16 md:py-24 bg-terracotta text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute -top-16 right-0 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <div className="max-w-content mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
              <MapPin size={16} />
              <span className="text-xs font-semibold uppercase tracking-widest">Negocio local</span>
            </div>
            <h2 className="text-display text-3xl md:text-4xl font-semibold mb-4">¿Quieres visibilidad en Huelva?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Si tienes un negocio, una marca o un evento y quieres aparecer aquí con criterio, ya hay una vía clara para hacerlo.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
              <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5">
                <div className="inline-flex items-center gap-2 mb-3 text-white/85 font-semibold"><CheckCircle2 size={16} /> Presencia editorial</div>
                <p className="text-white/70 text-sm">Mejor una integración útil y bien contada que un banner triste sin contexto.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5">
                <div className="inline-flex items-center gap-2 mb-3 text-white/85 font-semibold"><CheckCircle2 size={16} /> Eventos y campañas</div>
                <p className="text-white/70 text-sm">Lanzamientos, acciones de temporada y planes que sí merecen atención.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5">
                <div className="inline-flex items-center gap-2 mb-3 text-white/85 font-semibold"><CheckCircle2 size={16} /> Contacto directo</div>
                <p className="text-white/70 text-sm">Una página clara para explicar qué ofreces, a quién vas y qué quieres mover.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto justify-center">
              <CommercialLink
                surface="home_bottom_contact"
                href="/contact"
                className="px-8 py-4 bg-navy hover:bg-navy/90 text-white font-semibold rounded-full transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                Ver contacto y colaboraciones
                <ArrowRight size={18} />
              </CommercialLink>
              <Link
                href="/sobre-nosotros"
                className="px-8 py-4 bg-white/12 hover:bg-white/18 text-white font-semibold rounded-full transition-colors shadow-lg inline-flex items-center justify-center gap-2 border border-white/20"
              >
                Ver quién está detrás
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

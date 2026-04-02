import Link from 'next/link';
import { CalendarDays, ArrowRight, Clock, MapPin, Sparkles, TrendingUp, Compass } from 'lucide-react';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda de Huelva | Qué hacer hoy, esta semana y este finde',
  description: 'Agenda viva de Huelva: qué hacer hoy, este fin de semana y en los próximos días. Planes, cultura, escapadas y eventos en capital y provincia.',
  alternates: {
    canonical: 'https://huelva.cloud/agenda',
  },
};

const quickSections = [
  {
    title: 'Hoy en Huelva',
    description: 'Lo útil si sales esta tarde: cultura, paseo, tapeo y plan sin comerte la cabeza.',
    icon: <Clock size={18} />,
  },
  {
    title: 'Fin de semana',
    description: 'Selección de planes para capital, costa y sierra. Menos ruido, más plan real.',
    icon: <CalendarDays size={18} />,
  },
  {
    title: 'Capital + provincia',
    description: 'No todo pasa en el centro. Ayamonte, Aracena, Punta Umbría o El Rocío también cuentan.',
    icon: <MapPin size={18} />,
  },
];

export default async function AgendaPage() {
  const eventos = await getArticles('eventos');
  const noticias = await getArticles('noticias');
  const guides = await getArticles('guias');

  const destacados = eventos.slice(0, 6);
  const destacadoHero = destacados[0];
  const destacadosGrid = destacados.slice(1);
  const radar = [...noticias.slice(0, 2), ...guides.slice(0, 2)];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffdf9] via-white to-sand/30 pt-28 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[34rem] h-[34rem] bg-terracotta/8 rounded-full blur-3xl" />
        <div className="absolute top-[18rem] right-0 w-[30rem] h-[30rem] bg-sky-500/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-content mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-terracotta border border-terracotta/15 mb-6 shadow-sm">
              <Sparkles size={16} />
              <span className="text-sm font-semibold uppercase tracking-widest">Agenda viva</span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-navy mb-5 leading-[0.98]">
              Qué hacer en Huelva,
              <span className="text-terracotta italic"> sin perder el tiempo</span>
            </h1>

            <p className="text-lg md:text-xl text-navy/65 max-w-3xl leading-relaxed mb-10">
              Planes, escapadas, cultura y contexto útil para decidir rápido. Una agenda con cara de producto serio, no un tablón triste con cuatro enlaces sueltos.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {quickSections.map((item) => (
                <div key={item.title} className="bg-white/78 backdrop-blur-xl rounded-[1.75rem] border border-white/70 p-6 shadow-[0_18px_60px_rgba(26,42,58,0.08)]">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-terracotta/10 text-terracotta mb-4">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-navy mb-2">{item.title}</h2>
                  <p className="text-sm text-navy/60 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {destacadoHero && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8 gap-6 flex-wrap">
                <div>
                  <p className="text-xs uppercase tracking-widest text-navy/40 font-semibold mb-2">Destacado</p>
                  <h2 className="text-display text-3xl md:text-4xl text-navy font-semibold">El plan que abre la agenda</h2>
                </div>
                <Link href="/eventos" className="inline-flex items-center gap-2 text-terracotta font-semibold hover:gap-3 transition-all">
                  Ver eventos
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
                <ArticleCard
                  {...destacadoHero}
                  imageUrl={destacadoHero.image}
                  author={{ name: destacadoHero.author }}
                  publishedAt={destacadoHero.publishedAtISO}
                  readTime={parseInt(destacadoHero.readTime)}
                  featured
                />

                <div className="rounded-[2rem] border border-white/70 bg-navy text-white p-8 shadow-[0_24px_80px_rgba(26,42,58,0.18)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  <div className="absolute -top-10 right-0 w-44 h-44 rounded-full bg-terracotta/20 blur-3xl" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 mb-5 text-xs uppercase tracking-widest font-semibold">
                      <CalendarDays size={14} />
                      Agenda con criterio
                    </div>
                    <h3 className="text-display text-3xl font-semibold mb-4">Menos morralla. Más plan bueno.</h3>
                    <p className="text-white/70 leading-relaxed mb-8">
                      El objetivo no es listar todo. Es ayudarte a elegir rápido qué merece salir de casa en capital, costa o sierra.
                    </p>
                    <div className="space-y-4 text-sm text-white/80">
                      <div className="flex items-start gap-3">
                        <Clock size={16} className="mt-0.5 text-terracotta" />
                        <span>Lectura rápida para decidir hoy mismo.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="mt-0.5 text-terracotta" />
                        <span>Capital y provincia, no solo el centro de Huelva.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Compass size={16} className="mt-0.5 text-terracotta" />
                        <span>Contexto editorial para que el plan no dependa del azar.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {destacadosGrid.length > 0 && (
            <section className="mb-20">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {destacadosGrid.map((article) => (
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
            </section>
          )}

          <section className="rounded-[2rem] border border-white/70 bg-white/72 backdrop-blur-xl p-8 md:p-10 shadow-[0_24px_80px_rgba(26,42,58,0.08)] mb-20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={20} className="text-terracotta" />
              <h2 className="text-display text-3xl text-navy font-semibold">Radar local</h2>
            </div>
            <p className="text-navy/60 mb-8 max-w-2xl">
              La agenda mejora cuando mezcla actualidad, guías y señales útiles. No todo empieza y termina en un cartel de evento.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {radar.map((article) => (
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
          </section>

          <section className="bg-gradient-to-r from-terracotta via-orange-500 to-orange-600 rounded-[2rem] p-8 md:p-12 text-white shadow-[0_24px_80px_rgba(212,85,58,0.28)] border border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-3">Siguiente capa</p>
                <h2 className="text-display text-3xl md:text-4xl font-semibold mb-4">La agenda ya parece una agenda seria.</h2>
                <p className="text-white/85 text-lg leading-relaxed">
                  Ahora toca alimentarla con más piezas vivas y recurrentes para que además de verse bien, domine utilidad y SEO local.
                </p>
              </div>
              <Link href="/guias" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-terracotta font-semibold hover:bg-cream transition-colors whitespace-nowrap">
                Ver guías útiles
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

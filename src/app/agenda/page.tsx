import Link from 'next/link';
import { CalendarDays, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
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
  const radar = [...noticias.slice(0, 2), ...guides.slice(0, 2)];

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream via-white to-sand/30 pt-28 pb-20">
      <div className="container">
        <div className="max-w-content mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta border border-terracotta/20 mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-semibold uppercase tracking-widest">Agenda viva</span>
          </div>

          <h1 className="text-display text-5xl md:text-6xl font-semibold text-navy mb-5">
            Qué hacer en Huelva
            <span className="text-terracotta">.</span>
          </h1>

          <p className="text-lg md:text-xl text-navy/65 max-w-3xl leading-relaxed mb-10">
            Esta es la agenda útil: planes, escapadas, cultura y cosas que merecen mover el culo.
            Sin rellenar huecos con morralla.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {quickSections.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-navy/10 p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-terracotta/10 text-terracotta mb-4">
                  {item.icon}
                </div>
                <h2 className="text-xl font-semibold text-navy mb-2">{item.title}</h2>
                <p className="text-sm text-navy/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-navy/40 font-semibold mb-2">Destacados</p>
                <h2 className="text-display text-3xl text-navy font-semibold">Planes y eventos</h2>
              </div>
              <Link href="/eventos" className="inline-flex items-center gap-2 text-terracotta font-semibold hover:gap-3 transition-all">
                Ver eventos
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destacados.map((article) => (
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

          <section>
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays size={20} className="text-terracotta" />
              <h2 className="text-display text-3xl text-navy font-semibold">Radar local</h2>
            </div>
            <p className="text-navy/60 mb-8 max-w-2xl">
              Lo que empuja la agenda no es solo un concierto. También noticias, guías y contexto para decidir mejor tu plan.
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
        </div>
      </div>
    </main>
  );
}

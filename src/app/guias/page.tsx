import Link from 'next/link';
import {
  Compass,
  Clock,
  Users,
  MapPin,
  ArrowRight,
  Award,
  Coffee,
  Sparkles,
  Layers3,
  CalendarDays,
  CloudSun,
} from 'lucide-react';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';

const guides = [
  {
    href: '/alojarse',
    title: 'Dónde alojarse en Huelva',
    description: 'La flagship para elegir bien base, zona y tipo de estancia sin reservar a ciegas.',
    image: '/images/guides/huelva-aerea.jpg',
    icon: <MapPin size={28} />,
    badge: 'Flagship',
    color: 'from-sky-500 to-cyan-600',
    stats: 'Guía premium',
    group: 'flagship',
  },
  {
    href: '/que-ver',
    title: 'Qué ver en Huelva',
    description: 'Selección útil para separar lo que sí compensa de lo que solo rellena listas turísticas.',
    image: '/images/guides/huelva-muelle-tinto.jpg',
    icon: <Compass size={28} />,
    badge: 'Flagship',
    color: 'from-orange-500 to-terracotta',
    stats: 'Guía premium',
    group: 'flagship',
  },
  {
    href: '/playas',
    title: 'Playas de Huelva',
    description: 'Elige costa según el tipo de día que quieres tener, no por la playa más repetida.',
    image: '/images/guides/costa-huelva.jpg',
    icon: <MapPin size={28} />,
    badge: 'Flagship',
    color: 'from-blue-500 to-sky-600',
    stats: 'Guía premium',
    group: 'flagship',
  },
  {
    href: '/donde-comer',
    title: 'Dónde comer en Huelva',
    description: 'Para decidir con criterio entre comida resolutiva, producto, tapeo y sitios que sí compensan.',
    image: '/images/guides/choco-frito-hero.jpg',
    icon: <Coffee size={28} />,
    badge: 'Flagship',
    color: 'from-terracotta to-red-600',
    stats: 'Guía premium',
    group: 'flagship',
  },
  {
    href: '/fin-de-semana',
    title: 'Fin de semana en Huelva',
    description: 'Cómo montar una escapada de 48 horas con ritmo, criterio y cero sensación de checklist.',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    icon: <Clock size={28} />,
    badge: 'Flagship',
    color: 'from-purple-500 to-pink-600',
    stats: 'Guía premium',
    group: 'flagship',
  },
  {
    href: '/guias/supervivencia',
    title: 'Guía de Supervivencia',
    description: 'Transporte, horarios, slang y secretos locales para moverte por Huelva sin parecer turista.',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    icon: <Compass size={28} />,
    badge: 'Lo más leído',
    color: 'from-amber-500 to-orange-600',
    stats: '5 secciones',
    group: 'interactive',
  },
  {
    href: '/guias/48-horas',
    title: '48 Horas en Huelva',
    description: 'Itinerario personalizado: comida, cultura y costa. Elige tu vibe y descubre la ciudad.',
    image: '/images/guides/huelva-muelle-tinto.jpg',
    icon: <Clock size={28} />,
    badge: 'Itinerario',
    color: 'from-blue-500 to-cyan-600',
    stats: '4 vibes',
    group: 'interactive',
  },
  {
    href: '/guias/choco',
    title: 'Traductor de Choco',
    description: 'Aprende a pedir como un verdadero choquero. Vocabulario local con pronunciación.',
    image: '/images/guides/choco-frito-hero.jpg',
    icon: <Users size={28} />,
    badge: 'Interactivo',
    color: 'from-terracotta to-red-600',
    stats: '28 términos',
    group: 'interactive',
  },
  {
    href: '/guias/jamon',
    title: 'Traductor de Jamón',
    description: 'Bellota, Cebo de Campo, Cebo. Descubre las diferencias que marcan el precio y sabor.',
    image: '/images/guides/corte-jamon-iberico.jpg',
    icon: <Award size={28} />,
    badge: 'Premium',
    color: 'from-amber-600 to-yellow-600',
    stats: '4 categorías',
    group: 'interactive',
  },
  {
    href: '/guias/cafe',
    title: 'Traductor de Café',
    description: 'Solo, Cortado, Mitad, Manchado, Sombra, Nube. Los ratios sagrados del café onubense.',
    image: '/images/guides/cafe-vaso-huelva.jpg',
    icon: <Coffee size={28} />,
    badge: 'Nuevo',
    color: 'from-stone-600 to-stone-800',
    stats: '9 tipos',
    group: 'interactive',
  },
  {
    href: '/guias/barrios',
    title: 'Barrios de Huelva',
    description: 'Centro, Reina Victoria, Paseo de la Cinta y más. Lo útil para entender dónde ir y por qué.',
    image: '/images/guides/huelva-aerea.jpg',
    icon: <MapPin size={28} />,
    badge: 'Interactivo',
    color: 'from-purple-500 to-pink-600',
    stats: '6 barrios',
    group: 'interactive',
  },
  {
    href: '/agenda',
    title: 'Agenda al día',
    description: 'La puerta rápida para saber qué hacer hoy, esta semana y este finde sin perder tiempo.',
    image: '/images/guides/feria-huelva.jpg',
    icon: <CalendarDays size={28} />,
    badge: 'Nueva',
    color: 'from-emerald-500 to-teal-600',
    stats: 'Actualizada',
    group: 'utility',
  },
  {
    href: '/tiempo',
    title: 'Tiempo útil',
    description: 'Antes de playa, sierra o paseo, mira el clima. Más práctico que improvisar con viento de levante.',
    image: '/images/guides/costa-huelva.jpg',
    icon: <CloudSun size={28} />,
    badge: 'Servicio',
    color: 'from-sky-500 to-blue-600',
    stats: '7 días',
    group: 'utility',
  },
];

const flagshipGuides = guides.filter((guide) => guide.group === 'flagship');
const interactiveGuides = guides.filter((guide) => guide.group === 'interactive');
const utilityGuides = guides.filter((guide) => guide.group === 'utility');

function GuideGrid({ items }: { items: typeof guides }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      {items.map((guide) => (
        <Link key={guide.href} href={guide.href} className="group">
          <article className="relative h-full overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,252,248,0.88))] backdrop-blur-md shadow-[0_20px_70px_rgba(26,42,58,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-terracotta/35 hover:shadow-[0_28px_90px_rgba(26,42,58,0.14)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,85,58,0.10),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.20),transparent_46%)]" />

            <div className="relative aspect-[4/3] overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${guide.image})` }}
              >
                <div className="w-full h-full bg-gradient-to-t from-navy/88 via-navy/34 to-transparent" />
              </div>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-white/60 bg-white/88 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy shadow-sm backdrop-blur-sm">
                  {guide.badge}
                </span>
              </div>

              <div className={`absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-gradient-to-br text-white shadow-[0_16px_40px_rgba(26,42,58,0.24)] ${guide.color}`}>
                {guide.icon}
              </div>
            </div>

            <div className="relative flex h-[calc(100%-0px)] flex-col p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/45">
                  {guide.stats}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                  Explorar
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>

              <h3 className="text-display text-[1.65rem] leading-[1.02] tracking-[-0.02em] text-navy transition-colors duration-300 group-hover:text-terracotta">
                {guide.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-navy/65">
                {guide.description}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

async function DynamicGuidesGrid() {
  const articles = await getArticles('guias');

  if (articles.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, idx) => (
        <ArticleCard
          key={idx}
          {...article}
          imageUrl={article.image}
          publishedAt={article.publishedAtISO}
          readTime={parseInt(article.readTime)}
          author={{ name: article.author }}
        />
      ))}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  icon,
}: {
  eyebrow: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/15 bg-terracotta/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
          {icon}
          {eyebrow}
        </div>
        <div className="space-y-3">
          <h2 className="text-display text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-navy leading-none">
            {title}
          </h2>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-navy/65">{body}</p>
        </div>
      </div>
    </div>
  );
}

export default async function GuidesPage() {
  return (
    <main className="premium-guide-shell overflow-hidden">
      <section className="premium-guide-section relative pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,85,58,0.12),transparent_22%),radial-gradient(circle_at_85%_10%,rgba(26,42,58,0.08),transparent_22%)]" />
        </div>

        <div className="premium-guide-container relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="premium-guide-panel premium-guide-panel--hero premium-guide-stack-lg">
              <p className="premium-guide-eyebrow">Sistema editorial premium</p>
              <div className="premium-guide-stack-md">
                <h1 className="premium-guide-h1">Las guías que sí te ayudan a decidir en Huelva.</h1>
                <p className="premium-guide-lead max-w-[58ch]">
                  Aquí no hay relleno turístico ni listas por cumplir expediente. Primero van las páginas que resuelven decisiones reales. Después, las piezas interactivas y utilidades que completan el viaje.
                </p>
              </div>

              <div className="premium-guide-facts">
                <div className="premium-guide-fact">
                  <span className="premium-guide-label">Núcleo</span>
                  <strong className="premium-guide-fact__value">5 flagships premium</strong>
                </div>
                <div className="premium-guide-fact">
                  <span className="premium-guide-label">Capas</span>
                  <strong className="premium-guide-fact__value">Decisión, contexto y utilidad</strong>
                </div>
                <div className="premium-guide-fact">
                  <span className="premium-guide-label">Objetivo</span>
                  <strong className="premium-guide-fact__value">Menos ruido, mejores planes</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="#flagships" className="btn btn-primary btn-lg">
                  Ver guías principales
                </Link>
                <Link href="#interactivas" className="btn btn-outline btn-lg">
                  Abrir interactivas
                </Link>
              </div>
            </div>

            <div className="premium-guide-panel premium-guide-panel--hero-aside premium-guide-stack-md">
              <p className="premium-guide-label">Cómo usar este hub</p>
              <div className="space-y-4">
                {[
                  'Si vienes de fuera, empieza por alojarse, qué ver o fin de semana.',
                  'Si ya tienes plan base, usa playas o dónde comer para afinar.',
                  'Si quieres contexto local, traductores, barrios o supervivencia.',
                  'Si estás a punto de salir, remata con agenda y tiempo útil.',
                ].map((item) => (
                  <div key={item} className="premium-guide-meta-block premium-guide-meta-block--verdict">
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="flagships" className="premium-guide-section premium-guide-section--tight">
        <div className="premium-guide-container">
          <SectionIntro
            eyebrow="Primero lo importante"
            title="Las 5 decisiones fuertes del viaje"
            body="Estas son las páginas con más intención de uso y más valor editorial. Si quieres resolver algo de verdad, empieza aquí."
            icon={<Sparkles size={14} />}
          />
          <GuideGrid items={flagshipGuides} />
        </div>
      </section>

      <section id="interactivas" className="premium-guide-section premium-guide-section--contrast">
        <div className="premium-guide-container">
          <SectionIntro
            eyebrow="Capas útiles"
            title="Guías interactivas y contexto local"
            body="Cuando ya tienes el viaje medio armado, estas piezas te dan matiz, personalidad y alguna ventaja práctica para no moverte como un guiri despistado."
            icon={<Layers3 size={14} />}
          />
          <GuideGrid items={interactiveGuides} />
        </div>
      </section>

      <section className="premium-guide-section premium-guide-section--tight">
        <div className="premium-guide-container">
          <SectionIntro
            eyebrow="Último filtro"
            title="Utilidades para decidir en tiempo real"
            body="Agenda y tiempo no son relleno: son las dos herramientas que evitan un mal plan por llegar tarde o elegir mal el día."
            icon={<CalendarDays size={14} />}
          />
          <div className="grid md:grid-cols-2 gap-8">
            <GuideGrid items={utilityGuides} />
          </div>
        </div>
      </section>

      <section className="premium-guide-section premium-guide-section--contrast">
        <div className="premium-guide-container">
          <SectionIntro
            eyebrow="Archivo vivo"
            title="Más guías locales y piezas editoriales"
            body="Aquí vive el contenido más clásico del proyecto: artículos, recomendaciones y piezas de apoyo que siguen aportando contexto y búsquedas long-tail."
            icon={<Compass size={14} />}
          />
          <DynamicGuidesGrid />
        </div>
      </section>

      <section className="premium-guide-section premium-guide-section--tight">
        <div className="premium-guide-container premium-guide-reading-width">
          <div className="premium-guide-cta premium-guide-stack-md">
            <p className="premium-guide-eyebrow">Si no sabes por dónde entrar</p>
            <h2 className="premium-guide-h2">Empieza por fin de semana o por qué ver. No falla.</h2>
            <p className="premium-guide-body premium-guide-body--strong">
              Son las dos puertas más útiles para la mayoría: una te ordena la escapada completa y la otra te evita perder tiempo en paradas flojas.
            </p>
            <div className="premium-guide-cta__actions">
              <Link href="/fin-de-semana" className="btn btn-primary btn-lg">
                Abrir fin de semana
              </Link>
              <Link href="/que-ver" className="btn btn-outline btn-lg">
                Ver qué compensa visitar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

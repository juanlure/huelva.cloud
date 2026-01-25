import Link from 'next/link';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import Quiz from '@/components/quiz/Quiz';
import { ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const articles = await getArticles();

  // Separate featured from regular articles
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1, 7);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#E07A5F15_0%,transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div> {/* Note: Using layout wrapper for future animations if needed */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-bold text-navy/60 mb-6 uppercase tracking-widest">
                <Sparkles size={14} className="text-terracotta" />
                <span>La guía más honesta de Huelva</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-navy mb-8 tracking-tight leading-[1.1] max-w-4xl">
                Huelva como <span className="text-terracotta">nunca</span> te la habían contado.
              </h1>

              <p className="text-lg md:text-xl text-navy/70 leading-relaxed mb-10 max-w-2xl">
                Sin rodeos, sin trampas para turistas. Solo lo mejor de nuestra tierra
                contado por gente que sabe lo que es un buen plato de chocos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#articulos" className="btn-primary text-center justify-center">
                  Empezar a leer
                </a>
                <a href="#test" className="px-8 py-4 rounded-full border border-navy/20 font-medium hover:bg-white transition-all text-center">
                  ¿Eres Choquero o Guiri?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section id="articulos" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-navy mb-4">Lo más fresco</h2>
              <p className="text-navy/60">Historias que no encontrarás en ningún otro sitio.</p>
            </div>
            <Link href="/noticias" className="hidden md:flex items-center text-terracotta font-bold hover:underline">
              Ver todo <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          {featuredArticle && (
            <div className="mb-12">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
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
        </div>
      </section>

      {/* Interactive Section */}
      <section id="test" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Quiz />
        </div>
      </section>

      {/* Categories / Start Here */}
      <section className="py-20 px-6 bg-sand/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-16">
            Empieza por aquí
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Gastronomía', icon: '🦐', desc: 'Gambas, jamón y dónde comer de verdad.', href: '/comer' },
              { title: 'Playas', icon: '🏖️', desc: 'Desde Punta Umbría hasta Isla Canela.', href: '/playas' },
              { title: 'Cultura', icon: '💃', desc: 'Nuestra historia, del Muelle a las Colombinas.', href: '/cultura' },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="p-8 bg-white rounded-3xl border border-navy/5 hover:shadow-xl transition-all group"
              >
                <span className="text-4xl mb-6 block">{cat.icon}</span>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-terracotta transition-colors">{cat.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

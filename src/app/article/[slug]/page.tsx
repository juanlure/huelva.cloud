import Link from 'next/link';
import React from 'react';
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AUTHORS } from '@/lib/authors';
import InteractiveContainer from '@/components/InteractiveContainer';
import AuthorBox from '@/components/AuthorBox';
import ArticleRenderer from '@/components/article/ArticleRenderer';
import { Clock, Share2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const authorData = AUTHORS[article.author] || AUTHORS['El Choco'];

  // --- Lógica de Extracción de Interactividad ---
  let interactiveType = null;
  let interactiveData = null;
  let cleanedContent = article.content || '';

  const typeMatch = cleanedContent.match(/<div id="interactive-root" data-component="([^"]+)"/);
  if (typeMatch) interactiveType = typeMatch[1];

  const dataMatch = cleanedContent.match(/<script type="application\/json" id="interactive-data">([\s\S]*?)<\/script>/);
  if (dataMatch) {
    try {
      interactiveData = JSON.parse(dataMatch[1]);
    } catch (e) {
      console.error("Error parsing interactive data:", e);
    }
  }

  if (interactiveType && interactiveData) {
    cleanedContent = cleanedContent
      .replace(/<div id="interactive-root"[^>]*><\/div>/g, '')
      .replace(/<script type="application\/json" id="interactive-data">[\s\S]*?<\/script>/g, '');
  }

  return (
    <main className="flex-1 bg-cream/30">
      <article className="relative">
        {/* Header Section */}
        <header className="relative h-[70vh] min-h-[500px] flex items-end pb-20 px-6">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${article.image || '/images/placeholder.jpg'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80 z-10" />

          <div className="max-w-4xl mx-auto w-full relative z-20 text-white">
            <Link
              href="/"
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Volver al inicio</span>
            </Link>

            <div className="flex items-center space-x-3 mb-6">
              <span className="px-3 py-1 bg-terracotta text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                {article.category}
              </span>
              {article.isAi && (
                <span className="text-xs font-semibold text-white/60 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
                  Curado con IA
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
              {article.title}
            </h1>

            <div className="flex items-center justify-between border-t border-white/10 pt-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold">{article.author}</p>
                  <div className="flex items-center text-xs text-white/60 space-x-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      <span>{article.readTime} lectura</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-2xl md:text-3xl font-display italic text-navy/80 mb-12 leading-relaxed border-l-4 border-terracotta pl-8">
            {article.excerpt}
          </p>

          <div className="prose prose-lg prose-navy max-w-none">
            {interactiveType && interactiveData && (
              <div className="my-12">
                <InteractiveContainer type={interactiveType} data={interactiveData} />
              </div>
            )}

            {cleanedContent && (
              <div className="editorial-content">
                <ArticleRenderer content={cleanedContent} />
              </div>
            )}
          </div>

          <div className="mt-20 pt-10 border-t border-navy/10">
            <AuthorBox author={authorData} />
          </div>
        </section>
      </article>
    </main>
  );
}

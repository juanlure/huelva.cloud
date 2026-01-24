import React from 'react';
import { GuideChapter } from '../../types/guide';
import ArticleRenderer from '../article/ArticleRenderer';
import PlaceCard from './PlaceCard';

interface GuideChapterRendererProps {
    chapter: GuideChapter;
    chapterIndex: number;
}

export default function GuideChapterRenderer({ chapter, chapterIndex }: GuideChapterRendererProps) {
    const chapterNumber = (chapterIndex + 1).toString().padStart(2, '0');

    return (
        <section id={`chapter-${chapter.id}`} className="py-12 md:py-16 border-b border-slate-100 last:border-0 relative">
            <div className="absolute left-0 top-16 hidden lg:block -translate-x-full pr-8">
                <span className="text-6xl font-black text-slate-100 font-serif rotate-90 origin-right inline-block">
                    {chapterNumber}
                </span>
            </div>

            <div className="mb-8">
                <span className="text-sm font-mono text-orange-600 font-bold tracking-widest uppercase mb-2 block">
                    Capítulo {chapterNumber}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                    {chapter.title}
                </h2>
                {chapter.summary && (
                    <p className="text-xl text-slate-500 font-light leading-relaxed mb-6">
                        {chapter.summary}
                    </p>
                )}

                <ArticleRenderer content={chapter.content} />
            </div>

            {chapter.places && chapter.places.length > 0 && (
                <div className="space-y-4 mt-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">
                        Recomendaciones en este capítulo
                    </h3>
                    {chapter.places.map((place, idx) => (
                        <PlaceCard key={place.id} place={place} index={idx} />
                    ))}
                </div>
            )}
        </section>
    );
}

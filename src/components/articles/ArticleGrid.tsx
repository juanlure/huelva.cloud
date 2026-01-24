'use client';

import React from 'react';
import ArticleCard from './ArticleCard';

interface Article {
    title: string;
    excerpt: string;
    category: string;
    imageUrl: string;
    author: {
        name: string;
        avatar?: string;
    };
    publishedAt: Date | string;
    readTime: number;
    slug: string;
}

interface ArticleGridProps {
    articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
            ))}
        </div>
    );
}

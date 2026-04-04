import { MetadataRoute } from 'next'
import { getArticles } from '@/lib/api'

function safeDate(value?: string | Date) {
  const date = value instanceof Date ? value : new Date(value || '');
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://huelva.cloud'
  const now = new Date()

  const articles = await getArticles()

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: safeDate(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categories = ['agenda', 'comer', 'eventos', 'alojarse', 'guias', 'noticias', 'tiempo']
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const flagshipGuideUrls = [
    { url: `${baseUrl}/que-ver`, priority: 0.9 },
    { url: `${baseUrl}/playas`, priority: 0.9 },
    { url: `${baseUrl}/donde-comer`, priority: 0.9 },
    { url: `${baseUrl}/fin-de-semana`, priority: 0.85 },
  ].map((item) => ({
    ...item,
    lastModified: now,
    changeFrequency: 'weekly' as const,
  }))

  const guideClusterUrls = [
    `${baseUrl}/guias/48-horas`,
    `${baseUrl}/guias/barrios`,
    `${baseUrl}/guias/cafe`,
    `${baseUrl}/guias/choco`,
    `${baseUrl}/guias/jamon`,
    `${baseUrl}/guias/supervivencia`,
  ].map((url) => ({
    url,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ai-disclosure`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ]

  return [...staticUrls, ...categoryUrls, ...flagshipGuideUrls, ...guideClusterUrls, ...articleUrls]
}

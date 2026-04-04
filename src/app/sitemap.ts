import { MetadataRoute } from 'next'
import { getArticles } from '@/lib/api'

function safeDate(value?: string | Date) {
  const date = value instanceof Date ? value : new Date(value || '')
  return Number.isNaN(date.getTime()) ? new Date() : date
}

function inferArticlePriority(slug: string, category: string) {
  if (
    slug === 'plaza-monjas-huelva-guia-completa' ||
    slug === 'coquinas-huelva-como-comer' ||
    slug === 'cafe-huelva-tradicion-donde-tomar'
  ) {
    return 0.82
  }

  if (category === 'Guías Locales' || category === 'Gastronomía') {
    return 0.76
  }

  if (category === 'Noticias') {
    return 0.62
  }

  return 0.68
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://huelva.cloud'
  const now = new Date()

  const articles = await getArticles()

  const coreUrls = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/que-ver`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/donde-comer`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/alojarse`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/playas`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/fin-de-semana`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guias`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/agenda`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/comer`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.84,
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.78,
    },
    {
      url: `${baseUrl}/tiempo`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.72,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ai-disclosure`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.25,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ]

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
    priority: 0.66,
  }))

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: safeDate(article.date),
    changeFrequency: article.category === 'Noticias' ? 'weekly' as const : 'monthly' as const,
    priority: inferArticlePriority(article.slug, article.category),
  }))

  return [...coreUrls, ...guideClusterUrls, ...articleUrls]
}

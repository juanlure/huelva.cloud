import type { Metadata } from 'next';

export function buildBasicPageMetadata({
  title,
  description,
  path,
  keywords,
  image = '/images/guides/huelva-aerea.jpg',
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `https://huelva.cloud${path}`;
  const imageUrl = image.startsWith('http') ? image : `https://huelva.cloud${image}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Huelva.cloud',
      locale: 'es_ES',
      type,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

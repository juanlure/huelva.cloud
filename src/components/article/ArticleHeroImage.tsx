'use client';

import { useState } from 'react';

interface ArticleHeroImageProps {
  src: string;
  alt: string;
  className: string;
  fallbackSrc?: string;
}

export default function ArticleHeroImage({
  src,
  alt,
  className,
  fallbackSrc = '/images/guides/huelva-muelle-tinto.jpg',
}: ArticleHeroImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackApplied, setFallbackApplied] = useState(false);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="eager"
      onError={() => {
        if (fallbackApplied) return;
        setFallbackApplied(true);
        setCurrentSrc(fallbackSrc);
      }}
    />
  );
}

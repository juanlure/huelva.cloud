'use client';

import Link, { type LinkProps } from 'next/link';
import type { ReactNode, MouseEvent } from 'react';
import { trackCommercialClick, type CommercialSurface } from '@/lib/analytics';

type CommercialLinkProps = LinkProps & {
  surface: CommercialSurface;
  destination?: string;
  className?: string;
  children: ReactNode;
};

export default function CommercialLink({
  surface,
  destination,
  className,
  children,
  href,
  ...rest
}: CommercialLinkProps) {
  const resolvedDestination = destination || (typeof href === 'string' ? href : '/contact');

  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    trackCommercialClick(surface, resolvedDestination);
  };

  return (
    <Link
      {...rest}
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

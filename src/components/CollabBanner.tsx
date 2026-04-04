'use client';

import Link from 'next/link';
import { Mail, Megaphone, Handshake, ArrowRight } from 'lucide-react';
import { trackCommercialClick } from '@/lib/analytics';

export default function CollabBanner() {
  return (
    <div className="relative border-b border-terracotta/12 bg-gradient-to-r from-terracotta via-orange-500 to-orange-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="container relative z-10">
        <div className="min-h-[44px] py-2.5 md:min-h-[52px] md:py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-white/95 min-w-0">
            <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-[10px] md:text-[11px] text-white/75">
              <Megaphone size={13} />
              Publicidad
            </span>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm">
              <Handshake size={14} className="text-white/80 shrink-0" />
              <span className="leading-snug">Marcas, negocios y acciones especiales en Huelva</span>
            </span>
          </div>

          <Link
            href="/contact"
            onClick={() => trackCommercialClick('collab_banner', '/contact')}
            className="inline-flex items-center gap-2 self-start md:self-auto px-3.5 py-2 rounded-full bg-white text-terracotta font-semibold hover:bg-cream transition-colors shadow-sm text-sm"
          >
            <Mail size={14} />
            Ver opciones
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Mail, Megaphone, Handshake, ArrowRight } from 'lucide-react';

export default function CollabBanner() {
  return (
    <div className="relative z-40 border-b border-terracotta/12 bg-gradient-to-r from-terracotta via-orange-500 to-orange-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="container relative z-10">
        <div className="min-h-[52px] py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/95">
            <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-widest text-[11px] text-white/75">
              <Megaphone size={14} />
              Colaboraciones · Publicidad
            </span>
            <span className="inline-flex items-center gap-2">
              <Handshake size={14} className="text-white/80" />
              ¿Marca, negocio local o acción especial en Huelva?
            </span>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-full bg-white text-terracotta font-semibold hover:bg-cream transition-colors shadow-sm"
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

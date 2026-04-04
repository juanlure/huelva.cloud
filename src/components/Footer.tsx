import Link from 'next/link';
import { MapPin, ArrowRight, CalendarDays, Newspaper, BedDouble, UtensilsCrossed } from 'lucide-react';

const exploreLinks = [
  { name: 'Comer', href: '/comer', icon: <UtensilsCrossed size={16} /> },
  { name: 'Eventos', href: '/eventos', icon: <CalendarDays size={16} /> },
  { name: 'Alojarse', href: '/alojarse', icon: <BedDouble size={16} /> },
  { name: 'Guías', href: '/guias', icon: <MapPin size={16} /> },
  { name: 'Noticias', href: '/noticias', icon: <Newspaper size={16} /> },
];

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(180deg,#13202d_0%,#0f1822_100%)] text-white pt-24 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,58,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)] pointer-events-none" />
      <div className="absolute -top-16 right-0 w-[28rem] h-[28rem] bg-terracotta/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[22rem] h-[22rem] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_0.8fr] gap-12 mb-16">
          <div>
            <Link href="/" className="text-4xl font-display font-bold text-white tracking-tight mb-6 inline-block">
              Huelva<span className="text-terracotta">.cloud</span>
            </Link>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl mb-8">
              Guía local con criterio. Qué ver, dónde comer, qué plan merece la pena y qué no. Huelva contada con más verdad y mejor presencia visual.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white/70">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                100% Huelva y provincia
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white/70">
                Curado con IA + criterio editorial
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] backdrop-blur-md p-6 max-w-xl shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
              <p className="text-xs uppercase tracking-widest text-white/45 font-semibold mb-3">Promesa editorial</p>
              <p className="text-white/80 leading-relaxed">
                Sin folletos turísticos, sin relleno y sin disfrazar una agenda vacía. Si algo aparece aquí, tiene que merecer clic o visita.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-display text-2xl font-semibold text-white mb-6">Explora</h4>
            <ul className="space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-white/65 hover:text-terracotta transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/6 border border-white/8 group-hover:bg-terracotta/12 group-hover:border-terracotta/20 transition-colors">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-2xl font-semibold text-white mb-6">Información</h4>
            <ul className="space-y-4 mb-8">
              {[
                { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
                { name: 'Contacto y colaboraciones', href: '/contact' },
                { name: 'Cómo funciona (IA)', href: '/ai-disclosure' },
                { name: 'Privacidad', href: '/privacy' },
                { name: 'Aviso Legal', href: '/legal' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/65 hover:text-terracotta transition-colors inline-flex items-center gap-2 group">
                    <span>{link.name}</span>
                    <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/12 rounded-full border border-terracotta/20">
              <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
              <span className="text-xs text-terracotta font-medium">Curado con IA. Guiado por criterio onubense.</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-white/45">
          <p>© {new Date().getFullYear()} Huelva.cloud · Hecho con intención, criterio y un poco de mala leche útil.</p>
          <p className="italic text-white/35">"Huelva es mu bonita. La web también debería serlo."</p>
        </div>
      </div>
    </footer>
  );
}

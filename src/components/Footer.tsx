import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-sand pt-20 pb-10 px-6 border-t border-navy/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-display font-bold text-navy tracking-tight mb-6 block">
              Huelva<span className="text-terracotta">.cloud</span>
            </Link>
            <p className="text-navy/70 text-lg leading-relaxed max-w-sm mb-6">
              Tu compañero local inteligente. Descubriendo Huelva con honestidad,
              humor y un poquito de arte.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-white/50 backdrop-blur-sm border border-navy/5 rounded-full text-xs font-medium text-navy/60">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              🌱 100% Sin rastreadores · Solo Huelva
            </div>
          </div>

          {/* Links Section 1 */}
          <div>
            <h4 className="font-display text-xl font-bold text-navy mb-6">Explora</h4>
            <ul className="space-y-4">
              {['Comer', 'Eventos', 'Alojarse', 'Guías', 'Noticias'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace('í', 'i')}`}
                    className="text-navy/60 hover:text-terracotta transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h4 className="font-display text-xl font-bold text-navy mb-6">Transparencia</h4>
            <ul className="space-y-4">
              {[
                { name: 'Cómo funciona (IA)', href: '/ai-disclosure' },
                { name: 'Privacidad', href: '/privacy' },
                { name: 'Aviso Legal', href: '/legal' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-navy/60 hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Transparency Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full">
            <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
            <span className="text-xs text-terracotta font-medium">
              Curado con IA. Guiado por valores onubenses.
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-navy/10 flex flex-col md:flex-row justify-between items-center text-sm text-navy/40">
          <p>© {new Date().getFullYear()} Huelva.cloud · Hecho con ❤️ y 🤖 en Huelva.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <span className="italic">"Porque Huelva es mu bonita y hay que decir las cosas claras."</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

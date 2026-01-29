import { ArrowLeft, Coffee } from 'lucide-react';
import Link from 'next/link';
import CoffeeTranslator from '@/components/guides/CoffeeTranslator';

export const metadata = {
  title: 'Traductor de Café | Huelva.is',
  description: 'Solo, Cortado, Mitad, Manchado, Sombra, Nube. Aprende los ratios sagrados del café onubense. Guía interactiva.',
};

export default function CoffeeTranslatorPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-amber-800 via-stone-700 to-stone-900 pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1920&q=80")`,
          }} />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-stone-800/80 to-stone-900/90" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <Link
              href="/#guias"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 font-medium text-sm"
            >
              <ArrowLeft size={18} />
              Volver a guías
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Coffee size={16} />
                Interactivo
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Traductor de Café
            </h1>

            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Solo, Cortado, Mitad, Manchado, Sombra, Nube... no son lo mismo.
              Aprende los ratios sagrados del café onubense.
            </p>

            <div className="flex items-center gap-6 mt-8 text-white/70 text-sm">
              <span>☕ 9 tipos de café</span>
              <span>📊 Ratios visuales</span>
              <span>💡 Etiqueta local</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Component */}
      <CoffeeTranslator />
    </main>
  );
}

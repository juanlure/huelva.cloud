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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          }} />
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

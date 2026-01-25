import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import JamonTranslator from '@/components/guides/JamonTranslator';

export const metadata = {
  title: 'Traductor de Jamón | Huelva.is',
  description: 'Bellota, Cebo de Campo, Cebo. Descubre las diferencias del jamón ibérico. Guía interactiva con precios, curación y vocabulario local.',
};

export default function JamonTranslatorPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                <Sparkles size={16} />
                Interactivo
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Traductor de Jamón
            </h1>

            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              No todo el jamón es igual. Aprende a distinguir entre Bellota, Cebo de Campo y Cebo.
              Precios, tiempos de curación y cómo pedir como un auténtico onubense.
            </p>

            <div className="flex items-center gap-6 mt-8 text-white/70 text-sm">
              <span>🐷 4 categorías</span>
              <span>⏱️ Proceso de curación</span>
              <span>💬 Vocabulario local</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Component */}
      <JamonTranslator />
    </main>
  );
}

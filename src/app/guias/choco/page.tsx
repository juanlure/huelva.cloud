import { ArrowLeft, Utensils, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ChocoTranslator from '@/components/guides/ChocoTranslator';

export const metadata = {
  title: 'Traductor de Choco | Huelva.cloud',
  description: 'Aprende a pedir como un verdadero choquero. La guía definitiva del lenguaje de la tapa en Huelva.',
};

export default function ChocoTranslatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Header with Image Background */}
      <div className="relative pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/guides/choco-frito-hero.jpg)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-terracotta/90 via-terracotta/70 to-orange-50" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <Link
              href="/#guias"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 font-medium text-sm"
            >
              <ArrowLeft size={18} />
              Volver a guías
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="badge bg-white/20 border border-white/30 text-white">
                <Sparkles size={16} />
                Interactivo
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Traductor de Choco
            </h1>

            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              "Un choco con tomate, dos rabas y una clara." ¿Suena a chino?
              Aprende a pedir como un verdadero choquero y nunca más te mirarán raro en la barra.
            </p>

            <div className="flex items-center gap-4 mt-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Utensils size={16} />
                <span>28 términos verificados</span>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                Audio incluido
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Translator Component */}
      <ChocoTranslator />
    </main>
  );
}

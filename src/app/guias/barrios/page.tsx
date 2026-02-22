import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import NeighborhoodsGuide from '@/components/guides/NeighborhoodsGuide';

export const metadata = {
  title: 'Barrios de Huelva | Huelva.cloud',
  description: 'Encuentra tu barrio perfecto en Huelva. Guía interactiva con filtros por tipo de viajero, rankings y características de cada zona.',
};

export default function NeighborhoodsPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-stone-800 via-stone-700 to-amber-900 pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: 'url(/images/guides/barrio-reina-victoria-hero.jpg)',
          }} />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900/90 via-stone-800/80 to-stone-900/90" />
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
                <MapPin size={16} />
                Interactivo
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Barrios de Huelva
            </h1>

            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Centro, Reina Victoria, Paseo de la Cinta... cada barrio tiene su propia alma.
              Filtra por tu tipo de viaje y encuentra dónde quedarte.
            </p>

            <div className="flex items-center gap-6 mt-8 text-white/70 text-sm">
              <span>🏘️ 6 barrios</span>
              <span>🎯 Filtros por viajero</span>
              <span>📊 Rankings por categoría</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Component */}
      <NeighborhoodsGuide />
    </main>
  );
}

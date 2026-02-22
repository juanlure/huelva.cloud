import { ArrowLeft, MapPin, Clock, AlertTriangle, Sunset, Navigation } from 'lucide-react';
import Link from 'next/link';
import SurvivalGuide from '@/components/guides/SurvivalGuide';

export const metadata = {
  title: 'Guía de Supervivencia en Huelva | Huelva.cloud',
  description: 'Transporte, horarios, slang y secretos locales. Cómo navegar Huelva sin parecer un turista.',
};

export default function SurvivalGuidePage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header with Image Background */}
      <div className="relative bg-navy pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/guides/huelva-plaza-las-monjas.jpg)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)' }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-content mx-auto">
            <Link
              href="/#guias"
              className="inline-flex items-center gap-2 text-white/60 hover:text-terracotta transition-colors mb-8 font-medium text-sm"
            >
              <ArrowLeft size={18} />
              Volver a guías
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-terracotta">
                Lo más leído
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Guía de Supervivencia<br />en Huelva
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              Todo lo que necesitas saber para moverte por Huelva como un verdadero onubense.
              Sin turismos, sin trampas.
            </p>

            <div className="flex items-center gap-6 mt-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>10 min lectura</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Actualizado 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Guide Component */}
      <SurvivalGuide />
    </main>
  );
}

import { ArrowLeft, Clock, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import WeekendItinerary from '@/components/guides/WeekendItinerary';

export const metadata = {
  title: '48 Horas en Huelva | Huelva.cloud',
  description: 'Un finsemana perfecto: comida, cultura y mar. El itinerario definitivo para Huelva.',
};

function Sunset({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 10v2" />
      <path d="M12 14h.01" />
      <path d="M17 18a5 5 0 0 0-10 0" />
      <path d="M3 12h1" />
      <path d="M20 12h1" />
      <path d="M6 6l1 1" />
      <path d="M17 17l1 1" />
      <path d="M6 18l1-1" />
      <path d="M17 7l1-1" />
    </svg>
  );
}

export default function WeekendItineraryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sand to-cream">
      {/* Header with Image Background */}
      <div className="relative pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: 'url(/images/guides/muelle-tinto-sunset.jpg)',
          }} />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/90 via-amber-900/80 to-transparent" />
        </div>

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' }} />
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
                Itinerario
              </span>
            </div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              48 Horas en Huelva
            </h1>

            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Un finsemana perfecto de comida, cultura y mar. Elige tu vibe y obtén un itinerario
              personalizado a través de lo mejor de Huelva.
            </p>

            <div className="flex items-center gap-6 mt-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>2 días</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>12 lugares verificados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Itinerary Component */}
      <WeekendItinerary />
    </main>
  );
}

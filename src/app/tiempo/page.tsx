import { Metadata } from 'next';
import WeatherWidget from '@/components/WeatherWidget';

export const metadata: Metadata = {
  title: 'El Tiempo en Huelva Hoy | Previsión 7 días',
  description: 'Consulta el tiempo actual en Huelva con previsión para los próximos 7 días. Temperatura, lluvia, viento y UV actualizados en tiempo real.',
};

export default function TiempoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sand">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-display text-4xl md:text-6xl font-bold mb-4">
              El Tiempo en Huelva
            </h1>
            <p className="text-xl text-white/80">
              Previsión meteorológica actualizada para la ciudad y provincia
            </p>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="container py-12">
        <div className="max-w-content mx-auto">
          <WeatherWidget />
        </div>
      </div>

      {/* Info Section */}
      <div className="container pb-16">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              title="¿Cuándo visitar Huelva?"
              icon="📅"
              content="La primavera (abril-junio) y el otoño (septiembre-octubre) son las mejores épocas. Temperaturas suaves y menos turismo."
            />
            <InfoCard
              title="Playas perfectas"
              icon="🏖️"
              content="Desde Punta Umbría hasta Matalascañas, más de 120km de costa. El agua es más templada de julio a septiembre."
            />
            <InfoCard
              title="Semana Santa"
              icon="✝️"
              content="Si vienes en Semana Santa, prepárate para el frío. Sorprende pero suele hacer fresco por la noche."
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, icon, content }: { title: string; icon: string; content: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-navy-10 hover:border-terracotta/30 transition-all hover:shadow-lg">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-display text-lg font-semibold text-navy mb-2">{title}</h3>
      <p className="text-navy-60 text-sm">{content}</p>
    </div>
  );
}

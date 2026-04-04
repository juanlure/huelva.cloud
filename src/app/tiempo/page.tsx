import { Metadata } from 'next';
import WeatherWidget from '@/components/WeatherWidget';

export const metadata: Metadata = {
  title: 'El Tiempo en Huelva Hoy | Previsión 7 días',
  description: 'Consulta el tiempo actual en Huelva con previsión para los próximos 7 días. Temperatura, lluvia, viento y UV actualizados en tiempo real.',
};

export default function TiempoPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f8fb_0%,#fffdf9_55%,#fff7ef_100%)]">
      <section className="px-6 pt-10 pb-8 md:pt-14 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-sky-100 bg-[linear-gradient(135deg,#0f4c81_0%,#0f7ec7_55%,#57b4ff_100%)] text-white shadow-[0_30px_80px_rgba(15,76,129,0.22)]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 px-8 py-10 md:px-12 md:py-14">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 border border-white/10 mb-5">
                  Tiempo · Huelva · Provincia
                </div>
                <h1 className="text-display text-4xl md:text-6xl leading-[0.95] tracking-tight mb-4">
                  El tiempo en Huelva,
                  <br />
                  <span className="text-white/78 italic">sin mirar veinte apps</span>
                </h1>
                <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
                  Consulta de un vistazo la situación actual y la previsión de los próximos días para saber si toca playa, chaqueta o cancelar el plan con dignidad.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-white/12 bg-white/10 backdrop-blur-md p-5 md:p-6 self-start">
                <p className="text-xs uppercase tracking-[0.22em] text-white/55 font-semibold mb-4">Resumen rápido</p>
                <div className="rounded-[1.2rem] bg-white text-navy p-4 md:p-5 shadow-[0_20px_50px_rgba(11,31,42,0.18)]">
                  <WeatherWidget />
                </div>
                <p className="mt-4 text-sm text-white/70 leading-relaxed">
                  Datos pensados para uso real: temperatura, previsión y contexto rápido para moverte por capital, costa y escapadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2rem] border border-navy/10 bg-white p-4 md:p-6 shadow-[0_20px_60px_rgba(26,42,58,0.06)]">
            <WeatherWidget />
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <InfoCard
            title="Cuándo viene mejor"
            icon="📅"
            content="Primavera y otoño suelen ser la mejor jugada: menos castigo de calor, menos agobio y mejor margen para disfrutar la calle."
          />
          <InfoCard
            title="Día de playa o no"
            icon="🏖️"
            content="En costa el viento manda más de lo que parece. Mira no solo la temperatura: si sopla fuerte, el plan cambia bastante."
          />
          <InfoCard
            title="Plan sin sustos"
            icon="🧥"
            content="En Huelva muchas noches engañan. Puede hacer buen día y caer fresco al anochecer, así que mejor llevar una capa ligera."
          />
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, icon, content }: { title: string; icon: string; content: string }) {
  return (
    <div className="rounded-[1.6rem] border border-navy/10 bg-white p-7 shadow-[0_18px_60px_rgba(26,42,58,0.06)]">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h2 className="text-display text-2xl text-navy mb-3">{title}</h2>
      <p className="text-navy/65 leading-relaxed">{content}</p>
    </div>
  );
}

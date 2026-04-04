'use client';

import Link from 'next/link';
import { Mail, Megaphone, Building2, ArrowRight, MapPin, Clock3 } from 'lucide-react';
import { trackCommercialClick } from '@/lib/analytics';

const offers = [
  {
    title: 'Publicidad local con contexto',
    body: 'No vendemos banners por decorar. Diseñamos presencia útil para negocios, marcas y aperturas que encajan de verdad con Huelva y su gente.',
  },
  {
    title: 'Colaboraciones editoriales',
    body: 'Si tienes un evento, una historia o un proyecto que merece atención, se valora. Sin publirreportaje cutre y sin humo.',
  },
  {
    title: 'Acciones especiales',
    body: 'Coberturas, guías patrocinadas, campañas de temporada, activaciones locales y paquetes a medida para mover visibilidad con intención.',
  },
];

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-cream pt-36 pb-24 px-6">
      <section className="max-w-6xl mx-auto">
        <div className="rounded-[2rem] overflow-hidden border border-navy/10 bg-[linear-gradient(135deg,#13202d_0%,#1A2A3A_48%,#0F1822_100%)] text-white shadow-[0_30px_100px_rgba(26,42,58,0.18)]">
          <div className="px-8 py-12 md:px-12 md:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
                <Megaphone size={16} className="text-terracotta" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Contacto · negocio · editorial</span>
              </div>

              <h1 className="text-display text-5xl md:text-6xl leading-[0.92] tracking-tight mb-6">
                Si quieres visibilidad en Huelva,
                <br />
                <span className="text-terracotta italic">háblanos claro</span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-8">
                Huelva.cloud no está para poner logos sin alma. Si tienes un negocio local, una marca,
                un evento o una campaña que merece atención real, aquí se puede construir algo útil.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/10 px-4 py-2 text-sm text-white/75">
                  <Building2 size={15} className="text-terracotta" />
                  Negocios locales
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/10 px-4 py-2 text-sm text-white/75">
                  <Megaphone size={15} className="text-terracotta" />
                  Campañas y patrocinios
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/10 px-4 py-2 text-sm text-white/75">
                  <Mail size={15} className="text-terracotta" />
                  Propuestas editoriales
                </div>
              </div>

              <a
                href="mailto:jlromero@flowia.pro?subject=Huelva.cloud%20-%20Colaboraci%C3%B3n%20o%20publicidad"
                onClick={() => trackCommercialClick('contact_hero_mail', 'mailto:jlromero@flowia.pro?subject=Huelva.cloud%20-%20Colaboraci%C3%B3n%20o%20publicidad')}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[linear-gradient(135deg,#D4553A_0%,#E56C49_52%,#C5402A_100%)] text-white font-semibold shadow-[0_20px_50px_rgba(212,85,58,0.32)] hover:shadow-[0_24px_60px_rgba(212,85,58,0.38)] transition-all"
              >
                <Mail size={18} />
                Escribir ahora
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/8 backdrop-blur-md p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45 font-semibold mb-5">Datos de contacto</p>

              <div className="space-y-5 text-white/80">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-terracotta mt-0.5" />
                  <div>
                    <p className="text-sm text-white/45">Email</p>
                    <a
                      href="mailto:jlromero@flowia.pro"
                      onClick={() => trackCommercialClick('contact_card_mail', 'mailto:jlromero@flowia.pro')}
                      className="hover:text-terracotta transition-colors"
                    >
                      jlromero@flowia.pro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-terracotta mt-0.5" />
                  <div>
                    <p className="text-sm text-white/45">Cobertura</p>
                    <p>Huelva capital + costa + provincia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3 size={18} className="text-terracotta mt-0.5" />
                  <div>
                    <p className="text-sm text-white/45">Respuesta</p>
                    <p>Normalmente en menos de 48h</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/60 leading-relaxed">
                Si escribes, mejor con esto claro: qué quieres mover, a quién, fechas, presupuesto orientativo y qué resultado te gustaría conseguir.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-6">
        {offers.map((item) => (
          <div key={item.title} className="rounded-[1.6rem] border border-navy/10 bg-white p-7 shadow-[0_18px_60px_rgba(26,42,58,0.06)]">
            <h2 className="text-display text-2xl text-navy mb-3">{item.title}</h2>
            <p className="text-navy/65 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <div className="rounded-[2rem] border border-terracotta/15 bg-terracotta/5 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-semibold mb-2">Siguiente paso</p>
            <h2 className="text-display text-3xl text-navy mb-2">Si tienes algo que vender, no mandes un \"hola\" vacío</h2>
            <p className="text-navy/65 max-w-2xl">Cuenta el contexto, el objetivo y el timing. Así se decide rápido si encaja o no.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:jlromero@flowia.pro?subject=Huelva.cloud%20-%20Quiero%20colaborar"
              onClick={() => trackCommercialClick('contact_final_mail', 'mailto:jlromero@flowia.pro?subject=Huelva.cloud%20-%20Quiero%20colaborar')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-terracotta transition-colors"
            >
              Enviar propuesta
              <ArrowRight size={16} />
            </a>
            <Link
              href="/sobre-nosotros"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-navy/10 text-navy font-semibold hover:border-terracotta/30 hover:text-terracotta transition-colors"
            >
              Ver quién escribe aquí
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

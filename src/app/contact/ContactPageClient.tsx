'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Megaphone, Building2, ArrowRight, MapPin, Clock3, Copy, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const contactEmail = 'jlromero@flowia.pro';
  const primaryMailto = 'mailto:jlromero@flowia.pro?subject=Huelva.cloud%20-%20Publicidad%20o%20colaboraci%C3%B3n&body=Hola%2C%0A%0Asoy%20%5Bnombre%5D%20y%20quiero%20mover%20%5Bnegocio%2C%20marca%2C%20evento%20o%20campa%C3%B1a%5D.%0A%0AObjetivo%3A%20%5Bvisibilidad%2C%20ventas%2C%20lanzamiento%2C%20tr%C3%A1fico%5D%0AFecha%20o%20timing%3A%20%5B...%5D%0APresupuesto%20orientativo%3A%20%5B...%5D%0A%0ASi%20encaja%2C%20vemos%20opciones.%0A';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      trackCommercialClick('contact_copy_email', contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencio: no romper UX por clipboard
    }
  };

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

              <div className="flex flex-wrap gap-3">
                <a
                  href={primaryMailto}
                  onClick={() => trackCommercialClick('contact_hero_mail', primaryMailto)}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[linear-gradient(135deg,#D4553A_0%,#E56C49_52%,#C5402A_100%)] text-white font-semibold shadow-[0_20px_50px_rgba(212,85,58,0.32)] hover:shadow-[0_24px_60px_rgba(212,85,58,0.38)] transition-all"
                >
                  <Mail size={18} />
                  Escribir ahora
                  <ArrowRight size={18} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-3 px-5 py-4 rounded-full border border-white/15 bg-white/8 text-white font-semibold hover:bg-white/12 transition-colors"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'Email copiado' : 'Copiar email'}
                </button>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/8 backdrop-blur-md p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45 font-semibold mb-5">Datos de contacto</p>

              <div className="space-y-5 text-white/80">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-terracotta mt-0.5" />
                  <div>
                    <p className="text-sm text-white/45">Email</p>
                    <a
                      href={primaryMailto}
                      onClick={() => trackCommercialClick('contact_card_mail', primaryMailto)}
                      className="hover:text-terracotta transition-colors"
                    >
                      {contactEmail}
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

              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/60 leading-relaxed space-y-3">
                <p>Si escribes, mejor con esto claro: qué quieres mover, a quién, fechas, presupuesto orientativo y qué resultado te gustaría conseguir.</p>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-white/72">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-2">Plantilla rápida</p>
                  <p>"Hola, soy [nombre]. Quiero mover [negocio/evento/campaña] en Huelva. Busco [visibilidad/ventas/tráfico]. Timing: [fecha]. Presupuesto: [rango]."</p>
                </div>
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
              href={primaryMailto}
              onClick={() => trackCommercialClick('contact_final_mail', primaryMailto)}
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

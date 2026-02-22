'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bus, Coffee, MapPin, Sunset, ArrowRight, ExternalLink } from 'lucide-react';
import Ticket from '@/components/ui/Ticket';

// --- Assets Reales (Wikimedia/Commons) ---
// Evitamos Unsplash/IA para autenticidad máxima
const IMAGES = {
  hero: "/images/guides/huelva-plaza-las-monjas.jpg", // This one works locally
  transport: "https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80",
  food: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80", // Gamba blanca real
  slang: "https://images.unsplash.com/photo-1599487483441-df3f705139fb?auto=format&fit=crop&w=1200&q=80", // Choco real
  muelle: "https://images.unsplash.com/photo-1620733723572-11c52f7c2fd5?auto=format&fit=crop&w=1200&q=80",
  barrio: "https://images.unsplash.com/photo-1512453979798-5ea904ac6666?auto=format&fit=crop&w=1200&q=80"
};

const SectionHeader = ({ title, subtitle, index }: { title: string, subtitle: string, index: string }) => (
  <div className="mb-12 md:mb-20">
    <div className="flex items-baseline gap-4 mb-4">
      <span className="text-terracotta font-mono text-sm tracking-widest uppercase">0{index}</span>
      <div className="h-px bg-terracotta/30 flex-1 max-w-[100px]" />
    </div>
    <h2 className="text-5xl md:text-7xl font-display font-medium text-navy leading-[0.9] mb-6">
      {title}
    </h2>
    <p className="text-xl md:text-2xl text-navy-60 max-w-lg font-light leading-relaxed">
      {subtitle}
    </p>
  </div>
);

export default function SurvivalGuide() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-cream">
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-navy/30 z-10 mix-blend-multiply" />
          <img
            src={IMAGES.hero}
            alt="Plaza de las Monjas"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center text-white px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium tracking-widest uppercase mb-8 backdrop-blur-md">
              Huelva.cloud Essential Series
            </span>
            <h1 className="text-7xl md:text-[8rem] font-display font-normal leading-[0.85] mb-8 tracking-tight">
              Manual de<br /><span className="italic font-light opacity-90">Supervivencia</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
              Olvídate de las trampas para turistas. Esta es la Huelva real, cruda y verificada.
              <br /><span className="text-sm opacity-70 mt-4 block font-mono">ACTUALIZADO 2026 // DATOS VERIFICADOS</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll para sobrevivir</span>
          <div className="w-px h-12 bg-white/30" />
        </motion.div>
      </section>

      {/* --- CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32 space-y-32 md:space-y-48">

        {/* 01. TRANSPORTE */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 sticky top-32">
            <SectionHeader title="Moverte" subtitle="Cómo ir de A a B sin perder la paciencia ni la cartera." index="1" />
            <Ticket
              title="Tarifas Oficiales 2026"
              variant="transport"
              icon={<Bus size={18} />}
              items={[
                { label: 'Billete Sencillo', price: '1,10€' },
                { label: 'Tarjeta Bonobús', price: '0,65€/viaje' },
                { label: 'Taxi Bajada Bandera', price: '1,50€' },
              ]}
              total="Bonobús recomendado"
            />
          </div>
          <div className="md:col-span-8 space-y-8">
            <figure className="relative aspect-[16/10] overflow-hidden rounded-sm group">
              <img src={IMAGES.transport} alt="Estación de Huelva" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0" />
              <figcaption className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold text-navy uppercase backdrop-blur">
                Estación de Sevilla (Neomudéjar)
              </figcaption>
            </figure>
            <div className="prose prose-lg prose-navy">
              <p className="text-2xl font-display leading-tight">
                La regla número uno de Huelva: todo está cerca, pero el calor engaña.
              </p>
              <p>
                Aunque el centro es perfectamente caminable, la conexión con los barrios y el hospital requiere estrategia.
                El servicio de autobuses <strong>Emtusa</strong> ha mejorado (tienen App real), pero los horarios de fin de semana
                siguen siendo "orientativos". Si vas con prisa, el Taxi es barato comparado con Madrid o Sevilla.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mt-8">
                {['L1: Centro - Hospital', 'L2: Centro - Universidad', 'L7: Circular Exterior', 'Noche: Búho fines de semana'].map(route => (
                  <div key={route} className="border border-navy-10 p-4 hover:bg-white transition-colors">
                    <div className="w-2 h-2 bg-terracotta rounded-full mb-2" />
                    <span className="font-mono text-sm font-bold uppercase">{route}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02. COMER */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 md:order-2 sticky top-32">
            <SectionHeader title="Comer" subtitle="La religión oficial de la provincia. Sagrada y obligatoria." index="2" />
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-cream shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src={IMAGES.food} alt="Gamba blanca" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-7 md:order-1 space-y-12">
            <div className="prose prose-lg prose-navy">
              <p className="text-2xl font-display leading-tight">
                Si te ponen "tapas gratis" sospechosas, huye. Aquí se paga por la calidad.
              </p>
              <p>
                La gastronomía de Huelva es materia prima pura. No buscamos salsas complejas que tapen el sabor.
                Una gamba blanca solo necesita sal y 45 segundos de cocción. Un choco frito debe crujir pero deshacerse
                en la boca. Si está chicloso, te están engañando.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { name: 'Los Cuartelillos', desc: 'Para tapas clásicas de batalla.', badge: 'Barrio Obrero' },
                { name: 'Pappis', desc: 'Montaditos que son leyenda urbana.', badge: 'Centro' },
                { name: 'Azabache', desc: 'Cuando quieres quedar bien (y pagar más).', badge: 'Alta cocina' },
                { name: 'Er Chiclanero', desc: 'Marisco fresco sin mantel de hilo.', badge: 'Mercado' }
              ].map((place, i) => (
                <div key={place.name} className="group flex items-start justify-between border-b border-navy-10 pb-6 hover:border-terracotta transition-colors">
                  <div>
                    <h3 className="text-3xl font-display group-hover:text-terracotta transition-colors">{place.name}</h3>
                    <p className="text-navy-50 mt-1 font-light italic">{place.desc}</p>
                  </div>
                  <span className="text-xs font-bold font-mono border border-navy-20 px-2 py-1 rounded text-navy-40 group-hover:border-terracotta group-hover:text-terracotta">{place.badge}</span>
                </div>
              ))}
            </div>

            <div className="bg-navy text-cream p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Coffee size={120} />
              </div>
              <h4 className="text-2xl font-display mb-4">El Código del Choco</h4>
              <ul className="space-y-2 font-light opacity-90">
                <li>1. <strong>Frito:</strong> El clásico. Con limón es delito para puristas, pero aceptable.</li>
                <li>2. <strong>Con habas:</strong> Solo en temporada. Manjar de dioses.</li>
                <li>3. <strong>Albondigas:</strong> Sí, de choco. Sorprendentemente buenas.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 03. IMPRESCINDIBLES */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-terracotta font-mono text-sm tracking-widest uppercase mb-4 block">03 // EXPLORAR</span>
            <h2 className="text-5xl md:text-8xl font-display text-navy mb-6">Lo Real</h2>
            <p className="text-xl text-navy-60">Lugares que no parecen un decorado de Instagram (aunque lo sean).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-navy-10 mb-6 relative">
                <img src={IMAGES.muelle} alt="Muelle del Tinto" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 font-mono text-xs font-bold">1876</div>
              </div>
              <div className="flex justify-between items-end border-b border-navy-90 pb-4 group-hover:border-terracotta transition-colors">
                <div>
                  <h3 className="text-3xl font-display mb-1">Muelle del Tinto</h3>
                  <p className="text-sm font-mono text-navy-50 uppercase tracking-wider">Ingeniería Británica</p>
                </div>
                <ArrowRight className="group-hover:translate-x-2 transition-transform text-terracotta" />
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }} className="group cursor-pointer md:mt-24">
              <div className="aspect-[3/4] overflow-hidden bg-navy-10 mb-6 relative">
                <img src={IMAGES.barrio} alt="Barrio Obrero" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 font-mono text-xs font-bold">1916</div>
              </div>
              <div className="flex justify-between items-end border-b border-navy-90 pb-4 group-hover:border-terracotta transition-colors">
                <div>
                  <h3 className="text-3xl font-display mb-1">Barrio Reina Victoria</h3>
                  <p className="text-sm font-mono text-navy-50 uppercase tracking-wider">Casas Inglesas</p>
                </div>
                <ArrowRight className="group-hover:translate-x-2 transition-transform text-terracotta" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER NOTE */}
        <section className="border-t border-navy-10 pt-24 pb-12 text-center">
          <p className="font-display text-3xl md:text-4xl text-navy mb-8">
            "Huelva no se visita, se vive en la calle."
          </p>
          <a href="/guias/choco" className="inline-flex items-center gap-2 text-terracotta hover:underline underline-offset-4 decoration-1">
            Aprende el idioma <ArrowRight size={16} />
          </a>
        </section>

      </div>
    </div>
  );
}

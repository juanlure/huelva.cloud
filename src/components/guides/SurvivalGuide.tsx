'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bus, Coffee, MapPin, Sunset, ArrowRight, ExternalLink, Sparkles, Quote, X, Star, MessageSquare } from 'lucide-react';

const IMAGES = {
  hero: '/images/guides/huelva-plaza-las-monjas.jpg',
  transport: '/images/guides/estacion-neomudejar-hero.jpg',
  food: '/images/guides/gambas-blancas-huelva.jpg',
  muelle: '/images/guides/muelle-tinto-sunset.jpg',
  barrio: '/images/guides/barrio-reina-victoria-hero.jpg'
};

export default function SurvivalGuide() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-cream min-h-screen text-navy font-sans">
      {/* Immersive Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-end pb-24">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent z-10" />
          <img
            src={IMAGES.hero}
            alt="Plaza de las Monjas"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 text-white/60 mb-8">
              <div className="h-px w-12 bg-white/30" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em]">
                Protocolo de Supervivencia v2.0
              </span>
            </div>
            <h1 className="text-display text-7xl md:text-9xl lg:text-[10rem] font-bold text-white mb-8 leading-[0.8] tracking-tighter">
              Guía de <br /><span className="italic font-light text-terracotta drop-shadow-2xl">Vivir</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-white/80 max-w-2xl leading-relaxed">
              Manual crítico para navegar Huelva sin parecer un extraño. 
              Donde la teoría se rinde ante la realidad de la calle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-48">
        
        {/* Intro Text */}
        <div className="mb-48 max-w-3xl">
          <p className="text-3xl md:text-5xl font-display font-light text-navy leading-tight mb-8 italic">
            "En Huelva, el tiempo no corre, se saborea. No intentes ir más rápido que el sol, porque él siempre gana."
          </p>
          <div className="h-px w-24 bg-terracotta/30" />
        </div>

        {/* 01. MOVERSE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-64">
          <div className="md:col-span-12 lg:col-span-5">
            <div className="mb-12">
               <span className="text-terracotta font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Capítulo I</span>
               <h2 className="text-6xl md:text-8xl font-display font-bold text-navy mb-8 tracking-tighter">La Movilidad</h2>
               <p className="text-xl md:text-2xl text-navy-60 font-light leading-relaxed mb-12">
                 La regla de oro: todo está cerca, pero el calor es el único juez. Caminar es opcional, sobrevivir es obligatorio.
               </p>
               
               <div className="p-10 bg-sand/50 rounded-sm border border-navy/5 relative group cursor-default">
                  <div className="absolute top-8 right-8 text-navy/10 group-hover:text-terracotta transition-colors">
                    <Bus size={40} strokeWidth={1} />
                  </div>
                  <h4 className="font-bold text-navy uppercase text-[10px] tracking-[0.3em] mb-8">Tarifas Oficiales 2026</h4>
                  <ul className="space-y-6">
                    <li className="flex justify-between items-end border-b border-navy/5 pb-2">
                       <span className="text-navy-60 font-medium">Billete Sencillo</span>
                       <span className="text-2xl font-display text-navy">1,10€</span>
                    </li>
                    <li className="flex justify-between items-end border-b border-navy/5 pb-2">
                       <span className="text-navy-60 font-medium">Bonobús (por viaje)</span>
                       <span className="text-2xl font-display text-navy">0,65€</span>
                    </li>
                    <li className="flex justify-between items-end border-b border-navy/5 pb-2">
                       <span className="text-navy-60 font-medium">Taxi (Bandera)</span>
                       <span className="text-2xl font-display text-navy">1,50€</span>
                    </li>
                  </ul>
                  <p className="mt-8 text-[10px] font-mono text-navy/30 uppercase tracking-widest leading-relaxed">
                    * Datos certificados por Emtusa y Gremial de Taxi.
                  </p>
               </div>
            </div>
          </div>
          
          <div className="md:col-span-12 lg:col-span-7">
            <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-sand mb-12 group">
              <img 
                src={IMAGES.transport} 
                alt="Estación Huelva" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
              />
              <div className="absolute bottom-8 left-8">
                <span className="bg-white/90 backdrop-blur-xl px-4 py-2 text-[10px] font-bold text-navy uppercase tracking-[0.2em]">
                  Estación Neomudéjar · 1888
                </span>
              </div>
            </div>
            <div className="max-w-xl">
               <h4 className="text-3xl font-display italic text-navy mb-6 leading-tight">"El Búho es tu amigo, pero no siempre puntual."</h4>
               <p className="text-lg text-navy-60 font-light leading-relaxed">
                 Huelva es caminable, pero la conexión con la periferia tiene sus trucos. 
                 Emtusa tiene App, úsala mientras te tomas un café frío en la Plaza de las Monjas. 
                 Si el sol aprieta, no te hagas el héroe: pilla un taxi. Es barato comparado con las capitales.
               </p>
            </div>
          </div>
        </div>

        {/* 02. COMER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-64 items-center">
          <div className="md:col-span-12 lg:col-span-6 order-2 lg:order-1">
             <div className="relative aspect-square max-w-2xl mx-auto lg:ml-0 group">
                <div className="absolute inset-0 bg-terracotta/10 rounded-full scale-105 group-hover:scale-110 transition-transform duration-1000" />
                <img 
                  src={IMAGES.food} 
                  alt="Gastronomía Huelva" 
                  className="w-full h-full object-cover rounded-full relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                />
             </div>
          </div>
          <div className="md:col-span-12 lg:col-span-6 order-1 lg:order-2">
             <div className="max-w-xl">
                <span className="text-terracotta font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Capítulo II</span>
                <h2 className="text-6xl md:text-8xl font-display font-bold text-navy mb-8 tracking-tighter">La Gastronomía</h2>
                <p className="text-xl md:text-2xl text-navy-60 font-light leading-relaxed mb-12 italic">
                  "Si la gamba brilla demasiado, sospecha. Si no hay servilletas de papel en el suelo, no es el sitio."
                </p>
                <div className="space-y-8">
                   {[
                     { name: 'Los Cuartelillos', tag: 'Histórico', desc: 'La esencia de la tapa barata y real. No busques manteles.' },
                     { name: 'Azabache', tag: 'Premium', desc: 'Cuando el producto se respeta por encima de todo.' },
                     { name: 'Er Chiclanero', tag: 'Mercado', desc: 'Marisco que saltaba hace dos horas en la lonja.' }
                   ].map((item, i) => (
                     <div key={i} className="group border-b border-navy/5 pb-6 hover:border-terracotta/30 transition-colors cursor-default">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="text-3xl font-display font-medium text-navy group-hover:text-terracotta transition-colors">{item.name}</h4>
                           <span className="text-[10px] font-mono font-bold text-navy/20 uppercase tracking-widest">{item.tag}</span>
                        </div>
                        <p className="text-navy-40 font-light leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* 03. LO REAL */}
        <div className="mb-64">
           <div className="text-center max-w-4xl mx-auto mb-32">
              <span className="text-terracotta font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Capítulo III</span>
              <h2 className="text-7xl md:text-[10rem] font-display font-bold text-navy mb-8 tracking-tighter">Lugares con <span className="italic font-light">Alma</span></h2>
              <p className="text-xl md:text-3xl text-navy-60 font-light leading-relaxed">
                No busques monumentos vacíos. Busca las cicatrices británicas en el hierro y la madera de Riotinto.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <motion.div whileHover={{ y: -20 }} className="group cursor-pointer">
                 <div className="aspect-[3/4] overflow-hidden mb-8 bg-sand">
                    <img 
                      src={IMAGES.muelle} 
                      alt="Muelle del Tinto" 
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                 </div>
                 <div className="flex justify-between items-end border-b border-navy/20 pb-6 group-hover:border-terracotta transition-colors">
                    <div>
                       <h3 className="text-4xl font-display font-medium text-navy">Muelle del Tinto</h3>
                       <p className="text-[10px] font-mono text-navy/40 mt-2 tracking-[0.2em] uppercase">Ingeniería Británica · 1876</p>
                    </div>
                    <ArrowRight className="text-terracotta group-hover:translate-x-4 transition-transform" />
                 </div>
              </motion.div>
              
              <motion.div whileHover={{ y: -20 }} className="group cursor-pointer md:mt-32">
                 <div className="aspect-[3/4] overflow-hidden mb-8 bg-sand">
                    <img 
                      src={IMAGES.barrio} 
                      alt="Barrio Obrero" 
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                 </div>
                 <div className="flex justify-between items-end border-b border-navy/20 pb-6 group-hover:border-terracotta transition-colors">
                    <div>
                       <h3 className="text-4xl font-display font-medium text-navy">Reina Victoria</h3>
                       <p className="text-[10px] font-mono text-navy/40 mt-2 tracking-[0.2em] uppercase">Legado Victoriano · 1916</p>
                    </div>
                    <ArrowRight className="text-terracotta group-hover:translate-x-4 transition-transform" />
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Closing Note */}
        <div className="text-center pt-32 border-t border-navy/5">
           <h2 className="text-4xl md:text-7xl font-display text-navy mb-16 italic font-light drop-shadow-sm leading-tight">
             "Huelva no se visita, <br />se vive en la calle."
           </h2>
           <a 
            href="/guias/choco" 
            className="inline-flex items-center gap-4 text-terracotta font-mono text-xs font-bold uppercase tracking-[0.5em] hover:gap-8 transition-all duration-700 bg-sand/30 px-10 py-5 rounded-full border border-terracotta/10 hover:bg-terracotta hover:text-white"
           >
             Aprende el idioma <ArrowRight size={16} />
           </a>
        </div>
      </div>
    </div>
  );
}

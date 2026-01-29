'use client';

import React, { useState } from 'react';
import { Check, MapPin, Clock, Coffee, Utensils, Waves, Camera, Sparkles, Star, Sunset, Plane, ShoppingBag, Beer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type VibeType = 'cultural' | 'playa' | 'gastronomico' | 'mixto';

const vibes: { id: VibeType; name: string; icon: any; desc: string; color: string }[] = [
  { id: 'cultural', name: 'Cultural', icon: Camera, desc: 'Historia, legado británico y patrimonio', color: 'from-purple-500 to-indigo-600' },
  { id: 'playa', name: 'Playero', icon: Waves, desc: 'Sol, arena dorada y chiringuitos', color: 'from-cyan-500 to-blue-600' },
  { id: 'gastronomico', name: 'Gastronómico', icon: Utensils, desc: 'La capital de la gamba y el jamón', color: 'from-amber-500 to-orange-600' },
  { id: 'mixto', name: 'Completo', icon: Sparkles, desc: 'Un poco de todo para no perderte nada', color: 'from-emerald-500 to-teal-600' },
];

const WIKI_IMAGES = {
  monjas: '/images/guides/monumento-colon-monjas.jpg',
  colon: '/images/guides/ayuntamiento-huelva.jpg',
  azabache: '/images/guides/gambas-blancas-huelva.jpg',
  barrioObrero: '/images/guides/barrio-reina-victoria-hero.jpg',
  sebo: '/images/guides/muelle-tinto-riotinto.jpg',
  erChiclanero: '/images/guides/iglesia-rocio-huelva.jpg',
  muelleTinto: '/images/guides/muelle-tinto-sunset.jpg',
  marismas: '/images/guides/marismas-odiel.jpg',
  tapas: '/images/guides/jamon-jabugo-fino.png',
  puntaUmbria: '/images/guides/playa-punta-umbria.jpg',
};

// Lugares reales y verificados de Huelva
const itineraries: Record<VibeType, { day: string; activities: { time: string; what: string; where: string; address?: string; icon: any; verified?: boolean; image: string }[] }[]> = {
  cultural: [
    {
      day: 'Sábado',
      activities: [
        { time: '09:30', what: 'Desayuno en Plaza de las Monjas', where: 'Cafetería Plaza', address: 'Plaza de las Monjas', icon: Coffee, verified: true, image: WIKI_IMAGES.monjas },
        { time: '11:00', what: 'Casa Colón y su historia', where: 'Alameda Sundheim', address: 'Casa Colón', icon: Camera, verified: true, image: WIKI_IMAGES.colon },
        { time: '13:30', what: 'Tapas en El Azabache', where: 'Calle Rico, 17', address: 'Restaurante El Azabache ⭐4.5', icon: Utensils, verified: true, image: WIKI_IMAGES.azabache },
        { time: '16:00', what: 'Barrio Reina Victoria', where: 'Calle Reina Victoria', address: 'Barrio inglés BIC 2002', icon: MapPin, verified: true, image: WIKI_IMAGES.barrioObrero },
        { time: '18:00', what: 'Atardecer en Muelle del Tinto', where: 'Río Odiel', address: 'Patrimonio Industrial', icon: Sunset, verified: true, image: WIKI_IMAGES.muelleTinto },
      ]
    },
    {
      day: 'Domingo',
      activities: [
        { time: '10:00', what: 'Paseo por la Ría', where: 'Paseo de la Ría', address: 'Vistas al Odiel', icon: Waves, verified: true, image: WIKI_IMAGES.sebo },
        { time: '12:00', what: 'Santuario de la Cinta', where: 'El Conquero', address: 'Patrona de Huelva', icon: Camera, verified: true, image: WIKI_IMAGES.marismas },
        { time: '14:00', what: 'Almuerzo en Casa Miguel', where: 'Mercado del Carmen', address: 'Pescado fresco ⭐4.3', icon: Utensils, verified: true, image: WIKI_IMAGES.tapas },
      ]
    }
  ],
  playa: [
    {
      day: 'Sábado',
      activities: [
        { time: '09:00', what: 'Rumbo a Punta Umbría', where: 'Bus o Coche', address: '15 min de Huelva', icon: Plane, verified: true, image: WIKI_IMAGES.puntaUmbria },
        { time: '10:00', what: 'Día de Playa', where: 'Punta Umbría', address: 'Una de las mejores de la costa', icon: Waves, verified: true, image: WIKI_IMAGES.puntaUmbria },
        { time: '14:00', what: 'Pescaíto frito', where: 'Chiringuito El Tabla', address: 'A pie de playa', icon: Utensils, verified: true, image: WIKI_IMAGES.tapas },
        { time: '20:00', what: 'Cerveza en Muelle del Tinto', where: 'Huelva Capital', address: 'De vuelta a la ciudad', icon: Beer, verified: true, image: WIKI_IMAGES.muelleTinto },
      ]
    },
    {
      day: 'Domingo',
      activities: [
        { time: '10:00', what: 'Playa del Espigón', where: 'Paraje Natural', address: 'Playa canina y pesca', icon: Waves, verified: true, image: WIKI_IMAGES.sebo },
        { time: '13:00', what: 'Gambas en el Mercado', where: 'Mercado del Carmen', address: 'Compra y cocina allí', icon: ShoppingBag, verified: true, image: WIKI_IMAGES.azabache },
      ]
    }
  ],
  gastronomico: [
    {
      day: 'Sábado',
      activities: [
        { time: '09:30', what: 'Churros en Plaza de las Monjas', where: 'Kiosco Manolín', address: 'Tradición', icon: Coffee, verified: true, image: WIKI_IMAGES.monjas },
        { time: '11:30', what: 'Mercado de Abastos', where: 'Calle Pablo Roca', address: 'El templo del producto', icon: ShoppingBag, verified: true, image: WIKI_IMAGES.tapas },
        { time: '13:30', what: 'Ruta de la Tapa', where: 'Pappis & Comodoro', address: 'Centro ⭐4.5', icon: Utensils, verified: true, image: WIKI_IMAGES.azabache },
        { time: '21:00', what: 'Cena de Estrella', where: 'Finca Alfoliz (Aljaraque)', address: 'Michelin Green Star', icon: Star, verified: true, image: WIKI_IMAGES.marismas },
      ]
    },
    {
      day: 'Domingo',
      activities: [
        { time: '11:00', what: 'Aperitivo en La Cinta', where: 'El Conquero', address: 'Vistas a la marisma', icon: Beer, verified: true, image: WIKI_IMAGES.sebo },
        { time: '14:00', what: 'Arroz con Chocos', where: 'Restaurante El Paraíso', address: 'Punta Umbría', icon: Utensils, verified: true, image: WIKI_IMAGES.tapas },
      ]
    }
  ],
  mixto: [
    {
      day: 'Sábado',
      activities: [
        { time: '10:00', what: 'Barrio Obrero', where: 'Reina Victoria', address: 'Arquitectura inglesa', icon: Camera, verified: true, image: WIKI_IMAGES.barrioObrero },
        { time: '12:00', what: 'Mercado del Carmen', where: 'Pescadería', address: 'Vida local', icon: ShoppingBag, verified: true, image: WIKI_IMAGES.tapas },
        { time: '14:00', what: 'Tapas en el Centro', where: 'Plaza de las Monjas', address: 'Gastronomía', icon: Utensils, verified: true, image: WIKI_IMAGES.monjas },
        { time: '19:00', what: 'Atardecer en Muelle del Tinto', where: 'Ría de Huelva', address: 'El clásico', icon: Sunset, verified: true, image: WIKI_IMAGES.muelleTinto },
      ]
    },
    {
      day: 'Domingo',
      activities: [
        { time: '10:00', what: 'Excursión a Marismas', where: 'Odiel', address: 'Naturaleza', icon: Waves, verified: true, image: WIKI_IMAGES.marismas },
        { time: '14:00', what: 'Despedida con Gambas', where: 'Bar Los Cuartelillos', address: 'Mítico', icon: Utensils, verified: true, image: WIKI_IMAGES.azabache },
      ]
    }
  ]
};

export default function WeekendItinerary() {
  const [selectedVibe, setSelectedVibe] = useState<VibeType | null>(null);
  const [showItinerary, setShowItinerary] = useState(false);

  const handleVibeSelect = (vibe: VibeType) => {
    setSelectedVibe(vibe);
    setShowItinerary(true);
    setTimeout(() => {
      document.getElementById('itinerary-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="container py-24 px-6 md:px-0 mx-auto max-w-7xl">

      {/* Intro */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-bold uppercase tracking-wider mb-6"
        >
          <Sparkles size={16} />
          Tu viaje a medida
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-display font-medium text-stone-900 mb-6">
          Diseña tu fin de semana perfecto
        </h2>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Dinos qué te mueve y te daremos, hora a hora, un plan infalible con lugares verificados.
        </p>
      </div>

      {/* Vibe Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {vibes.map((vibe, index) => (
          <motion.button
            key={vibe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVibeSelect(vibe.id)}
            className={`relative overflow-hidden p-8 rounded-[2rem] text-left h-64 md:h-80 flex flex-col justify-end transition-all shadow-lg hover:shadow-2xl group ${selectedVibe === vibe.id ? 'ring-4 ring-offset-4 ring-stone-900' : ''}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${vibe.color} opacity-90 transition-opacity group-hover:opacity-100`} />
            <div className="absolute top-0 right-0 p-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:translate-y-0 transition-transform duration-700" />

            <div className="relative z-10 text-white">
              <vibe.icon size={48} className="mb-4 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
              <h3 className="text-2xl font-display font-bold mb-2">{vibe.name}</h3>
              <p className="text-white/80 text-sm font-medium leading-relaxed">{vibe.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Itinerary Result */}
      <AnimatePresence>
        {showItinerary && selectedVibe && (
          <motion.div
            id="itinerary-result"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >

            {/* Header Itinerary */}
            <div className="flex items-center justify-between mb-12 border-b border-stone-200 pb-8">
              <div>
                <span className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-2 block">Itinerario Generado</span>
                <h2 className="text-3xl font-display font-bold text-stone-900">
                  Tu finde {vibes.find(v => v.id === selectedVibe)?.name}
                </h2>
              </div>
              <button
                onClick={() => { setShowItinerary(false); setSelectedVibe(null); }}
                className="text-stone-500 hover:text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors"
              >
                Empezar de nuevo
              </button>
            </div>

            {/* Days */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {itineraries[selectedVibe].map((day, dayIdx) => (
                <div key={dayIdx} className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {dayIdx + 1}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-stone-900">{day.day}</h3>
                  </div>

                  <div className="relative pl-6 border-l-2 border-stone-200 space-y-12">
                    {day.activities.map((act, actIdx) => (
                      <motion.div
                        key={actIdx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: actIdx * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-white border-4 border-stone-300 group-hover:border-stone-900 transition-colors" />

                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100 hover:shadow-xl hover:border-stone-200 transition-all cursor-default">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-100">
                              <img src={act.image} alt={act.what} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded-md">{act.time}</span>
                                {act.verified && <Check size={14} className="text-green-500" />}
                              </div>
                              <h4 className="font-bold text-stone-900 text-lg leading-tight mb-1">{act.what}</h4>
                              <div className="flex items-center gap-1 text-sm text-stone-500">
                                <MapPin size={12} />
                                {act.where}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-stone-900 text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-b from-amber-500 to-orange-600 w-1/2 h-full opacity-10 blur-3xl transform translate-x-20" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-display font-medium mb-6">Consejos de Local</h3>
                  <p className="text-white/70 mb-8 leading-relaxed">
                    Huelva tiene sus propios ritmos. Aquí tienes un par de claves para que no parezcas un turista despistado y disfrutes como un verdadero choquero.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-3xl">🚗</span>
                      <span className="text-sm text-white/60">Parking difícil</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-3xl">🕒</span>
                      <span className="text-sm text-white/60">Cena tarde</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-3xl">🧥</span>
                      <span className="text-sm text-white/60">Refresca noche</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                      <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                      <span>Pide <strong>"Gamba Blanca"</strong>, no gambones. Y cómetela con las manos, sin vergüenza.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                      <span>El <strong>Muelle del Tinto</strong> es para el atardecer. Ni antes, ni después. Justo a la caída del sol.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Check className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                      <span>Si vas a la playa el domingo, vuelve a las 21h o prepárate para el atasco.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

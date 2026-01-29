'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Crown, Wheat, Leaf, Sparkles, Info, Check, X, Scale } from 'lucide-react';

// Imágenes reales de jamón ibérico con fuentes
const HAM_IMAGES = {
  slice: '/images/guides/corte-jamon-iberico.jpg',
  bellota: '/images/guides/jamon-iberico-bellota.jpg',
  dehesa: '/images/guides/jamones-secadero.jpg', // Usada como fallback o contexto
  source: 'Wikimedia Commons'
};

const HAM_TYPES = [
  {
    id: 'bellota-100',
    name: 'Bellota 100%',
    fullName: 'Jamón Ibérico de Bellota 100%',
    tagline: 'La excelencia absoluta',
    icon: <Crown size={24} />,
    color: 'from-amber-600 to-amber-800',
    textColor: 'text-amber-900',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-500',
    badgeColor: 'bg-black text-white', // Precinto Negro (Norma)
    description: '100% raza ibérica (padre y madre). Criados en libertad en dehesas y alimentados SOLO con bellota y pastos durante la montanera.',
    keyFacts: ['Precinto NEGRO', '100% Raza Ibérica', 'Solo Bellota', 'Curación +36 meses'],
    flavor: 'Grasa fluida y brillante. Sabor potente, notas a frutos secos y bodega. Persistencia larga en boca.',
    priceKg: '90-120€/kg',
    priceWhole: '450-600€',
    colorCode: '#000000' // Black Label
  },
  {
    id: 'bellota-50-75',
    name: 'Bellota',
    fullName: 'Jamón de Bellota Ibérico (50-75%)',
    tagline: 'Gran calidad',
    icon: <Award size={24} />,
    color: 'from-red-600 to-red-800',
    textColor: 'text-red-900',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-500',
    badgeColor: 'bg-red-600 text-white', // Precinto Rojo
    description: 'Cerdos cruzados (normalmente 50% raza ibérica). Viven en libertad en la dehesa y comen bellota, pero no son "puros".',
    keyFacts: ['Precinto ROJO', '50-75% Raza Ibérica', 'Bellota + Pastos', 'Curación +30 meses'],
    flavor: 'Excelente calidad. Algo menos intenso y complejo que el 100%, pero delicioso y jugoso.',
    priceKg: '60-85€/kg',
    priceWhole: '300-450€',
    colorCode: '#DC2626' // Red Label
  },
  {
    id: 'cebo-campo',
    name: 'Cebo de Campo',
    fullName: 'Jamón de Cebo de Campo',
    tagline: 'Calidad contrastada',
    icon: <Leaf size={24} />,
    color: 'from-green-600 to-green-800',
    textColor: 'text-green-900',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    badgeColor: 'bg-green-600 text-white', // Precinto Verde
    description: 'Cerdos que viven al aire libre (campo) pero se alimentan de piensos y pastos, no de bellota.',
    keyFacts: ['Precinto VERDE', '50-100% Raza Ibérica', 'Piensos + Pastos', 'Curación +24 meses'],
    flavor: 'Sabor cárnico más pronunciado, grasa menos aceitosa. Fantástica opción calidad/precio.',
    priceKg: '40-55€/kg',
    priceWhole: '180-280€',
    colorCode: '#16A34A' // Green Label
  },
  {
    id: 'cebo',
    name: 'Cebo',
    fullName: 'Jamón de Cebo Ibérico',
    tagline: 'Básico Ibérico',
    icon: <Wheat size={24} />,
    color: 'from-white to-stone-100',
    textColor: 'text-stone-700',
    bgColor: 'bg-white',
    borderColor: 'border-stone-300',
    badgeColor: 'bg-stone-200 text-stone-800 border border-stone-300', // Precinto Blanco
    description: 'Cerdos ibéricos criados en granjas intensivas y alimentados solo con pienso.',
    keyFacts: ['Precinto BLANCO', '50% Raza Ibérica', 'Solo Pienso', 'Curación +20 meses'],
    flavor: 'Más salado y menos complejo. Grasa blanca y firme. Un buen jamón "de diario".',
    priceKg: '25-40€/kg',
    priceWhole: '120-180€',
    colorCode: '#E5E7EB' // White Label (Visual fix)
  }
];

const CURING_PROCESS = [
  { days: '1 día/kg', name: 'Salazón', desc: 'Se cubren de sal marina. Pierden agua, ganan conservación.' },
  { days: '90 días', name: 'Post-salado', desc: 'La sal se reparte por dentro. El frío es clave.' },
  { days: '6-9 meses', name: 'Secadero', desc: 'Sardan "a sudar". El calor natural funde la grasa.' },
  { days: '+18 meses', name: 'Bodega', desc: 'Oscuridad y silencio. Aquí nace el aroma a "viejo".' },
];

const LOCAL_PHRASES = [
  { phrase: 'Una taquilla', meaning: 'Una tapa de jamón en cuadraditos.', context: 'Ideal para compartir con cerveza.' },
  { phrase: 'De contra', meaning: 'La parte más estrecha y curada (babilla).', context: 'Para quien le gusta el jamón seco.' },
  { phrase: 'La maza', meaning: 'La parte más ancha y jugosa.', context: 'Donde está la vetita buena.' },
  { phrase: 'Estar al corte', meaning: 'Que hay un cortador profesional sirviendo.', context: 'Señal de evento importante.' },
];

export default function JamonTranslator() {
  const [selectedHam, setSelectedHam] = useState(HAM_TYPES[0]);
  const [activeTab, setActiveTab] = useState<'grados' | 'proceso' | 'pedir'>('grados');

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-900 pb-24">
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200 shadow-sm mb-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'grados', label: 'Los 4 Colores (Norma)' },
              { id: 'proceso', label: 'La Curación' },
              { id: 'pedir', label: 'Diccionario Local' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-amber-900 text-white shadow-lg shadow-amber-900/20'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">

        {/* GRADES TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'grados' && (
            <motion.div
              key="grados"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-amber-900 mb-4">El Color del Precinto Manda</h2>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                  No te fíes de palabras como "pata negra" si no ves la etiqueta.
                  En 2014 se aprobó la Norma de Calidad que lo clasifica todo en 4 colores.
                </p>
              </div>

              {/* Selectors */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {HAM_TYPES.map((ham) => (
                  <button
                    key={ham.id}
                    onClick={() => setSelectedHam(ham)}
                    className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-4 ${selectedHam.id === ham.id
                      ? `${ham.borderColor} ${ham.bgColor} shadow-xl scale-105 z-10`
                      : 'border-stone-100 bg-white hover:border-amber-200 text-stone-400 grayscale hover:grayscale-0'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${ham.colorCode === '#000000' ? 'bg-black' : ''} shadow-lg ring-4 ring-white`} style={{ backgroundColor: ham.colorCode === '#E5E7EB' ? '#FFFFFF' : ham.colorCode, border: ham.colorCode === '#E5E7EB' ? '2px solid #D1D5DB' : 'none' }}></div>
                    <span className={`font-bold text-sm ${selectedHam.id === ham.id ? 'text-stone-900' : 'text-stone-500'}`}>{ham.name}</span>
                  </button>
                ))}
              </div>

              {/* Main Card */}
              <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100 flex flex-col md:flex-row">
                {/* Visual Side */}
                <div className="md:w-1/3 bg-stone-900 relative p-12 text-white flex flex-col justify-between overflow-hidden">
                  <div className="relative z-10">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${selectedHam.badgeColor}`}>
                      Precinto {selectedHam.name.includes('100') ? 'Negro' : selectedHam.name.includes('50') ? 'Rojo' : selectedHam.name.includes('Campo') ? 'Verde' : 'Blanco'}
                    </span>
                    <h3 className="text-4xl font-display font-bold leading-tight mb-4">{selectedHam.fullName}</h3>
                    <p className="text-white/60 font-serif italic text-lg opacity-90">"{selectedHam.tagline}"</p>
                  </div>

                  <div className="relative z-10 mt-12">
                    <div className="text-5xl font-bold text-amber-500 mb-2">{selectedHam.priceKg.split('/')[0]}</div>
                    <div className="text-sm text-white/40 uppercase tracking-widest">Precio estimado / Kg</div>
                  </div>

                  {/* Abstract texture */}
                  <div className="absolute inset-0 opacity-20 sepia mix-blend-overlay" style={{ backgroundImage: `url(${HAM_IMAGES.bellota})`, backgroundSize: 'cover' }} />
                </div>

                {/* Info Side */}
                <div className="md:w-2/3 p-8 md:p-12">
                  <div className="mb-10">
                    <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">¿Qué estoy comiendo?</h4>
                    <p className="text-xl text-stone-800 leading-relaxed">{selectedHam.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
                        <Sparkles size={16} className="text-amber-500" /> Experiencia
                      </h4>
                      <p className="text-stone-600">{selectedHam.flavor}</p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
                        <Check size={16} className="text-green-500" /> Claves
                      </h4>
                      <ul className="space-y-2">
                        {selectedHam.keyFacts.map(fact => (
                          <li key={fact} className="flex items-center gap-2 text-stone-700 text-sm font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROCESS TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'proceso' && (
            <motion.div
              key="proceso"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold text-amber-900 mb-4">La Paciencia es el Ingrediente</h2>
                <p className="text-lg text-stone-600">Un jamón de bellota tarda hasta 5 años en llegar a tu plato.</p>
              </div>

              <div className="relative border-l-2 border-stone-200 ml-4 md:ml-0 space-y-12 md:space-y-0">
                {CURING_PROCESS.map((step, idx) => (
                  <div key={idx} className="md:flex items-center gap-8 md:even:flex-row-reverse relative mb-12 last:mb-0">
                    <div className="hidden md:block w-1/2" />

                    <div className="absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-amber-600 ring-4 ring-white" />

                    <div className="w-full md:w-1/2 pl-8 md:pl-0 md:text-right md:even:text-left md:even:pl-8 md:pr-8">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-3">{step.days}</span>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">{step.name}</h3>
                        <p className="text-stone-600">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHRASES TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'pedir' && (
            <motion.div
              key="pedir"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {LOCAL_PHRASES.map(item => (
                  <div key={item.phrase} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-display font-bold text-amber-900 mb-2">"{item.phrase}"</h3>
                    <p className="text-lg font-bold text-stone-800 mb-4">{item.meaning}</p>

                    <div className="flex items-start gap-3 bg-stone-50 p-4 rounded-xl">
                      <Info size={16} className="text-stone-400 mt-1 flex-shrink-0" />
                      <p className="text-stone-600 text-sm italic">{item.context}</p>
                    </div>
                  </div>
                ))}

                <div className="bg-amber-900 rounded-3xl p-8 text-white md:col-span-2 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Crown size={40} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">El Consejo de Oro</h3>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Nunca, bajo ningún concepto, metas el jamón en la nevera.
                      Y si te lo sirven frío en un bar, tienes permiso para mirar mal.
                      El jamón tiene que "sudar" a temperatura ambiente.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Crown, Wheat, Leaf, Sparkles, Info, Check, X, Scale } from 'lucide-react';

// Imágenes reales de jamón ibérico con fuentes
const HAM_IMAGES = {
  hero: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Jamones_ib%C3%A9ricos_colgados_en_un_bar_de_Tapia_de_Casarries_%28Asturias%29.jpg',
  slice: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Corte_de_jam%C3%B3n_ib%C3%A9rico.jpg',
  bellota: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Jam%C3%B3n_ib%C3%A9rico_de_bellota_100%25_%282015241812814%29.jpg',
  source: 'Wikimedia Commons - CC BY-SA 4.0'
};

const HAM_TYPES = [
  {
    id: 'bellota-100',
    name: 'Bellota 100%',
    fullName: 'Jamón Ibérico de Bellota 100%',
    tagline: 'La excelencia absoluta',
    icon: <Crown size={24} />,
    color: 'from-yellow-500 to-amber-600',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-400',
    description: 'Cerdos 100% ibéricos de raza pura, criados en libertad en dehesas. Alimentados exclusivamente con bellotas durante la montanera (60-90 días).',
    keyFacts: ['Raza pura 100% ibérica', 'Solo bellotas', 'Curación 36-48 meses', 'Denominación de Origen'],
    flavor: 'Intenso, complejo, grasa brillante y aromática. Textura fundente que se deshace en el paladar.',
    priceKg: '90-120€/kg',
    priceWhole: '450-600€',
    colorCode: '#D97706'
  },
  {
    id: 'bellota-50',
    name: 'Bellota 50%',
    fullName: 'Jamón de Cebo de Campo Ibérico',
    tagline: 'Gran calidad',
    icon: <Award size={24} />,
    color: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-400',
    description: 'Cerdos 50% ibéricos (madre ibérica, padre duro). Criados en libertad con bellotas, pastos naturales y piensos.',
    keyFacts: ['50% raza ibérica', 'Bellotas + pastos', 'Curación 30-36 meses', 'Etiqueta Negra'],
    flavor: 'Equilibrado, sabor intenso con buena infiltración de grasa dorada.',
    priceKg: '60-85€/kg',
    priceWhole: '300-450€',
    colorCode: '#EA580C'
  },
  {
    id: 'cebo-campo',
    name: 'Cebo de Campo',
    fullName: 'Jamón de Cebo de Campo',
    tagline: 'Calidad contrastada',
    icon: <Leaf size={24} />,
    color: 'from-green-500 to-emerald-600',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-400',
    description: 'Cerdos 50% ibéricos criados en extensión. Alimentados con pastos naturales, hierbas y piensos autorizados.',
    keyFacts: ['50% raza ibérica', 'Pastos + piensos', 'Curación 24-28 meses', 'Etiqueta Verde'],
    flavor: 'Sabor agradable, textura menos untuosa que la bellota pero manteniendo el carácter.',
    priceKg: '40-55€/kg',
    priceWhole: '200-280€',
    colorCode: '#059669'
  },
  {
    id: 'cebo',
    name: 'Cebo',
    fullName: 'Jamón de Cebo Ibérico',
    tagline: 'Gran valor',
    icon: <Wheat size={24} />,
    color: 'from-stone-500 to-stone-600',
    textColor: 'text-stone-700',
    bgColor: 'bg-stone-50',
    borderColor: 'border-stone-400',
    description: 'Cerdos 50% ibéricos criados en granjas. Alimentados exclusivamente con piensos naturales de cereales.',
    keyFacts: ['50% raza ibérica', 'Solo piensos', 'Curación 20-24 meses', 'Etiqueta Blanca'],
    flavor: 'Sabor más suave, grasa blanca y consistente. Ideal para consumo diario.',
    priceKg: '25-40€/kg',
    priceWhole: '125-200€',
    colorCode: '#78716C'
  }
];

const CURING_PROCESS = [
  { days: '1 día/kg', name: 'Salazón', desc: 'Reposo en sal marina para deshidratar y conservar' },
  { days: '45-60 días', name: 'Asentamiento', desc: 'Distribución homogénea de la sal' },
  { days: '30-45 días', name: 'Lavado', desc: 'Limpieza y eliminación del exceso de sal' },
  { days: '6-9 meses', name: 'Secado', desc: 'Pérdida gradual de humedad' },
  { days: '12-24 meses', name: 'Maduración', desc: 'Desarrollo de sabores y aromas únicos' },
];

const LOCAL_PHRASES = [
  { phrase: 'Una taquilla', meaning: 'Una porción de jamón' },
  { phrase: 'Con la grasa', meaning: 'Con grasa infiltrada, más sabor' },
  { phrase: 'De contra', meaning: 'La parte más curada y seca' },
  { phrase: 'La maza', meaning: 'Parte gruesa y jugosa' },
  { phrase: 'La babilla', meaning: 'Parte magra y estrecha' },
  { phrase: 'Punta', meaning: 'La parte inferior de la pata' },
];

export default function JamonTranslator() {
  const [selectedHam, setSelectedHam] = useState(HAM_TYPES[0]);
  const [activeTab, setActiveTab] = useState<'grados' | 'proceso' | 'pedir'>('grados');

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HAM_IMAGES.hero})` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90" />
          </div>
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                Guía Interactiva Premium
              </span>
            </motion.div>

            <h1 className="text-display text-6xl md:text-7xl font-bold text-white mb-6">
              Traductor de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Jamón Ibérico
              </span>
            </h1>

            <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed mb-6">
              Bellota 100%, Bellota 50%, Cebo de Campo, Cebo. Cuatro categorías,
              cuatro precios, cuatro experiencias. Entiende lo que realmente comes.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-stone-400">
              <span className="flex items-center gap-2">
                <Scale size={16} />
                Comparativa de precios
              </span>
              <span className="flex items-center gap-2">
                <Award size={16} />
                Denominaciones de origen
              </span>
              <span className="flex items-center gap-2">
                <Leaf size={16} />
                Proceso de curación
              </span>
            </div>

            <p className="text-xs text-stone-500 mt-8">
              Imagen: {HAM_IMAGES.source}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 p-2 bg-white rounded-2xl shadow-lg border border-stone-200">
            {[
              { id: 'grados', label: 'Los 4 Grades' },
              { id: 'proceso', label: 'Proceso de Curación' },
              { id: 'pedir', label: 'Pedir como Local' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grades Tab */}
      {activeTab === 'grados' && (
        <div className="container pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Ham Type Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {HAM_TYPES.map((ham, index) => (
                <motion.button
                  key={ham.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedHam(ham)}
                  className={`relative p-5 rounded-2xl border-2 transition-all ${
                    selectedHam.id === ham.id
                      ? `${ham.borderColor} ${ham.bgColor} shadow-xl`
                      : 'border-stone-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ham.color} flex items-center justify-center text-white mb-3 mx-auto`}>
                    {ham.icon}
                  </div>
                  <h3 className={`font-bold text-center mb-1 ${selectedHam.id === ham.id ? ham.textColor : 'text-stone-700'}`}>
                    {ham.name}
                  </h3>
                  <p className={`text-xs text-center ${selectedHam.id === ham.id ? ham.textColor + '/80' : 'text-stone-500'}`}>
                    {ham.tagline}
                  </p>
                  {selectedHam.id === ham.id && (
                    <motion.div
                      layoutId="gradeSelection"
                      className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                    >
                      <Check size={12} className="text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200"
              >
                {/* Header */}
                <div className={`h-56 relative overflow-hidden`} style={{ backgroundColor: selectedHam.colorCode }}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <motion.div
                        key={selectedHam.id}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${selectedHam.color} flex items-center justify-center text-white mb-4 mx-auto shadow-2xl`}
                      >
                        {selectedHam.icon}
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-2">{selectedHam.fullName}</h3>
                      <p className="text-white/90">{selectedHam.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Key Facts */}
                    <div>
                      <h4 className="font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <Award size={20} className="text-amber-600" />
                        Características
                      </h4>
                      <div className="space-y-3">
                        {selectedHam.keyFacts.map((fact, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedHam.colorCode }} />
                            <span className="text-stone-700">{fact}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                        <h5 className="font-bold text-stone-800 mb-2">Perfil de Sabor</h5>
                        <p className="text-stone-600 text-sm">{selectedHam.flavor}</p>
                      </div>
                    </div>

                    {/* Price Ticket */}
                    <div>
                      <h4 className="font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <Scale size={20} className="text-amber-600" />
                        Precios de Mercado
                      </h4>

                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 overflow-hidden">
                        {/* Perforations */}
                        <div className="flex justify-between">
                          <div className="w-4 h-4 rounded-full bg-stone-50 -ml-2 mt-4" />
                          <div className="w-4 h-4 rounded-full bg-stone-50 -mr-2 mt-4" />
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-baseline">
                            <span className="text-stone-600 text-sm">Pata entera (7-8kg)</span>
                            <span className="font-mono font-bold text-xl text-amber-800">{selectedHam.priceWhole}</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-stone-600 text-sm">Por kilo</span>
                            <span className="font-mono text-amber-700">{selectedHam.priceKg}</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-stone-600 text-sm">Ración (100g)</span>
                            <span className="font-mono text-amber-700">
                              {Math.round(parseInt(selectedHam.priceKg.split('-')[1]) / 10)}€
                            </span>
                          </div>
                        </div>

                        {/* Perforations */}
                        <div className="flex justify-between border-t border-dashed border-amber-300">
                          <div className="w-4 h-4 rounded-full bg-stone-50 -ml-2" />
                          <div className="w-4 h-4 rounded-full bg-stone-50 -mr-2" />
                        </div>

                        <div className="px-6 py-4 bg-white/50 text-center">
                          <p className="text-xs text-stone-500">Precios orientativos · Varían por establecimiento y temporada</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Process Tab */}
      {activeTab === 'proceso' && (
        <div className="container pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-3">El Arte de la Curación</h2>
              <p className="text-stone-600">De 20 a 48 meses para alcanzar la perfección</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-400 to-stone-300" />

              <div className="space-y-8">
                {CURING_PROCESS.map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg z-10">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-stone-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-stone-800">{stage.name}</h4>
                        <span className="text-xs font-mono text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{stage.days}</span>
                      </div>
                      <p className="text-stone-600 text-sm">{stage.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image with source */}
            <div className="mt-12 rounded-2xl overflow-hidden border border-stone-200">
              <img src={HAM_IMAGES.slice} alt="Corte de jamón ibérico" className="w-full h-64 object-cover" />
              <div className="p-4 bg-stone-50 text-center">
                <p className="text-xs text-stone-500">Fuente: Wikimedia Commons - CC BY-SA 4.0</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Local Phrases Tab */}
      {activeTab === 'pedir' && (
        <div className="container pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-3">Pedir como un Local</h2>
              <p className="text-stone-600">El vocabulario esencial para pedir jamón en Huelva</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {LOCAL_PHRASES.map((item, index) => (
                <motion.div
                  key={item.phrase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-amber-700">"{item.phrase}"</span>
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sparkles size={16} className="text-amber-600" />
                    </span>
                  </div>
                  <p className="text-stone-600">{item.meaning}</p>
                </motion.div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="mt-12 bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info size={24} className="text-amber-400" />
                Consejos del Experto
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <p className="text-stone-300 text-sm">Pide "de contra" para la parte más curda y con más sabor</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <p className="text-stone-300 text-sm">La grasa brillante es sinomio de calidad y bellota</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <p className="text-stone-300 text-sm">A temperatura ambiente, el sabor se aprecia mejor</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                  <p className="text-stone-300 text-sm">Corta en lonchas finas y translúcidas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Author */}
      <div className="container pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-2xl border border-stone-200 shadow-lg">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&fit=crop" alt="Rocío Limón" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="font-bold text-stone-800">Rocío Limón</p>
              <p className="text-sm text-stone-500">Redactora Jefe | Gastronomía</p>
              <p className="text-xs text-stone-400 italic mt-1">"Rocío nunca deja un plato sin probar."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

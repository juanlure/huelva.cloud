'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Crown, Wheat, Leaf, Sparkles, Info, Check, X } from 'lucide-react';

// Datos de los tipos de jamón
const HAM_TYPES = [
  {
    id: 'bellota-100',
    name: 'Bellota 100%',
    fullName: 'Jamón Ibérico de Bellota 100%',
    tagline: 'La excelencia absoluta',
    icon: <Crown size={24} />,
    iconBg: 'bg-gradient-to-br from-yellow-400 to-amber-500',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    description: 'Cerdos 100% ibéricos, criados en libertad, alimentados exclusivamente con bellotas durante la montanera.',
    diet: '100% Bellotas',
    dietPercent: 100,
    acornDays: '60-90 días',
    curing: '36-48 meses',
    priceKg: '90-120€/kg',
    priceWhole: '450-600€',
    flavor: 'Intenso, complejo, con notas de bellota y textura fundente.',
    color: '#B45309'
  },
  {
    id: 'bellota-50',
    name: 'Bellota 50%',
    fullName: 'Jamón de Cebo de Campo Ibérico',
    tagline: 'Gran calidad',
    icon: <Award size={24} />,
    iconBg: 'bg-gradient-to-br from-orange-400 to-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    description: 'Cerdos 50% ibéricos (madre ibérica, padre duro), criados en libertad con bellotas y pastos naturales.',
    diet: '50% Bellotas + Pastos',
    dietPercent: 50,
    acornDays: '40-60 días',
    curing: '30-36 meses',
    priceKg: '60-85€/kg',
    priceWhole: '300-450€',
    flavor: 'Equilibrado, sabor intenso con buena infiltración de grasa.',
    color: '#EA580C'
  },
  {
    id: 'cebo-campo',
    name: 'Cebo de Campo',
    fullName: 'Jamón de Cebo de Campo',
    tagline: 'Calidad contrastada',
    icon: <Leaf size={24} />,
    iconBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    description: 'Cerdos 50% ibéricos criados en extensión, alimentados con pastos naturales y piensos naturales.',
    diet: 'Pastos + Piensos',
    dietPercent: 0,
    acornDays: 'N/A',
    curing: '24-28 meses',
    priceKg: '40-55€/kg',
    priceWhole: '200-280€',
    flavor: 'Sabor agradable, textura menos untuosa que la bellota.',
    color: '#059669'
  },
  {
    id: 'cebo',
    name: 'Cebo',
    fullName: 'Jamón de Cebo Ibérico',
    tagline: 'Gran valor',
    icon: <Wheat size={24} />,
    iconBg: 'bg-gradient-to-br from-stone-400 to-stone-500',
    textColor: 'text-stone-700',
    bgColor: 'bg-stone-50',
    borderColor: 'border-stone-300',
    description: 'Cerdos 50% ibéricos criados en granjas, alimentados con piensos naturales controlados.',
    diet: 'Piensos naturales',
    dietPercent: 0,
    acornDays: 'N/A',
    curing: '20-24 meses',
    priceKg: '25-40€/kg',
    priceWhole: '125-200€',
    flavor: 'Sabor más suave, grasa blanca y consistente.',
    color: '#78716C'
  }
];

const CURING_STAGES = [
  { stage: 'Salazón', duration: '1 día/kg', description: 'Reposo en sal para deshidratar y conservar' },
  { stage: 'Asentamiento', duration: '45-60 días', description: 'Distribución homogénea de la sal' },
  { stage: 'Lavado y Secado', duration: '30-45 días', description: 'Limpieza y secado gradual' },
  { stage: 'Maduración', duration: '6-9 meses', description: 'Desarrollo de sabores y aromas' },
  { stage: 'Envejecimiento', duration: '12-24 meses', description: 'Crianza en bodega natural' }
];

const LOCAL_PHRASES = [
  { phrase: 'Ponme una taquilla', meaning: 'Una porción de jamón' },
  { phrase: 'Con la grasa', meaning: 'Con grasa infiltrada, más sabor' },
  { phrase: 'De contra', meaning: 'La parte más curada y seca' },
  { phrase: 'La maza', meaning: 'Parte gruesa y jugosa' },
  { phrase: 'La babilla', meaning: 'Parte más magra y estrecha' },
  { phrase: 'En tacos', meaning: 'Cortado en dados pequeños' },
];

export default function JamonTranslator() {
  const [selectedHam, setSelectedHam] = useState(HAM_TYPES[0]);
  const [hoveredHam, setHoveredHam] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-stone-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B45309' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-amber-200 shadow-lg mb-8"
            >
              <Sparkles size={18} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-800 uppercase tracking-widest">
                Guía Interactiva
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-bold text-stone-900 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Traductor de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
                Jamón Ibérico
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed mb-4"
            >
              Bellota, Cebo de Campo, Cebo. No es lo mismo. Descubre las diferencias
              que marcan el precio y el sabor.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-stone-500 italic"
            >
              Por Rocío Limón · Redactora Jefe | Gastronomía
            </motion.p>
          </div>
        </div>
      </div>

      {/* Interactive Selector */}
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Los Cuatro Grades</h2>
            <p className="text-stone-600">Selecciona un tipo para ver sus características</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {HAM_TYPES.map((ham, index) => (
              <motion.button
                key={ham.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedHam(ham)}
                onMouseEnter={() => setHoveredHam(ham.id)}
                onMouseLeave={() => setHoveredHam(null)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedHam.id === ham.id
                    ? ham.borderColor + ' ' + ham.bgColor + ' shadow-xl scale-105'
                    : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-lg'
                }`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${ham.iconBg} flex items-center justify-center text-white mb-4 mx-auto ${
                  selectedHam.id === ham.id ? 'shadow-lg' : 'opacity-70'
                }`}>
                  {ham.icon}
                </div>

                {/* Name */}
                <h3 className={`font-bold text-lg mb-1 ${
                  selectedHam.id === ham.id ? ham.textColor : 'text-stone-700'
                }`}>
                  {ham.name}
                </h3>

                {/* Tagline */}
                <p className={`text-sm ${
                  selectedHam.id === ham.id ? ham.textColor + '/80' : 'text-stone-500'
                }`}>
                  {ham.tagline}
                </p>

                {/* Selection indicator */}
                {selectedHam.id === ham.id && (
                  <motion.div
                    layoutId="selection"
                    className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                  >
                    <Check size={14} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200"
            >
              {/* Header */}
              <div className="relative h-48 overflow-hidden" style={{ backgroundColor: selectedHam.color }}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <motion.div
                      key={selectedHam.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${selectedHam.iconBg} mb-4`}
                    >
                      {selectedHam.icon}
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-2">{selectedHam.fullName}</h3>
                    <p className="text-white/90">{selectedHam.description}</p>
                  </div>
                </div>

                {/* Diet Visualizer */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30">
                  {selectedHam.dietPercent > 0 && (
                    <motion.div
                      key={selectedHam.id}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedHam.dietPercent}%` }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-300"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Left Column */}
                  <div>
                    <h4 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                      <Leaf size={20} className="text-green-600" />
                      Características
                    </h4>

                    <div className="space-y-4">
                      <DetailRow
                        label="Alimentación"
                        value={selectedHam.diet}
                        highlight={selectedHam.dietPercent === 100}
                      />
                      <DetailRow
                        label="Días de montanera"
                        value={selectedHam.acornDays}
                      />
                      <DetailRow
                        label="Curación"
                        value={selectedHam.curing}
                      />
                      <DetailRow
                        label="Precio (aprox.)"
                        value={selectedHam.priceKg}
                        highlight
                      />
                    </div>

                    {/* Flavor Profile */}
                    <div className="mt-8 p-6 bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl border border-stone-200">
                      <h5 className="font-bold text-stone-800 mb-2">Perfil de sabor</h5>
                      <p className="text-stone-600 text-sm leading-relaxed">{selectedHam.flavor}</p>
                    </div>
                  </div>

                  {/* Right Column - Ticket */}
                  <div>
                    <h4 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                      <Award size={20} className="text-amber-600" />
                      Ticket de Precio
                    </h4>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 overflow-hidden">
                      {/* Perforation */}
                      <div className="flex justify-between">
                        <div className="w-4 h-4 rounded-full bg-white -ml-2 mt-4" />
                        <div className="w-4 h-4 rounded-full bg-white -mr-2 mt-4" />
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-stone-600">Jamón completo</span>
                          <span className="font-mono font-bold text-lg text-amber-700">{selectedHam.priceWhole}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-stone-600">Por kilo</span>
                          <span className="font-mono text-amber-700">{selectedHam.priceKg}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-stone-600">Ración (100g)</span>
                          <span className="font-mono text-amber-700">
                            {parseInt(selectedHam.priceKg.split('-')[1]) / 10}€
                          </span>
                        </div>
                      </div>

                      {/* Perforation */}
                      <div className="flex justify-between border-t border-dashed border-amber-300 pt-2">
                        <div className="w-4 h-4 rounded-full bg-white -ml-2" />
                        <div className="w-4 h-4 rounded-full bg-white -mr-2" />
                      </div>

                      <div className="p-4 bg-white/50 text-center">
                        <p className="text-xs text-stone-500">Precios orientativos · Varían por establecimiento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Curing Process */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-stone-800 text-center mb-12">El Arte de la Curación</h2>

            <div className="grid md:grid-cols-5 gap-4">
              {CURING_STAGES.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline line */}
                  {index < CURING_STAGES.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
                  )}

                  <div className="bg-white rounded-2xl p-6 border border-stone-200 h-full">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold mb-4">
                      {index + 1}
                    </div>
                    <h4 className="font-bold text-stone-800 mb-1">{stage.stage}</h4>
                    <p className="text-xs text-amber-600 font-mono mb-2">{stage.duration}</p>
                    <p className="text-sm text-stone-600">{stage.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Local Phrases */}
          <div className="mt-20 bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Pedir como un Local</h2>
              <p className="text-stone-300">El vocabulario esencial para pedir jamón en Huelva</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {LOCAL_PHRASES.map((item, index) => (
                <motion.div
                  key={item.phrase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all"
                >
                  <p className="text-xl font-bold text-amber-400 mb-2">"{item.phrase}"</p>
                  <p className="text-stone-300 text-sm">{item.meaning}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Author Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-stone-200 shadow-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&fit=crop" alt="Rocío Limón" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-stone-800">Rocío Limón</p>
                <p className="text-sm text-stone-500">Redactora Jefe | Gastronomía</p>
              </div>
              <p className="text-sm text-stone-400 italic">"Rocío nunca deja un plato sin probar."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-baseline py-2 border-b ${
      highlight ? 'border-amber-200' : 'border-stone-100'
    }`}>
      <span className="text-sm text-stone-600">{label}</span>
      <span className={`font-mono text-sm ${
        highlight ? 'text-amber-700 font-bold' : 'text-stone-800'
      }`}>{value}</span>
    </div>
  );
}

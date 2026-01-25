'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Info, Sparkles, Clock, Droplets, Sun } from 'lucide-react';

// Tipos de café en Huelva
const COFFEE_TYPES = [
  {
    id: 'solo',
    name: 'Solo',
    fullName: 'Café Solo',
    ratio: '100% café / 0% leche',
    description: 'La esencia pura. Solo café, sin additions. Para los verdaderos puristas.',
    instructions: 'Pides un "café solo" o simplemente "un café".',
    when: 'Cualquier momento del día.',
    localTip: 'En muchos bares te preguntarán "¿de sobre?" Si quieres el clásico, dilo claro.',
    color: '#78716C'
  },
  {
    id: 'cortado',
    name: 'Cortado',
    ratio: '75% café / 25% leche',
    description: 'La proporción perfecta. Café con un toque de leche para suavizar.',
    instructions: 'Pides un "cortado".',
    when: 'Desayuno o media mañana.',
    localTip: 'El nombre viene por "cortar" la intensidad del café.',
    color: '#A8A29E'
  },
  {
    id: 'mitad',
    name: 'Mitad',
    ratio: '50% café / 50% leche',
    description: 'El equilibrio exacto. Mitad café, mitad leche caliente.',
    instructions: 'Pides una "mitad".',
    when: 'Para quienes quieren el sabor del café con menos intensidad.',
    localTip: 'Algunos lo llaman "mitad y mitad" para ser más claros.',
    color: '#D6D3D1'
  },
  {
    id: 'largo',
    name: 'Largo',
    ratio: 'Café + más agua',
    description: 'Misma cantidad de café pero con más agua. Más suave, mismo cafeína.',
    instructions: 'Pides un "largo".',
    when: 'Cuando quieres tomarlo despacio sin tanta carga.',
    localTip: 'No confundir con el manchado - aquí no hay leche.',
    color: '#E7E5E4'
  },
  {
    id: 'manchado',
    name: 'Manchado',
    ratio: 'Leche + café "que la manche"',
    description: 'Leche caliente con un café que apenas la tiñe. Suave y dulzón.',
    instructions: 'Pides un "manchado" o "leche manchada".',
    when: 'Merienda o quienes no les gusta el café fuerte.',
    localTip: 'En Huelva se sirve en vaso de vidrio, nunca en taza.',
    color: '#FAFAF9'
  },
  {
    id: 'sombra',
    name: 'Sombra',
    ratio: 'Leche con sombra de café',
    description: 'Aún más suave que el manchado. El café apenas hace sombra.',
    instructions: 'Pides una "sombra".',
    when: 'Para acompañar postres o media tarde.',
    localTip: 'Muy popular después de comer en algunos barrios.',
    color: '#FAFAF9'
  },
  {
    id: 'nube',
    name: 'Nube',
    ratio: 'Leche con nube de café',
    description: 'Leche dominante con apenas una nube de café. Casi parece chocolates.',
    instructions: 'Pides una "nube".',
    when: 'Para niños o quienes quieren algo muy suave.',
    localTip: 'Más de uno ha pedido una nube esperando chocolates.',
    color: '#FEFEFE'
  },
  {
    id: 'bombon',
    name: 'Bombón',
    ratio: 'Café + leche condensada',
    description: 'El dulce más onubense. Café con leche condensada, sin leche normal.',
    instructions: 'Pides un "bombón".',
    when: 'Desayuno o merienda dulce.',
    localTip: 'Acompañado con picos o churros es gloria bendita.',
    color: '#D4A574'
  },
  {
    id: 'carajillo',
    name: 'Carajillo',
    ratio: 'Café + aguardiente/brandy',
    description: 'Café con un chupito de bebida espirituosa. Para animarse.',
    instructions: 'Pides un "carajillo" o "carajillo de [bebida]".',
    when: 'Después de comer o días festivos.',
    localTip: 'En algunos lugares se flamea el aguardiente con azúcar.',
    color: '#B45309'
  }
];

const LOCAL_PLACES = [
  { name: 'Cafetería Plaza', specialty: 'Sus bombones y meriendas', area: 'Plaza de las Monjas' },
  { name: 'Cafetería San José', specialty: 'El desayuno de los oficinistas', area: 'Calle San José' },
  { name: 'Café del Coto', specialty: 'Café de specialty y ambiente joven', area: 'Polígono El Coto' },
  { name: 'Cafetería Roma', specialty: 'Clásico de toda la vida', area: 'Calle Rico' },
];

const ETIQUETTE = [
  { rule: 'El café se bebe de pie', explanation: 'En la barra, más rápido y más auténtico.' },
  { rule: 'No pidas "espresso"', explanation: 'Aquí es "café solo". Espresso suena a pretencioso.' },
  { rule: 'El pitufo acompaña', explanation: 'Una media de pan tostado con el café de la mañana.' },
  { rule: 'Pagas al ir', explanation: 'Pides, tomas, y luego pagas en caja. No al revés.' },
  { rule: 'El camarero recuerda', explanation: 'Si vienes a menudo, te tendrán preparado tu café habitual.' },
];

export default function CoffeeTranslator() {
  const [selectedCoffee, setSelectedCoffee] = useState(COFFEE_TYPES[0]);
  const [showEtiquette, setShowEtiquette] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-stone-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%2378716C' fill-opacity='1'/%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-amber-200 mb-8 shadow-sm"
            >
              <Coffee size={16} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-800 uppercase tracking-widest">
                Guía Interactiva
              </span>
            </motion.div>

            <h1 className="text-display text-5xl md:text-6xl font-semibold text-stone-900 mb-6">
              Traductor de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-stone-700">
                Café de Huelva
              </span>
            </h1>

            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed mb-4">
              Solo, Cortado, Mitad, Manchado, Sombra, Nube... No son lo mismo.
              Aprende los ratios sagrados del café onubense.
            </p>

            <p className="text-sm text-stone-500 italic">
              Por Rocío Limón · Redactora Jefa | Gastronomía
            </p>
          </div>
        </div>
      </div>

      {/* Ratio Selector */}
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          {/* Coffee Type Buttons */}
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3 mb-16">
            {COFFEE_TYPES.map((coffee) => (
              <button
                key={coffee.id}
                onClick={() => setSelectedCoffee(coffee)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedCoffee.id === coffee.id
                    ? 'border-amber-500 bg-amber-50 shadow-lg scale-105'
                    : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-md'
                }`}
              >
                {/* Visual Coffee Cup */}
                <div className="w-10 h-10 mx-auto mb-2 relative">
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: `linear-gradient(to top, ${
                        coffee.id === 'solo' ? '#78716C' :
                        coffee.id === 'bombon' ? 'linear-gradient(to top, #D4A574, #F5E6D3)' :
                        coffee.id === 'carajillo' ? '#B45309' :
                        `to ${coffee.color}`
                      } 60%, transparent 60%)`
                    }}
                  />
                </div>

                <p className={`text-xs font-bold ${
                  selectedCoffee.id === coffee.id ? 'text-amber-800' : 'text-stone-700'
                }`}>
                  {coffee.name}
                </p>
              </button>
            ))}
          </div>

          {/* Selected Coffee Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCoffee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200"
            >
              {/* Header with Ratio Visual */}
              <div className="h-48 relative overflow-hidden" style={{ backgroundColor: selectedCoffee.color }}>
                <div className="absolute inset-0 bg-black/10" />

                {/* Ratio Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={selectedCoffee.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl md:text-6xl font-display font-bold text-white mb-4"
                    >
                      {selectedCoffee.name}
                    </motion.div>
                    <p className="text-white/90 text-lg font-mono">{selectedCoffee.ratio}</p>
                  </div>
                </div>

                {/* Ratio Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-3">
                  {selectedCoffee.ratio.includes('/') && (
                    <div className="flex h-full">
                      {selectedCoffee.ratio.split(' / ').map((part, i) => {
                        const match = part.match(/(\d+)%/);
                        if (!match) return <div key={i} className="flex-1 bg-white/30" />;
                        const pct = parseInt(match[1]);
                        const isCoffee = part.includes('café');
                        return (
                          <div
                            key={i}
                            style={{ width: `${pct}%` }}
                            className={`transition-all duration-1000 ${isCoffee ? 'bg-amber-800' : 'bg-white/80'}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Left Column */}
                  <div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-4">{selectedCoffee.fullName}</h3>
                    <p className="text-stone-600 leading-relaxed mb-6">{selectedCoffee.description}</p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-700">💬</span>
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">Cómo pedirlo</p>
                          <p className="text-stone-600">{selectedCoffee.instructions}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                          <Clock size={16} className="text-stone-600" />
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">Cuándo tomarlo</p>
                          <p className="text-stone-600">{selectedCoffee.when}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Sparkles size={16} className="text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">Tip local</p>
                          <p className="text-stone-600 italic">{selectedCoffee.localTip}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Visual */}
                  <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 border border-amber-100">
                    <h4 className="font-bold text-stone-800 mb-6 flex items-center gap-2">
                      <Info size={20} className="text-amber-600" />
                      Entendiendo las Proporciones
                    </h4>

                    <div className="space-y-4">
                      <div className="text-center py-6">
                        <div className="inline-block relative">
                          {/* Coffee Cup Visualization */}
                          <div className="w-32 h-32 rounded-b-full border-4 border-stone-300 bg-white relative overflow-hidden">
                            <motion.div
                              key={selectedCoffee.id}
                              initial={{ height: 0 }}
                              animate={{ height: selectedCoffee.ratio.includes('café') && !selectedCoffee.ratio.includes('leche') ? '100%' : '50%' }}
                              transition={{ duration: 1 }}
                              className="absolute bottom-0 left-0 right-0 bg-amber-800"
                            />
                            <motion.div
                              key={`milk-${selectedCoffee.id}`}
                              initial={{ height: 0 }}
                              animate={{ height: selectedCoffee.ratio.includes('leche') ? '50%' : '0%' }}
                              transition={{ duration: 1 }}
                              className="absolute bottom-0 left-0 right-0 bg-white/80"
                            />
                          </div>
                          {/* Handle */}
                          <div className="absolute -right-4 top-8 w-3 h-8 border-4 border-stone-300 rounded-r-full" />
                        </div>
                      </div>

                      <div className="text-center text-sm text-stone-600 font-mono">
                        {selectedCoffee.ratio}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Local Places */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-stone-800 text-center mb-10">
              Cafeterías de Referencia
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LOCAL_PLACES.map((place, index) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Coffee size={24} className="text-amber-700" />
                  </div>
                  <h4 className="font-bold text-stone-800 mb-1">{place.name}</h4>
                  <p className="text-sm text-amber-700 mb-2">{place.specialty}</p>
                  <p className="text-xs text-stone-500">{place.area}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Etiquette Toggle */}
          <div className="mt-20">
            <button
              onClick={() => setShowEtiquette(!showEtiquette)}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-3 p-6 bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-2xl hover:from-stone-700 hover:to-stone-800 transition-all"
            >
              <Sparkles size={20} className="text-amber-400" />
              <span className="font-bold">Reglas del Café en Huelva</span>
            </button>

            <AnimatePresence>
              {showEtiquette && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-4"
                >
                  {ETIQUETTE.map((rule, index) => (
                    <motion.div
                      key={rule.rule}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-6 border border-stone-200"
                    >
                      <h4 className="font-bold text-stone-800 mb-2">☕ {rule.rule}</h4>
                      <p className="text-stone-600 text-sm">{rule.explanation}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Author */}
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
